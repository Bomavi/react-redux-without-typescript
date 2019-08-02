/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

/* root imports: common */
import { Subtitle, LoginButton } from 'features/Login/components';
import { login } from 'actions/auth';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			login,
		},
		dispatch
	);

class GuestFormComponent extends React.Component {
	loginHandler = () => {
		this.props.login({ isGuest: true });
	};

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<Subtitle>Use Guest Access</Subtitle>
				<div className={classes.wrapper}>
					<LoginButton gradient="primary" onClick={this.loginHandler}>
						Get access
					</LoginButton>
				</div>
			</Paper>
		);
	}
}

const GuestFormWithStyles = withStyles(styles)(GuestFormComponent);
const GuestFormWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(GuestFormWithStyles);

export const GuestForm = GuestFormWithRedux;
