/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { motion } from 'framer-motion';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

/* root imports: view components */
import { Task } from 'features/Home/containers';
import { SortButton } from 'features/Home/components';

/* root imports: common */
import { fetchTasks, sortTasks } from 'actions/tasks';
import { getSortedTasks, getTasksIsEmpty, getTasksLenth } from 'selectors';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({
	sortKey: state.tasks.sort,
	tasks: getSortedTasks(state),
	isEmpty: getTasksIsEmpty(state),
	tasksLength: getTasksLenth(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchTasks,
			sortTasks,
		},
		dispatch
	);

class TaskListComponent extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	}

	sortTasksHandler = () => {
		const { sortKey, sortTasks } = this.props;
		if (sortKey === 'asc') sortTasks('desc');
		if (sortKey === 'desc') sortTasks('asc');
	};

	render() {
		const { classes, sortKey, tasks, isEmpty, tasksLength } = this.props;

		return (
			<Paper className={classes.root}>
				<div className={classes.header}>
					<Typography className={classes.title} noWrap variant="subtitle2">
						Task List &nbsp;&nbsp;
						{!isEmpty && '|'}
						&nbsp;&nbsp;&nbsp;
						{!isEmpty && `${tasksLength}`}
					</Typography>
					<SortButton
						sortKey={sortKey}
						disabled={isEmpty}
						onClick={this.sortTasksHandler}
					/>
				</div>
				{!isEmpty
					? tasks.map((task, i) => (
							<motion.div key={task._id} positionTransition>
								<Task task={task} isLastChild={tasksLength === i + 1} />
							</motion.div>
					  ))
					: 'no tasks'}
			</Paper>
		);
	}
}

const TaskListWithStyles = withStyles(styles)(TaskListComponent);
const TaskListWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskListWithStyles);

export const TaskList = TaskListWithRedux;
