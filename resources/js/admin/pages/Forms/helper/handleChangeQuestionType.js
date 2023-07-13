export default function handleChangeQuestionType(
	item,
	singleFormState,
	setSingleFormState
) {
	const { singleForm, activeScreenId } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const updatedQuestions = questions.map( ( question ) => {
		if ( question.id === activeScreenId ) {
			return {
				...item,
				id: activeScreenId,
			};
		}
		return question;
	} );

	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: updatedQuestions } ),
	};
	setSingleFormState( {
		...singleFormState,
		singleForm: updatedForm,
	} );
}
