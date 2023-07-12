import { initialQuestions } from '../../../../constants';
export default async function handleCreateForm(
	form,
	createFormMutation,
	setServerErrors,
	navigate
) {
	const screenFormContent = JSON.stringify( { questions: initialQuestions } );

	const formData = {
		status: 'draft',
		is_guest_allowed: '0',
		content: screenFormContent,
	};

	const pageIds =
		form.available_pages &&
		form.available_pages.map( ( page ) => page.value );
	formData.title = form.title;
	formData.available_pages = pageIds || [];
	formData.is_chat_bubble = form.displayChatBubble || '0';

	try {
		const createFormResponse = await createFormMutation( formData );
		if ( createFormResponse ) {
			navigate( `/forms/${ createFormResponse.form.id }` );
		}
	} catch ( error ) {
		const errors = {
			internal: 'Server Error',
		};
		setServerErrors( errors );
	}
}
