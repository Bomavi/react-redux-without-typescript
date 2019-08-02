/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* root imports: view components */
import { AddTask, Search } from 'features/Home/components';

/* root imports: common */
import { createTask, searchTasks, fetchTasks } from 'actions/tasks';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({
	inProgress: state.tasks.inProgress,
	isFetching: state.tasks.isFetching,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createTask,
			searchTasks,
			fetchTasks,
		},
		dispatch
	);

class ActionTabsComponent extends React.Component {
	state = {
		tabIndex: 0,
	};

	tabClickHandler = (e, value) => {
		this.setState(() => ({
			tabIndex: value,
		}));
	};

	render() {
		const { tabIndex } = this.state;
		const {
			classes,
			inProgress,
			isFetching,
			createTask,
			searchTasks,
			fetchTasks,
		} = this.props;

		return (
			<Paper className={classes.root}>
				<Tabs
					value={tabIndex}
					onChange={this.tabClickHandler}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Add new task" />
					<Tab label="Search tasks" />
				</Tabs>
				<div className={classes.tabContent}>
					{tabIndex === 0 && (
						<AddTask inProgress={inProgress} createTask={createTask} />
					)}
					{tabIndex === 1 && (
						<Search
							isFetching={isFetching}
							searchTasks={searchTasks}
							fetchTasks={fetchTasks}
						/>
					)}
				</div>
			</Paper>
		);
	}
}

const ActionTabsWithStyles = withStyles(styles)(ActionTabsComponent);
const ActionTabsWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(ActionTabsWithStyles);

export const ActionTabs = ActionTabsWithRedux;
