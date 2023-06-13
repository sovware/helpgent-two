import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';
import CreatePopup from '../CreatePopup.js';
import { PageHeaderStyle } from './style.js';

function PageHeader( props ) {
	const { forms, setCreatePopupStatus, isCreatePopupOpen } = props;

	return (
		<PageHeaderStyle>
			<h1 className="helpgent-page-header-title">All Forms</h1>
			{ forms && forms.length !== 0 ? (
				<button
					href="#"
					className="helpgent-btn helpgent-btn-dark helpgent-page-header-btn"
					onClick={ () =>
						setCreatePopupStatus( ! isCreatePopupOpen )
					}
				>
					Create New
				</button>
			) : null }
		</PageHeaderStyle>
	);
}

PageHeader.propTypes = {
	forms: PropTypes.array,
	setCreatePopupStatus: PropTypes.func,
	isCreatePopupOpen: PropTypes.bool,
};

export default PageHeader;
