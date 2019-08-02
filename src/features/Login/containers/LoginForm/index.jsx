/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

/* root imports: common */
import {
	UsernameInput,
	PasswordInput,
	LoginTabs,
	LoginButton,
} from 'features/Login/components';
import { login, register } from 'actions/auth';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			login,
			register,
		},
		dispatch
	);

class LoginFormComponent extends React.Component {
	state = {
		tabIndex: 0,
		username: '',
		password: '',
		repeatPassword: '',
	};

	get isPasswordCorrect() {
		return this.state.password === this.state.repeatPassword;
	}

	get isLoginReady() {
		return !!this.state.username && !!this.state.password;
	}

	get isRegistrationReady() {
		return this.isLoginReady && this.isPasswordCorrect;
	}

	tabClickHandler = (e, value) => {
		this.setState(() => ({
			tabIndex: value,
		}));
	};

	usernameChangeHandler = e => {
		const { value } = e.target;
		this.setState(() => ({
			username: value,
		}));
	};

	passwordChangeHandler = e => {
		const { value } = e.target;
		this.setState(() => ({
			password: value,
		}));
	};

	repeatPasswordChangeHandler = e => {
		const { value } = e.target;
		this.setState(() => ({
			repeatPassword: value,
		}));
	};

	loginHandler = () => {
		const { login } = this.props;
		const userData = {
			username: this.state.username,
			password: this.state.password,
		};

		if (this.isLoginReady) login(userData);
	};

	registrationHandler = () => {
		const { register } = this.props;
		const userData = {
			username: this.state.username,
			password: this.state.password,
		};

		if (this.isRegistrationReady) register(userData);
	};

	render() {
		const { tabIndex, username, password, repeatPassword } = this.state;
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<LoginTabs tabIndex={tabIndex} onChange={this.tabClickHandler} />
				<div className={classes.wrapper}>
					<UsernameInput
						value={username}
						onChange={this.usernameChangeHandler}
					/>
					<PasswordInput
						value={password}
						onChange={this.passwordChangeHandler}
					/>
					{tabIndex === 0 && (
						<LoginButton
							marginTop={14}
							gradient="secondary"
							onClick={this.loginHandler}
						>
							Login
						</LoginButton>
					)}
					{tabIndex === 1 && (
						<>
							<PasswordInput
								repeatPassword
								value={repeatPassword}
								onChange={this.repeatPasswordChangeHandler}
							/>
							<LoginButton
								marginTop={14}
								gradient="secondary"
								onClick={this.registrationHandler}
							>
								Register
							</LoginButton>
						</>
					)}
				</div>
			</Paper>
		);
	}
}

const LoginFormWithStyles = withStyles(styles)(LoginFormComponent);
const LoginFormWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginFormWithStyles);

export const LoginForm = LoginFormWithRedux;
