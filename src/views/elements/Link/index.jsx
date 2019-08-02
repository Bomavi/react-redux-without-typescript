/* npm imports: common */
import React from 'react';
import cx from 'classnames';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';

/* root imports: common */
import router from 'config/router';

/* local imports: common */
import { styles } from './styles';

class LinkComponent extends React.Component {
	static defaultProps = {
		block: false,
		options: {},
		params: {},
	};

	handleClick = event => {
		const { name, params, options } = this.props;
		const comboKey = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

		if (event.button === 0 && !comboKey) {
			event.preventDefault();
			router.navigate(name, params, options);
		}
	};

	render() {
		const { children, classes, name, block, params } = this.props;
		const href = router.buildPath(name, params);

		if (href === null) console.error("<Link> Couldn't make URL for", name, params);

		const rootClass = {
			[classes.root]: !block,
			[classes.block]: block,
			[classes.active]: router.isActive(name),
		};

		return (
			<a href={href} className={cx(rootClass)} onClick={this.handleClick}>
				<div className={classes.iconWrapper}>{children}</div>
			</a>
		);
	}
}

const Link = withStyles(styles)(LinkComponent);

export { Link };
