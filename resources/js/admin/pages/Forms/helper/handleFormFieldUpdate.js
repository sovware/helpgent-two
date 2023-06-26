export default function handleFormFieldUpdate( event, setForm, form ) {
	const fieldValue = event.target.value;
	setForm( {
		...form,
		title: fieldValue.string().required( 'Required' ),
	} );
}
