/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

/* root imports: view components */
import { Icon } from 'views/elements';

/* root imports: common */
import { toggleDrawer } from 'actions/ui';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({
	user: state.auth.user,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			toggleDrawer,
		},
		dispatch
	);

class HeaderComponent extends React.Component {
	toggleDrawerHandler = () => {
		if (this.props.toggleDrawer) this.props.toggleDrawer();
	};

	render() {
		const { classes, user } = this.props;

		return (
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap className={classes.title}>
						TODO'SHER
					</Typography>
					{user && (
						<Typography variant="subtitle2" noWrap className={classes.hello}>
							Hello, {user.username}
						</Typography>
					)}
					{user && (
						<IconButton color="inherit" onClick={this.toggleDrawerHandler}>
							<Icon
								name="account-circle"
								color="white"
								size="md"
								svgSize="lg"
							/>
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

const HeaderWithStyles = withStyles(styles)(HeaderComponent);
const HeaderWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderWithStyles);

export const Header = HeaderWithRedux;
