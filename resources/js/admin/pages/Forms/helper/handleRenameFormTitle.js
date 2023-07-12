import { toast } from 'react-toastify';
export default async function handleRenameFormTitle(
	renameFormMutation,
	id,
	allForms,
	formTableState,
	setStoreData,
	setEditModeStatus
) {
	const updatedTitle = {
		title: formTableState.formInputTitle,
	};

	try {
		const updateFormResponse = await renameFormMutation( updatedTitle );
		const updatedForms = allForms.forms.map( ( singleForm ) => {
			if ( singleForm.id === id ) {
				return {
					...singleForm,
					title: formTableState.formInputTitle,
				};
			}
			return singleForm;
		} );

		const formData = {
			...allForms,
			forms: updatedForms,
		};
		setStoreData( [ 'helpgent-form' ], formData );
		setEditModeStatus( false );

		toast.success( updateFormResponse.message );
	} catch ( error ) {
		console.log( error );
	}
}
