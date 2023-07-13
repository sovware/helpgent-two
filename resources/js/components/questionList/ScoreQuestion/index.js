import { useState } from '@wordpress/element';
import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import clock from '@icon/clock.svg';
import 'react-quill/dist/quill.snow.css';
import { ScoreQuestionStyle } from '../../../style';
export default function ScoreQuestion( props ) {
	const [ activeScore, setActiveScore ] = useState();
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: scoreQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	function handleScoreActivate( item ) {
		setActiveScore( item );
	}

	const {
		label,
		description,
		placeholder,
		required,
		'action-btn': actionBtn,
	} = scoreQuestionField;

	function getScoringItem() {
		const scoreList = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
		const scoreDoms = scoreList.map( ( item, key ) => (
			<li
				className={
					activeScore === item
						? 'helpgent-promoter-score__single helpgent-active'
						: 'helpgent-promoter-score__single'
				}
				key={ item }
				onClick={ () => handleScoreActivate( item ) }
			>
				{ item }
			</li>
		) );
		return scoreDoms;
	}
	return (
		<ScoreQuestionStyle className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Website ${ required ? '*' : null }` }
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
				<div className="helpgent-promoter-score">
					<ul className="helpgent-promoter-score__list">
						{ getScoringItem() }
					</ul>
					<div className="helpgent-promoter-score__wayline">
						<div className="helpgent-promoter-score__lowest-text">
							Worst
						</div>
						<div className="helpgent-promoter-score__highest-text">
							Best
						</div>
					</div>
				</div>

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</ScoreQuestionStyle>
	);
}
