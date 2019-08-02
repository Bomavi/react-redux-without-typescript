/* npm imports: common */
import React, { Suspense } from 'react';
import cx from 'classnames';

/* root imports: common */
import HELP from 'assets/icons/help';

/* local imports: common */
import { useStyles } from './styles';

const Icon = ({ name, size = 'sm', svgSize = 'sm', color }) => {
	const SVG = React.lazy(() => import(`assets/icons/${name}`));
	const classes = useStyles({ color });

	return (
		<div className={cx(classes.iconWrapper, size)}>
			<div className={cx(classes.svgWrapper, svgSize)}>
				<Suspense fallback={<HELP style={{ width: 16, height: 16 }} />}>
					<SVG />
				</Suspense>
			</div>
		</div>
	);
};

export { Icon };
