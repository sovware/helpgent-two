import { useSingleFormState } from '../../context/SingleFormStateContext';
import { previewComponents } from '../../../../../constants.js';
import { QuestionPreviewStyle } from '../../../../../style.js';
export default function QuestionPreview( props ) {
	const { selectedQuestion } = props;
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const {
		elements: questionFields,
		socials,
		externalButton,
	} = selectedQuestion.fields[ 0 ];

	const fieldObject = questionFields.reduce( ( acc, field ) => {
		acc[ field.key ] = field;
		return acc;
	}, {} );
	const SelectedComponent = previewComponents[ selectedQuestion.screen_type ];
	return (
		<QuestionPreviewStyle
			style={ {
				'--helpgent-label-font-size': '20px',
				'--helpgent-label-font-weight': 600,
				'--helpgent-label-color': '#000000',
				'--helpgent-description-font-size': '14px',
				'--helpgent-description-font-weight': 400,
				'--helpgent-description-color': '#3C3C3C',
				'--helpgent-btn-color': '#6551F2',
				'--helpgent-btn-radius': '10px',
				'--helpgent-btn-text-color': '#ffffff',
				'--helpgent-btn-font-size': '15px',
				'--helpgent-input-radius': '10px',
				'--helpgent-input-background': '#EFEFEF',
			} }
		>
			<SelectedComponent
				singleFormState={ singleFormState }
				setSingleFormState={ setSingleFormState }
				layoutMode="test"
				selectedQuestionField={ fieldObject }
				socialLinks={ socials }
				externalButton={ externalButton }
			/>
		</QuestionPreviewStyle>
	);
}
