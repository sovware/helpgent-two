import { v4 as uuidv4 } from 'uuid';
let frame;
export default function handleOpenUploader(
	medias,
	activeScreenId,
	singleFormState,
	setSingleFormState
) {
	// If the media frame already exists, reopen it.
	if ( frame ) {
		frame.open();
		return;
	}
	// Create a new media frame
	frame = wp.media( {
		title: 'Select or Upload Media Of Your Chosen Persuasion',
		button: {
			text: 'Use this media',
		},
		library: {
			type: [ 'video', 'image' ],
		},
		multiple: false, // Set to true to allow multiple files to be selected
	} );

	frame.on( 'select', function () {
		let attachment =
			frame.state().get( 'selection' ).first() &&
			frame.state().get( 'selection' ).first().toJSON();

		const newMedia = {
			id: uuidv4(),
			type: attachment.type,
			url: attachment.url,
		};

		medias = [];
		medias.push( newMedia );
		const { singleForm } = setSingleFormState;
		const { questions } = JSON.parse( singleForm.content );
		const updatedQuestions = questions.map( ( question ) => {
			if ( question.id === activeScreenId ) {
				return {
					...question,
					medias,
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
	} );

	// Finally, open the modal on click
	frame.open();
}
