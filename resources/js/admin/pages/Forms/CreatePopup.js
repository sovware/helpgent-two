import { useState, Fragment } from '@wordpress/element';
import { ToastContainer } from 'react-toastify';
import { Modal } from '@wordpress/components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import isOnlySpace from '../../../../lib/isOnlySpace.js';
import CreatePopupInitial from './components/CreatePopupInitial.js';
import CreatePopupForm from './components/CreatePopupForm.js';
import { CreatePopupStyle } from './components/style.js';
import 'react-toastify/dist/ReactToastify.css';

function CreatePopup( props ) {
	const { isCreatePopupOpen, setCreatePopupStatus } = props;

	const [ formCreationStage, setFormCreationStage ] = useState( 'initial' );

	function popupContent() {
		if ( formCreationStage === 'initial' ) {
			return (
				<CreatePopupInitial
					setFormCreationStage={ setFormCreationStage }
				/>
			);
		} else if ( formCreationStage === 'scratch' ) {
			return <CreatePopupForm />;
		}
	}

	function handlePopupCloseRequest() {
		setFormCreationStage( 'initial' );
		setCreatePopupStatus( false );
	}

	return (
		isCreatePopupOpen && (
			<Fragment>
				<Modal
					overlayClassName="helpgent-modal helpgent-create-modal-wrap"
					shouldCloseOnClickOutside
					onRequestClose={ () => handlePopupCloseRequest() }
				>
					<CreatePopupStyle className="helpgent-create-form-modal">
						{ popupContent() }
					</CreatePopupStyle>
				</Modal>
				<ToastContainer autoClose={ false } />
			</Fragment>
		)
	);
}

CreatePopup.propTypes = {
	isCreatePopupOpen: PropTypes.bool,
	setCreatePopupStatus: PropTypes.func,
};

export default CreatePopup;
