/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import MUIDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

/* root imports: common */
import { getThemeNameToSwitch } from 'selectors';
import { logout } from 'actions/auth';
import { switchTheme } from 'actions/theme';
import { toggleDrawer } from 'actions/ui';

/* local imports: common */
import { styles } from './styles';
import { DrawerItem } from './DrawerItem';

const mapStateToProps = state => ({
	inProgress: state.auth.inProgress,
	isDrawerOpen: state.ui.isDrawerOpen,
	theme: state.auth.theme,
	themeNameToSwitch: getThemeNameToSwitch(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			logout,
			switchTheme,
			toggleDrawer,
		},
		dispatch
	);

class DrawerComponent extends React.Component {
	componentWillUnmount() {
		this.hideDrawer();
	}

	hideDrawer = () => {
		this.props.toggleDrawer(false);
	};

	switchTheme = () => {
		const { switchTheme, themeNameToSwitch } = this.props;

		switchTheme(themeNameToSwitch);
	};

	render() {
		const {
			classes,
			logout,
			theme,
			inProgress,
			isDrawerOpen,
			themeNameToSwitch,
		} = this.props;

		return (
			<MUIDrawer anchor="right" variant="persistent" open={isDrawerOpen}>
				<div className={classes.toolbar} />
				<List>
					<DrawerItem
						text={`Switch to ${themeNameToSwitch} theme`}
						iconName="compare"
						inProgress={theme.inProgress}
						onClick={this.switchTheme}
					/>
				</List>
				<Divider />
				<List>
					<DrawerItem
						text="Logout"
						iconName="logout-variant"
						inProgress={inProgress}
						onClick={logout}
					/>
				</List>
			</MUIDrawer>
		);
	}
}

const DrawerWithStyles = withStyles(styles)(DrawerComponent);
const DrawerWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(DrawerWithStyles);

export const Drawer = DrawerWithRedux;
