import { useState } from '@wordpress/element';
import CreatePopup from './CreatePopup.js';
import { PageHeaderStyle } from './style.js';

function PageHeader() {
	const [ createPopupStatus, setCreatePopupStatus ] = useState( false );

	return (
		<PageHeaderStyle>
			<h1 className="helpgent-page-header-title">All Forms</h1>
			<button
				href="#"
				className="helpgent-btn helpgent-btn-dark helpgent-page-header-btn"
				onClick={ () => setCreatePopupStatus( ! createPopupStatus ) }
			>
				Create New
			</button>

			<CreatePopup
				isCreatePopupOpen={ createPopupStatus }
				setCreatePopupStatus={ setCreatePopupStatus }
			/>
		</PageHeaderStyle>
	);
}

export default PageHeader;
