/* npm imports: material-ui/core */
import { createStyles } from '@material-ui/core/styles';

export const styles = theme =>
	createStyles({
		root: {},
		paper: {
			padding: 20,
		},
		wrapper: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			minHeight: 60,
			padding: 25,
			backgroundColor: theme.palette.background.default,
			borderRadius: 4,
		},
	});
