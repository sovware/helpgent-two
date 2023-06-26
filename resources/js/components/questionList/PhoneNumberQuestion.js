import ReactQuill from 'react-quill';
import ReactSVG from 'react-inlinesvg';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import countries from '../../data/countries';
export default function PhoneNumberQuestion( props ) {
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

	console.log( elementsObject );

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill modules={ quillModules } placeholder="Email" />
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type a description"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action">
				<div className="helpgent-form-group">
					<input
						type="email"
						className="helpgent-form-group__element"
						placeholder="Email address"
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
