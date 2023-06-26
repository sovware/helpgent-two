const onDragEnd = ( results, questions, singleForm, setSingleForm ) => {
	console.log( results );
	const { destination, source, draggableId, type } = results;
	if ( ! destination ) {
		return;
	}
	if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
	) {
		return;
	}
	//console.log(questions);
	const welcomeQuestion = questions.filter(
		( item ) => item.screen_type === 'welcome'
	);
	const endQuestions = questions.filter(
		( item ) => item.screen_type === 'end'
	);
	const otherQuestions = Array.from(
		questions.filter(
			( item ) =>
				item.screen_type !== 'welcome' && item.screen_type !== 'end'
		)
	);
	if ( type === 'helpgent-other-screens' ) {
		const [ removedQuestion ] = otherQuestions.splice( source.index, 1 );
		otherQuestions.splice( destination.index, 0, removedQuestion );
	} else if ( type === 'helpgent-end-screens' ) {
		const [ removedQuestion ] = endQuestions.splice( source.index, 1 );
		endQuestions.splice( destination.index, 0, removedQuestion );
	}
	const updatedOrderedQuestion = [
		...welcomeQuestion,
		...otherQuestions,
		...endQuestions,
	];
	//const newTestQuestion = Array.from(testQuestion);
	//console.log(otherQuestions);

	//const [removedTestQuestion] = newTestQuestion.splice(source.index,1);

	//newQuestionOrder.unshift(welcomeQuestion);

	//console.log(updatedOrderedQuestion, otherQuestions);
	//setTestQuestion(newTestQuestion)
	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: updatedOrderedQuestion } ),
	};
	setSingleForm( updatedForm );

	//setStoreData( [ 'helpgent-single-form' ], { form: updatedForm } );
};

export default onDragEnd;
