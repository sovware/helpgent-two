import { screenData } from '../../../../constants';
export default async function handleCreateForm( form, createFormMutation ) {
	const screenFormData = JSON.stringify( screenData );

	console.log( createFormMutation );
	const formData = {
		status: 'draft',
		content: screenFormData,
	};
	formData.title = form.title;
	formData.available_pages = form.available_pages;
	formData.is_chat_bubble = form.displayChatBubble;
	console.log( formData );
	try {
		const createFormResponse = await createFormMutation( formData );
		console.log( createFormResponse );
	} catch ( error ) {
		console.log( error );
	}

	// mutate( formData, {
	// 	onError: ( error ) => {
	// 		setServerErrors( error.messages );
	// 	},
	// } );
}
