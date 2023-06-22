import ReactSVG from 'react-inlinesvg';
import ReactQuill from 'react-quill';
import check from '@icon/check.svg';
import { socialIcons } from '../constants';

import 'react-quill/dist/quill.snow.css';
export default function EndQuestion( props ) {
	const { layoutMode, singleForm, setSingleForm, selectedQuestion } = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	console.log( selectedQuestion );

	const {
		elements,
		socials: socialLinks,
		externalButton,
	} = selectedQuestion[ 0 ].fields[ 0 ];

	const quillModules = {
		toolbar: false,
	};

	return (
		<div className="helpgent-question-element helpgent-question--end">
			<div className="helpgent-question-element__icon">
				<ReactSVG src={ check } />
			</div>
			<div className="helpgent-question-element__text">
				{ elements.map( ( item, index ) => {
					return (
						<div
							className={
								item.label || item.label === ''
									? 'helpgent-question-element__label'
									: 'helpgent-question-element__description'
							}
							key={ index }
						>
							<ReactQuill
								modules={ quillModules }
								placeholder="Type your thank text here!*"
							/>
						</div>
					);
				} ) }
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
