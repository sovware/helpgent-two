import AsyncSelect from 'react-select/async';
import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import handleLoadCountries from '@helper/handleLoadCountries';
import envelope from '@icon/envelope.svg';
import 'react-quill/dist/quill.snow.css';
export default function AddressQuestion( props ) {
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestion: fileQuestion,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const { elements } = fileQuestion[ 0 ].fields[ 0 ];

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

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Address ${ required ? '*' : null }` }
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
					<label
						htmlFor="helpgent-address"
						className="helpgent-form-group__label"
					>
						Address{ ' ' }
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-address"
						className="helpgent-form-group__element"
						placeholder="Address"
					/>
				</div>

				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-address-2"
						className="helpgent-form-group__label"
					>
						Address line 2
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-address-2"
						className="helpgent-form-group__element"
						placeholder="Address"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-address-city"
						className="helpgent-form-group__label"
					>
						City <span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-address-city"
						className="helpgent-form-group__element"
						placeholder="Type your city"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-address-state"
						className="helpgent-form-group__label"
					>
						State/Region{ ' ' }
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-address-state"
						className="helpgent-form-group__element"
						placeholder="State/Region"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-address-zip"
						className="helpgent-form-group__label"
					>
						Zip/Post code{ ' ' }
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-address-zip"
						className="helpgent-form-group__element"
						placeholder="Zip/Post code"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-country-select"
						className="helpgent-form-group__label"
					>
						Country{ ' ' }
						<span className="helpgent-required-sign">*</span>
					</label>
					<AsyncSelect
						cacheOptions
						inputId="helpgent-country-select"
						className="helpgent-select"
						classNamePrefix="helpgent-select"
						closeMenuOnSelect={ false }
						hideSelectedOptions={ false }
						// onChange={ ( selectEvent ) =>
						// 	handlePageSelection(
						// 		selectEvent,
						// 		setSelectedPages,
						// 		selectedPages,
						// 		setValue
						// 	)
						// }
						menuPosition="fixed"
						placeholder="Select country"
						loadOptions={ handleLoadCountries }
						defaultOptions
					/>
				</div>

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
