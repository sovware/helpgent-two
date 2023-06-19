import { PreviewComponents } from './constants.js';
import { QuestionPreviewStyle } from './style.js';
export default function QuestionPreview( props ) {
	const { singleForm, setSingleForm, activeScreenId } = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	const selectedQuestion = questions.filter(
		( item ) => item.id === activeScreenId
	);
	const SelectedComponent =
		PreviewComponents[ selectedQuestion[ 0 ].screen_type ];
	return (
		<QuestionPreviewStyle>
			<SelectedComponent
				layoutMode="test"
				singleForm={ singleForm }
				setSingleForm={ setSingleForm }
			/>
		</QuestionPreviewStyle>
	);
}
