export default function handleFormTitleInput(
	event,
	setInputValidation,
	formTableState,
	setFormTableState
) {
	const inputValue = event.target.value;
	if ( inputValue.trim().length === 0 ) {
		setInputValidation( {
			isValid: false,
			message: 'Only spaces not allowed',
		} );
	} else if ( inputValue === '' ) {
		setInputValidation( {
			isValid: false,
			message: 'Title is required',
		} );
	} else if ( inputValue.trim().length < 5 ) {
		setInputValidation( {
			isValid: false,
			message: 'The title filed must be at least 5 characters.',
		} );
	} else {
		setInputValidation( {
			isValid: true,
			message: '',
		} );
	}
	setFormTableState( {
		...formTableState,
		formInputTitle: inputValue,
	} );
}
