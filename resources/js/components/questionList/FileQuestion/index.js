import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import cloudUpload from '@icon/cloud-upload-alt.svg';
import 'react-quill/dist/quill.snow.css';
export default function FileQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: fileQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	console.log( fileQuestionField );

	const {
		label,
		description,
		'upload-btn-text': uploadBtnText,
		'upload-note': uploadNote,
		'action-btn': actionBtn,
	} = fileQuestionField;

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				{ /* {
					elements.map(( item, index )=> {
						return(
							<div className={ item.label || item.label === '' ? "helpgent-question-element__label" : "helpgent-question-element__description" } key={ index }>
								<ReactQuill
									modules={ quillModules }
									placeholder="Type your thank text here!*"
								/>
							</div>
						)
					})
				} */ }
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type your question here!*"
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
				<div className="helpgent-question-element__uploader">
					<ReactSVG src={ cloudUpload } />
					<span className="helpgent-uploader-label">
						{ uploadBtnText.upload_btn_text }
					</span>
					<span className="helpgent-uploader-size-limit">
						{ uploadNote.upload_note }
					</span>
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
