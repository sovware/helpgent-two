const onDragEnd = (
	results,
	questions,
	singleFormState,
	setSingleFormState
) => {
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
	const { singleForm } = singleFormState;
	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: updatedOrderedQuestion } ),
	};
	setSingleFormState( {
		...singleFormState,
		singleForm: updatedForm,
	} );
};

export default onDragEnd;
