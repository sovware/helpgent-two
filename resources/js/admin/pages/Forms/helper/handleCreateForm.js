import { initialQuestions } from '../../../../constants';
export default async function handleCreateForm(
	form,
	createFormMutation,
	setServerErrors,
	navigate
) {
	const screenFormContent = JSON.stringify( { initialQuestions } );

	const formData = {
		status: 'draft',
		is_guest_allowed: '0',
		content: screenFormContent,
	};
	formData.title = form.title;
	formData.available_pages = form.available_pages;
	formData.is_chat_bubble = form.displayChatBubble;
	try {
		const createFormResponse = await createFormMutation( formData );
		if ( createFormResponse ) {
			navigate( `/forms/${ createFormResponse.form_id }` );
		}
	} catch ( error ) {
		const errors = {
			internal: error.message,
		};
		setServerErrors( errors );
		console.log( error );
	}
}
