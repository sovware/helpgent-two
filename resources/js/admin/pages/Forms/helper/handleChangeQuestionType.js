//import { questions } from "../../../../constants";
export default function handleChangeQuestionType(
	item,
	singleForm,
	setSingleForm,
	activeId
) {
	const { questions } = JSON.parse( singleForm.content );

	//const selectedQuestion = questions.filter(question=> question.screen_type === item.screen_type)[0];

	//console.log(activeId, item, selectedQuestion);

	const updatedQuestions = questions.map( ( question ) => {
		if ( question.id === activeId ) {
			return {
				...item,
				id: activeId,
			};
		}
		return question;
	} );

	console.log( activeId, updatedQuestions );

	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: updatedQuestions } ),
	};
	setSingleForm( updatedForm );
}
