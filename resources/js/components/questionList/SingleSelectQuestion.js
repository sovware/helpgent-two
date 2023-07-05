import ReactQuill from 'react-quill';
import { useState, useRef } from '@wordpress/element';
import { formatDate } from '@helper/formatter.js';
import DatePickerControl from '@components/DatePickerControl.js';
import { SingleSelectStyle } from '../../style';
import 'react-quill/dist/quill.snow.css';
export default function SingleSelectQuestion( props ) {
	const [ date, setDate ] = useState();
	const [ isActivePicker, setActivePicker ] = useState( false );
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestionField: singleSelectQuestionField,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const ref = useRef( null );
	const quillModules = {
		toolbar: false,
	};

	const {
		label,
		description,
		placeholder,
		required,
		option: selectOption,
		'action-btn': actionBtn,
	} = singleSelectQuestionField;

	console.log( selectOption.options );

	const dateFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	};

	function handleChangeDate( date ) {
		const formattedData = formatDate(
			// 'de-DE',
			// 'de-US',
			'en-US',
			// 'en-GB',
			date,
			dateFormatOptions
		);

		const modifiedSeparator = formattedData.replace( /\//g, '-' );
		setDate( modifiedSeparator );
	}

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
			<div className="helpgent-question-element__action">
				{ selectOption.options.map( ( item, index ) => {
					return (
						<SingleSelectStyle
							className="helpgent-single-select"
							key={ index }
						>
							<input
								type="radio"
								name="helpgent-single-select"
								id={ `helpgent-select-option-${ index }` }
								checked={ item.isSelected }
								onChange={ () => {} }
							/>
							<label
								htmlFor={ `helpgent-select-option-${ index }` }
								className="helpgent-single-select__option"
							>
								{ item.label }
							</label>
						</SingleSelectStyle>
					);
				} ) }

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
