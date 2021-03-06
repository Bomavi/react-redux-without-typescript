/* npm imports: common */
import React from 'react';

/* npm imports: material-ui/core */
import TextField from '@material-ui/core/TextField';

/* local imports: common */
// import { useStyles } from './styles';

const UsernameInput = props => {
	// const classes = useStyles();

	return (
		<TextField
			fullWidth
			{...props}
			id="username"
			label="Username"
			autoComplete="off"
			margin="normal"
			variant="outlined"
		/>
	);
};

export { UsernameInput };
