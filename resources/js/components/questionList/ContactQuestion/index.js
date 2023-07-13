import { useState } from '@wordpress/element';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { components, default as Select } from 'react-select';
import ReactSVG from 'react-inlinesvg';
import countries from '../../../data/countries.js';
import { CountryDialerControl } from '../../../style.js';

export default function ContactQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestionField: contactQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const required = true;

	const quillModules = {
		toolbar: false,
	};

	const [ phoneInput, setPhoneInput ] = useState( {
		dialCode: countries[ 0 ].dial_code,
		number: '',
	} );

	const Option = ( optionProps ) => {
		return (
			<components.Option { ...optionProps }>
				<span>{ optionProps.data.name }</span>
			</components.Option>
		);
	};

	const countryOptions = countries.map( ( country ) => {
		return {
			label: <ReactSVG src={ country.flag } />,
			value: country.dial_code,
			name: country.name,
		};
	} );

	function handleSelectCountry( selectedCountry ) {
		setPhoneInput( {
			...phoneInput,
			dialCode: selectedCountry.value,
		} );
	}

	function handleChangeNumber( event ) {
		const onlyNumber = event.target.value.replace( /^\(\+\d+\)\s*/, '' );
		setPhoneInput( {
			...phoneInput,
			number: onlyNumber,
		} );
	}

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Contact Info ${
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
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-contact-name-1"
						className="helpgent-form-group__label"
					>
						First name{ ' ' }
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-contact-name-1"
						className="helpgent-form-group__element"
						placeholder="First name"
					/>
				</div>

				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-contact-name-2"
						className="helpgent-form-group__label"
					>
						Last name
						<span className="helpgent-required-sign">*</span>
					</label>
					<input
						type="text"
						id="helpgent-contact-name-2"
						className="helpgent-form-group__element"
						placeholder="Address"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-contact-email"
						className="helpgent-form-group__label"
					>
						Email
					</label>
					<input
						type="email"
						id="helpgent-contact-email"
						className="helpgent-form-group__element"
						placeholder="Email"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column">
					<label
						htmlFor="helpgent-contact-company"
						className="helpgent-form-group__label"
					>
						Company
					</label>
					<input
						type="text"
						id="helpgent-contact-company"
						className="helpgent-form-group__element"
						placeholder="Company"
					/>
				</div>
				<div className="helpgent-form-group helpgent-form-group-column helpgent-mb-0">
					<label
						htmlFor="helpgent-contact-company"
						className="helpgent-form-group__label"
					>
						Mobile Number
					</label>
					<CountryDialerControl>
						<div className="helpgent-form-group helpgent-mb-0">
							<Select
								options={ countryOptions }
								defaultValue={ countryOptions[ 0 ] }
								components={ { Option } }
								inputId="helpgent-country-select"
								className="helpgent-select"
								classNamePrefix="helpgent-select"
								isSearchable={ false }
								onChange={ handleSelectCountry }
							/>

							<input
								type="text"
								className="helpgent-form-group__element"
								placeholder="(555) 555-5555"
								value={ `(${ phoneInput.dialCode }) ${ phoneInput.number }` }
								onChange={ handleChangeNumber }
							/>
						</div>
					</CountryDialerControl>
				</div>

				{ /* { actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) } */ }
			</div>
		</div>
	);
}
