import { useState } from '@wordpress/element';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSVG from 'react-inlinesvg';
import star from '@icon/star.svg';
import starAlt from '@icon/star-alt.svg';

export default function RatingQuestion( props ) {
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestion: ratingQuestionField,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const quillModules = {
		toolbar: false,
	};

	const ratingAmount = 5;
	let [ score, setScore ] = useState( null );
	let [ ratingIndex, setRatingIndex ] = useState( score );
	let [ ratingSelected, setRatingSelected ] = useState( false );

	function handleClick( event, index ) {
		let selectedIndex = event.target.closest( '.helpgent-rating-single' )
			.dataset.key;
		setRatingIndex( index + 1 );
		setScore( selectedIndex );
		setRatingSelected( true );
	}

	function handleMouseLeave() {
		ratingSelected ? setRatingIndex( score ) : setRatingIndex( null );
	}

	function handleMouseOver( index ) {
		setRatingIndex( index + 1 );
	}

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder="Your question here"
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
				<div className="helpgent-form-group helpgent-form-group-column">
					<div className="helpgent-form-group helpgent-rating-wrapper">
						{ [ ...Array( ratingAmount ) ].map( ( _, index ) => (
							<div
								className={ `helpgent-rating-single${
									index < ratingIndex
										? ' helpgent-rating-single--selected'
										: ''
								}` }
								data-key={ index + 1 }
								onMouseEnter={ () => handleMouseOver( index ) }
								onMouseLeave={ handleMouseLeave }
								onClick={ ( event ) =>
									handleClick( event, index )
								}
								key={ index }
							>
								<ReactSVG
									src={ index < ratingIndex ? star : starAlt }
								/>
								<span className="helpgent-rating-value">
									{ index + 1 }
								</span>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</div>
	);
}
