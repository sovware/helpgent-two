import { useState } from '@wordpress/element';
import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import { components, default as Select } from 'react-select';
import 'react-quill/dist/quill.snow.css';
import countries from '../../data/countries.js';
import { CountryDialerControl } from '../../style.js';
export default function PhoneNumberQuestion( props ) {
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestionField: phoneQuestionField,
	} = props;
	const [ phoneInput, setPhoneInput ] = useState( {
		dialCode: countries[ 0 ].dial_code,
		number: '',
	} );
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const quillModules = {
		toolbar: false,
	};

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

	const {
		label,
		description,
		placeholder,
		required,
		'action-btn': actionBtn,
	} = phoneQuestionField;

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
						placeholder="Phone number"
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
				<CountryDialerControl>
					<div className="helpgent-form-group">
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

				{ actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) }
			</div>
		</div>
	);
}
