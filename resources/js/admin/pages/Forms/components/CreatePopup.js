import { Modal } from '@wordpress/components';
import PropTypes from 'prop-types';
import { CreatePopupStyle } from './style.js';
function CreatePopup( props ) {
	const { isCreatePopupOpen, setCreatePopupStatus } = props;

	const formData = {
		title: 'Helpgent version 2',
		status: 'publish',
		content: {},
	};

	return (
		isCreatePopupOpen && (
			<Modal
				overlayClassName="helpgent-modal helpgent-create-modal-wrap"
				shouldCloseOnClickOutside
				onRequestClose={ () => setCreatePopupStatus( false ) }
			>
				<CreatePopupStyle className="helpgent-create-form-modal">
					<div className="helpgent-form-group">
						<input
							type="text"
							className="helpgent-form__element"
							placeholder="Form Name"
							value=""
						/>
					</div>
					<button className="helpgent-btn helpgent-btn-md helpgent-btn-dark helpgent-btn-block">
						Create Form
					</button>
				</CreatePopupStyle>
			</Modal>
		)
	);
}

CreatePopup.propTypes = {
	isCreatePopupOpen: PropTypes.bool,
	setCreatePopupStatus: PropTypes.func,
};

export default CreatePopup;
