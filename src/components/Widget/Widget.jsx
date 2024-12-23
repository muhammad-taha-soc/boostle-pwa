import React from 'react';
import './Widget.scss';

const Widget = ({ title, noTitle, children, height }) => {

	return (
		<div className={`widget ${height ? `widget--${height}` : ''}`}>
			{!noTitle ? (
				<div className='widget__header al al--center al--spaced'>
					<p className='widget__header-title bold no-margin'>
						{title}
					</p>
					<div className='widget__header-actions'>
						<div className='icon icon-chevron-right' />
					</div>
				</div>
			) : null}
			<div className='widget__content al al--col'>
				{children}
			</div>
		</div>
	);
};

export default Widget;
export { Widget as WidgetTest };
