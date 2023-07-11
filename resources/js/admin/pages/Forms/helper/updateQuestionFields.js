export default function updateQuestionFields(
	fields,
	activeScreenId,
	singleForm,
	setSingleForm
) {
	const { questions } = JSON.parse( singleForm.content );
	const updatedQuestions = questions.map( ( question ) => {
		if ( question.id === activeScreenId ) {
			return {
				...question,
				fields: fields,
			};
		}
		return question;
	} );

	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: updatedQuestions } ),
	};

	setSingleForm( updatedForm );
}
