/* npm imports: material-ui/core */
import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
	createStyles({
		subtitle: {
			marginBottom: 20,
			textTransform: 'uppercase',
		},
	})
);