/* npm imports: common */
import React from 'react';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';

/* root imports: view components */
import { CustomInput } from 'views/elements';

/* root imports: common */
import { debounce, debounceTiming } from 'utils/helpers';

/* local imports: common */
import { styles } from './styles';

class SearchComponent extends React.Component {
	state = {
		searchQuery: '',
	};

	componentWillUnmount() {
		if (this.state.searchQuery.length > 0) {
			this.props.searchTasks('');
			this.props.fetchTasks();
		}
	}

	changeHandler = debounce(value => {
		this.setState(
			() => ({
				searchQuery: value,
			}),
			() => {
				this.props.searchTasks(value);
				this.props.fetchTasks();
			}
		);
	}, debounceTiming.input);

	render() {
		const { isFetching } = this.props;

		return (
			<CustomInput
				icon={{
					name: 'magnify',
					svgSize: 'md',
				}}
				isFetching={isFetching}
				placeholder="Type to search..."
				onChange={this.changeHandler}
			/>
		);
	}
}

const Search = withStyles(styles)(SearchComponent);

export { Search };
