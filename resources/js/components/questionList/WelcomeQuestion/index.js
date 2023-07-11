import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import clock from '@icon/clock.svg';
import 'react-quill/dist/quill.snow.css';
export default function WelcomeQuestion( props ) {
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestionField: welcomeQuestionField,
	} = props;
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
						placeholder="Type your greeting text here!*"
					/>
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type description here!*"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action helpgent-mt-20">
				<button className="helpgent-btn-start helpgent-btn helpgent-btn-primary helpgent-btn-md">
					{ welcomeQuestionField[ 'btn-text' ].button_text }
				</button>
				<div className="helpgent-question-time">
					<ReactSVG src={ clock } />
					<span>Take 10 minutes</span>
				</div>
			</div>
		</div>
	);
}
