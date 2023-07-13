import ReactSVG from 'react-inlinesvg';
import ReactQuill from 'react-quill';
import check from '@icon/check.svg';
import { socialIcons } from '../../../constants';

import 'react-quill/dist/quill.snow.css';
export default function EndQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: endQuestionField,
		socialLinks,
		externalButton,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	console.log( endQuestionField );

	return (
		<div className="helpgent-question-element helpgent-question--end">
			<div className="helpgent-question-element__icon">
				<ReactSVG src={ check } />
			</div>
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
			<div className="helpgent-question-element__social">
				{ socialLinks.map( ( item, index ) => (
					<div
						className={ `helpgent-question-element__social-item helpgent-question-element__social-${ item }` }
						key={ index }
					>
						{ ' ' }
						{ socialIcons[ item ] }{ ' ' }
					</div>
				) ) }
			</div>
			{ externalButton.isActive ? (
				<div className="helpgent-question-element__action">
					<button className="helpgent-btn helpgent-btn-primary helpgent-btn-lg helpgent-btn-external">
						{ ' ' }
						{ externalButton.buttonText }{ ' ' }
					</button>
				</div>
			) : null }
		</div>
	);
}
