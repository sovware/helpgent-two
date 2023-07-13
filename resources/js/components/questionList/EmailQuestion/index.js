import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import envelope from '@icon/envelope.svg';
import 'react-quill/dist/quill.snow.css';
export default function EmailQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: emailQuestionField,
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
	} = emailQuestionField;

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill modules={ quillModules } placeholder="Email" />
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type a description"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action">
				<div className="helpgent-form helpgent-form-group helpgent-form-icon-left">
					<span className="helpgent-input-icon">
						<ReactSVG src={ envelope } />
					</span>
					<input
						type="email"
						className="helpgent-form-group__element"
						placeholder="Email address"
					/>
				</div>

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
