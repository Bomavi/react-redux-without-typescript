/* npm imports: common */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* npm imports: material-ui/core */
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

/* root imports: view components */
import { Content } from 'views/layouts';

/* root imports: common */
import { Routes } from 'routes';
import { authenticate } from 'actions/auth';
import { getSelectedTheme } from 'selectors';

/* local imports: common */
import { styles } from './styles';

const mapStateToProps = state => ({
	selectedTheme: getSelectedTheme(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			authenticate,
		},
		dispatch
	);

class AppComponent extends React.Component {
	componentDidMount() {
		this.props.authenticate();
	}

	render() {
		const { classes, selectedTheme } = this.props;

		return (
			<ThemeProvider theme={selectedTheme}>
				<>
					<CssBaseline />
					<div className={classes.app}>
						<Content>
							<Routes />
						</Content>
					</div>
				</>
			</ThemeProvider>
		);
	}
}

const AppWithStyles = withStyles(styles)(AppComponent);
const AppWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppWithStyles);

export const App = AppWithRedux;
