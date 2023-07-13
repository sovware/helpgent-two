import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import envelope from '@icon/envelope.svg';
import 'react-quill/dist/quill.snow.css';
export default function ResultQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: resultQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	const {
		label,
		description,
		placeholder,
		required,
		'action-btn': actionBtn,
	} = resultQuestionField;

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Type a question ${
							required ? '*' : null
						}` }
					/>
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type a description"
					/>
				</div>
			</div>
		</div>
	);
}
