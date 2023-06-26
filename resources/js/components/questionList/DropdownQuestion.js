import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import { useState, useRef } from '@wordpress/element';
import Select from 'react-select';
import { MultiSelectStyle } from '../../style';
import 'react-quill/dist/quill.snow.css';
import check from '@icon/check.svg';
export default function DropdownQuestion( props ) {
	const [ date, setDate ] = useState();
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestion: dropdownQuestion,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const { elements } = dropdownQuestion[ 0 ].fields[ 0 ];
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
		option: selectOption,
		'action-btn': actionBtn,
	} = elementsObject;

	console.log( selectOption.options );

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
				<Select
					inputId="helpgent-page-select"
					className="helpgent-select"
					classNamePrefix="helpgent-select"
					placeholder="Please select"
					options={ selectOption.options }
				/>
				<span className="helpgent-question-element__option-count">
					{ selectOption.options.length } options in list
				</span>
				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
