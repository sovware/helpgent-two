import { endScreen } from '../../../../constants.js';
export default function handleAddEndScreen(
	event,
	questions,
	singleForm,
	setSingleForm
) {
	event.preventDefault();
	questions.push( endScreen );

	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: questions } ),
	};

	setSingleForm( updatedForm );
}
