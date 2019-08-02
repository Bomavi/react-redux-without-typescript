/* npm imports: common */
import React from 'react';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';

/* root imports: view components */
import { CustomInput } from 'views/elements';

/* local imports: common */
import { styles } from './styles';

class AddTaskComponent extends React.Component {
	actionHandler = value => {
		if (value) {
			this.props.createTask({ description: value, completed: false });
		}
	};

	render() {
		const { inProgress } = this.props;

		return (
			<CustomInput
				icon={{
					name: 'plus',
					svgSize: 'md',
					title: 'Add',
				}}
				isFetching={inProgress}
				placeholder="Type task description..."
				onClick={this.actionHandler}
			/>
		);
	}
}

const AddTask = withStyles(styles)(AddTaskComponent);

export { AddTask };
