import { useState, Fragment } from '@wordpress/element';
import { ToastContainer } from 'react-toastify';
import { Modal } from '@wordpress/components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
// import isOnlySpace from '../../../../lib/isOnlySpace.js';
import createData from '../../../lib/createData.js';
import useCreateMutation from '../../../hooks/useCreateMutation.js';
import CreatePopupInitial from './components/CreatePopupInitial.js';
import CreatePopupForm from './components/CreatePopupForm.js';
import { CreatePopupStyle } from './components/style.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import isOnlySpace from '../../../lib/isOnlySpace.js';
import getValidationMessage from '../../../lib/getValidationMessage.js';
function CreatePopup( props ) {
	const { isCreatePopupOpen, setCreatePopupStatus } = props;
	const queryClient = useQueryClient();
	const [ form, setForm ] = useState( {
		title: '',
		status: 'publish',
		content: {},
	} );

	const [ formCreationStage, setFormCreationStage ] = useState( 'initial' );
	const [ serverErrors, setServerErrors ] = useState( {} );

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm( {
		mode: 'all',
	} );

	const { mutate } = useCreateMutation(
		'/helpgent/admin/form',
		'helpgent-form',
		function ( previousData, form ) {
			previousData.forms.push( form );
			previousData.total = previousData.forms.length;
			queryClient.setQueryData(
				[ 'helpgent-form' ],
				( old ) => previousData
			);
		}
	);

	function handleCreateForm( form ) {
		const formData = {
			status: 'draft',
			content: { asfasd: 'asdfasd' },
		};
		formData.title = form.title;
		console.log( formData );
		mutate( formData, {
			onError: ( error ) => {
				setServerErrors( error.messages );
			},
		} );
	}

	function handleFormFieldUpdate( event ) {
		const fieldValue = event.target.value;
		setForm( {
			...form,
			title: fieldValue.string().required( 'Required' ),
		} );
	}

	function popupContent() {
		if ( formCreationStage === 'initial' ) {
			return <CreatePopupInitial />;
		} else if ( formCreationStage === 'from-scratch' ) {
			<CreatePopupForm />;
		}
	}

	return (
		isCreatePopupOpen && (
			<Fragment>
				<Modal
					overlayClassName="helpgent-modal helpgent-create-modal-wrap"
					shouldCloseOnClickOutside
					onRequestClose={ () => setCreatePopupStatus( false ) }
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
