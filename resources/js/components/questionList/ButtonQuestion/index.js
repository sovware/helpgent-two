import 'react-quill/dist/quill.snow.css';
export default function ButtonQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: buttonQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__action">
				<button className="helpgent-btn-submit helpgent-btn helpgent-btn-primary helpgent-btn-md">
					Submit
				</button>
			</div>
		</div>
	);
}
