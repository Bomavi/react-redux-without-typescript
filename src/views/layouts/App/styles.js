/* npm imports: material-ui/core */
import { createStyles } from '@material-ui/core/styles';

export const styles = theme =>
	createStyles({
		app: {
			position: 'relative',
			width: '100%',
			minHeight: '100vh',
			fontFamily: 'Roboto, sans-serif',
		},
	});
