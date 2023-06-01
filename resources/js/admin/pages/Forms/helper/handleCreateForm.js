export default function handleCreateForm( form ) {
	const formData = {
		status: 'draft',
		content: { asfasd: 'asdfasd' },
	};
	formData.title = form.title;
	mutate( formData, {
		onError: ( error ) => {
			setServerErrors( error.messages );
		},
	} );
}
