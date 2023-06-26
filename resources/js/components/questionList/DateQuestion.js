import ReactQuill from 'react-quill';
import { useState, useRef } from '@wordpress/element';
import { formatDate } from '@helper/formatter.js';
import DatePickerControl from '@components/DatePickerControl.js';
import 'react-quill/dist/quill.snow.css';
export default function DateQuestion( props ) {
	const [ date, setDate ] = useState();
	const [ isActivePicker, setActivePicker ] = useState( false );
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestion: fileQuestion,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const { elements } = fileQuestion[ 0 ].fields[ 0 ];
	const ref = useRef( null );
	const quillModules = {
		toolbar: false,
	};

	const elementsObject = elements.reduce( ( acc, element ) => {
		acc[ element.key ] = element;
		return acc;
	}, {} );

	const {
		label,
		description,
		placeholder,
		required,
		'action-btn': actionBtn,
	} = elementsObject;

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
						placeholder={ `Date ${ required ? '*' : null }` }
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
				<DatePickerControl
					handleChangeDate={ handleChangeDate }
					date={ date }
				/>

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
