import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ContactQuestion( props ) {
	const {
		layoutMode,
		singleForm,
		setSingleForm,
		selectedQuestion: fileQuestion,
	} = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );

	const { elements } = fileQuestion[ 0 ].fields[ 0 ];

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

	const quillModules = {
		toolbar: false,
	};

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Contact Info ${ required ? '*' : null }` }
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


				{/* { actionBtn.isActive && (
					<button className="helpgent-btn-next helpgent-btn helpgent-btn-primary helpgent-btn-md">
						{ actionBtn.button_text }
					</button>
				) } */}
			</div>
		</div>
	);
}
