import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSVG from 'react-inlinesvg';
import videoCameraAlt from '@icon/video-camera-alt.svg';
import microphone from '@icon/microphone.svg';
import text from '@icon/text.svg';
import monitor from '@icon/monitor.svg';

export default function OpenEndedQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestion: openEndedQuestionField,
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
						placeholder={ `Hello there! 👋` }
					/>
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Please leave your questions below"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action">
				<div className="helpgent-form-group helpgent-form-group-column">
					<h2>How would you like to contact?</h2>
					<div className="helpgent-open-ended-question-types">
						<button className="helpgent-open-ended-btn">
							<ReactSVG src={ videoCameraAlt } />
							<span>Video</span>
						</button>
						<button className="helpgent-open-ended-btn">
							<ReactSVG src={ microphone } />
							<span>Voice</span>
						</button>
						<button className="helpgent-open-ended-btn">
							<ReactSVG src={ text } />
							<span>Text</span>
						</button>
						<button className="helpgent-open-ended-btn">
							<ReactSVG src={ monitor } />
							<span>Screen</span>
						</button>
					</div>
					<span className="helpgent-open-ended-notice">
						You can review it before sending
					</span>
				</div>
			</div>
		</div>
	);
}
