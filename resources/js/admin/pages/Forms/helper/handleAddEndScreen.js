import { v4 as uuidv4 } from 'uuid';
import { endQuestion } from '../../../../constants.js';
export default function handleAddEndScreen(
	event,
	questions,
	singleFormState,
	setSingleFormState
) {
	event.preventDefault();
	const { singleForm } = singleFormState;
	const newEndQuestion = {
		...endQuestion,
		id: uuidv4(),
	};
	questions.push( newEndQuestion );
	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: questions } ),
	};

	setSingleFormState( {
		...singleFormState,
		singleForm: updatedForm,
	} );
}
