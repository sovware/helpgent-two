import { v4 as uuidv4 } from 'uuid';
export default function handleAddQuestion(
	item,
	singleFormState,
	setSingleFormState
) {
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	item.id = uuidv4();
	if ( item.type === 'welcome' && hasWelcomeQuestion !== 0 ) {
		return;
	}
	questions.push( item );

	const updatedForm = {
		...singleForm,
		content: JSON.stringify( { questions: questions } ),
	};
	setSingleFormState( {
		...singleFormState,
		singleForm: updatedForm,
	} );
}
