// export default function updateQuestionFields(
// 	fields,
// 	activeScreenId,
// 	singleFormState,
// 	setSingleFormState
// ) {
// 	const { singleForm } = appState;
// 	const { questions } = JSON.parse( singleForm.content );
// 	const updatedQuestions = questions.map( ( question ) => {
// 		if ( question.id === activeScreenId ) {
// 			return {
// 				...question,
// 				fields: fields,
// 			};
// 		}
// 		return question;
// 	} );

// 	const updatedForm = {
// 		...singleForm,
// 		content: JSON.stringify( { questions: updatedQuestions } ),
// 	};

// 	setSingleFormState( {
// 		...singleFormState,
// 		singleForm: updatedForm,
// 	} );
// }

export default function updateQuestion(
	itemType,
	updatedItem,
	screenId,
	singleFormState,
	setSingleFormState
) {
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const updatedQuestions = questions.map( ( question ) => {
		if ( question.id === screenId ) {
			return {
				...question,
				[itemType]: updatedItem,
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
