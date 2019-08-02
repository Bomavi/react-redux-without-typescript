export const debounceTiming = {
	input: 500,
	button: 1000,
};

export const debounce = (func, wait, immediate) => {
	let timeout;

	return function() {
		const args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(this, args);
		};
		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(this, args);
	};
};
