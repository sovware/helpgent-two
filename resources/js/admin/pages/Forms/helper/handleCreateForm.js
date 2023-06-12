import { allForms } from '../../../../constants';
export default async function handleCreateForm( form, createFormMutation ) {
	const screenFormData = JSON.stringify( allForms );

	console.log( createFormMutation );
	const formData = {
		status: 'draft',
		content: screenFormData,
	};
	formData.title = form.title;
	formData.available_pages = form.available_pages;
	formData.is_chat_bubble = form.displayChatBubble;
	try {
		const createFormResponse = await createFormMutation( formData );
	} catch ( error ) {
		console.log( error );
	}
}
