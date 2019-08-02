/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

/* root imports: view components */
import { TaskCheckbox, TaskActions } from 'features/Home/components';

/* root imports: common */
import {
	updateTask,
	setUpdateInProgress,
	deleteTask,
	setDeleteInProgress,
} from 'actions/tasks';

/* local imports: common */
import { Description } from './Description';
import { EditInput } from './EditInput';
import { Backdrop } from './Backdrop';
import { styles } from './styles';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			updateTask,
			setUpdateInProgress,
			deleteTask,
			setDeleteInProgress,
		},
		dispatch
	);

class TaskComponent extends React.Component {
	static defaultProps = {
		isLastChild: false,
	};

	state = {
		isHovered: false,
		isEditable: false,
	};

	mouseEnterHandler = () => {
		this.setState(() => ({
			isHovered: true,
		}));
	};

	mouseLeaveHandler = () => {
		this.setState(() => ({
			isHovered: false,
		}));
	};

	editHandler = () => {
		this.setState(({ isEditable }) => ({
			isEditable: !isEditable,
		}));
		this.mouseLeaveHandler();
	};

	completeHandler = () => {
		const { task, updateTask } = this.props;
		updateTask(task._id, { ...task, completed: !task.completed });
	};

	saveHandler = value => {
		const { task, updateTask } = this.props;
		updateTask(task._id, { ...task, description: value });
	};

	deleteHandler = () => {
		const { task, deleteTask } = this.props;
		deleteTask(task._id);
	};

	render() {
		const { isHovered, isEditable } = this.state;
		const { classes, task, isLastChild } = this.props;

		return (
			<div
				className={cx(classes.root, { isLastChild })}
				onMouseEnter={this.mouseEnterHandler}
				onMouseLeave={this.mouseLeaveHandler}
			>
				<TaskCheckbox
					value={task.completed}
					isFetching={task.updateInProgress}
					onChange={this.completeHandler}
				/>
				<Divider className={classes.divider} />
				<Description>{task.description}</Description>
				{isHovered && !task.deleteInProgress && (
					<Divider className={classes.divider} />
				)}
				{(isHovered || task.deleteInProgress) && (
					<TaskActions
						onEdit={this.editHandler}
						isFetching={task.deleteInProgress}
						onDelete={this.deleteHandler}
					/>
				)}
				<Backdrop fadeIn={isEditable} onClick={this.editHandler} />
				{isEditable && (
					<EditInput
						autoFocus
						isFetching={task.updateInProgress}
						defaultValue={task.description}
						onClick={this.saveHandler}
						onCancel={this.editHandler}
					/>
				)}
			</div>
		);
	}
}

const TaskWithStyles = withStyles(styles)(TaskComponent);
const TaskWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskWithStyles);

export const Task = TaskWithRedux;
