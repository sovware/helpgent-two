import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import clock from '@icon/clock.svg';
import 'react-quill/dist/quill.snow.css';
export default function ShortTextQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: shortTextQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder="Your question here!*"
					/>
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type a description"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action">
				<div className="helpgent-form helpgent-form-group">
					<input
						type="text"
						className="helpgent-form-group__element"
						placeholder="Type your answer here…"
					/>
				</div>
				<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
					Submit
				</button>
			</div>
		</div>
	);
}
