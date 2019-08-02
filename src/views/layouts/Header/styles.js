/* npm imports: material-ui/core */
import { createStyles } from '@material-ui/core/styles';

export const styles = theme =>
	createStyles({
		appBar: {
			flexGrow: 1,
			zIndex: theme.zIndex.drawer + 1,
		},
		title: {
			flexGrow: 1,
		},
		hello: {
			marginRight: 10,
		},
	});
