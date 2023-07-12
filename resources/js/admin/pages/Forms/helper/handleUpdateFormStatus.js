import { toast } from 'react-toastify';
export default async function handleUpdateFormStatus(
	id,
	forms,
	status,
	updateStatusFormMutation,
	setStoreData
) {
	const newStatus = status === 'publish' ? 'draft' : 'publish';
	const updatedStatusObj = {
		status: newStatus,
	};

	try {
		const updateFormResponse = await updateStatusFormMutation(
			updatedStatusObj
		);
		const updatedForms = forms.forms.map( ( singleForm ) => {
			if ( singleForm.id === id ) {
				return {
					...singleForm,
					status: newStatus,
				};
			}
			return singleForm;
		} );

		const formData = {
			...forms,
			forms: updatedForms,
		};

		setStoreData( [ 'helpgent-form' ], formData );

		toast.success( updateFormResponse.message, {
			autoClose: 3000,
		} );
	} catch ( error ) {
		console.log( error );
	}
}
