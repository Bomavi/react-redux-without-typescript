/* npm imports: material-ui/core */
import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			zIndex: 3,
		},
	})
);