export default function getValidationMessage( validationMessage ) {
	return (
		<span
			className="helpgent-validate-danger"
			dangerouslySetInnerHTML={ { __html: validationMessage } }
		></span>
	);
}
