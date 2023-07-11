import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import { useState, useRef } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import { MultiSelectStyle } from '../../../style';
import 'react-quill/dist/quill.snow.css';
import check from '@icon/check.svg';
export default function MultiSelectQuestion( props ) {
	const [ date, setDate ] = useState();
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestionField: multiSelectQuestionField,
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
	} = multiSelectQuestionField;

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
				{ /* {
					selectOption.options.map((item,index)=>{
						return(
							<SingleSelectStyle className="helpgent-single-select" key={ index }>
								<input type="radio" name="helpgent-single-select" id={`helpgent-select-option-${index}`} checked={item.isSelected} onChange={()=>{}}/>
								<label
									htmlFor={`helpgent-select-option-${index}`}
									className="helpgent-single-select__option"
								>
									{ item.label }
								</label>
							</SingleSelectStyle>
						)
					})
				} */ }
				{ selectOption.options.map( ( item, index ) => {
					return (
						<MultiSelectStyle
							className="helpgent-multi-select"
							key={ index }
						>
							<input
								type="checkbox"
								name="helpgent-multi-select"
								id={ `helpgent-select-option-${ item.id }` }
								onChange={ () => {} }
							/>
							<label
								htmlFor={ `helpgent-select-option-${ item.id }` }
								className="helpgent-multi-select__option"
							>
								<ReactSVG src={ check } />
								{ item.label }
							</label>
						</MultiSelectStyle>
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
