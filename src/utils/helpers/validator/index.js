export const themeValidator = themeName => {
	switch (themeName) {
		case 'light':
		case 'dark': {
			return true;
		}

		default:
			return false;
	}
};
