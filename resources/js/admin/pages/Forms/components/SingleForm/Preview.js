import ReactSVG from 'react-inlinesvg';
import MediaPreview from './MediaPreview';
import QuestionPreview from './QuestionPreview';
import PreviewDeviceControl from './PreviewDeviceControl';
import handDown from '@icon/hand-down.svg';
import { PreviewStyle } from './style';
export default function Preview( props ) {
	const { singleForm, setSingleForm, activeScreenId } = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	const selectedQuestion = questions.filter(
		( item ) => item.id === activeScreenId
	);
	console.log( activeScreenId, selectedQuestion );
	return (
		<PreviewStyle>
			<div className="helpgent-preview-top">
				<ReactSVG src={ handDown } />
				<span className="helpgent-preview-top__text">
					Preview your changes
				</span>
			</div>
			<div className="helpgent-preview-container">
				{ selectedQuestion[ 0 ].screen_type !== 'end' && (
					<MediaPreview
						singleForm={ singleForm }
						setSingleForm={ setSingleForm }
						activeScreenId={ activeScreenId }
					/>
				) }

				<QuestionPreview
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					selectedQuestion={ selectedQuestion }
				/>
			</div>
			<PreviewDeviceControl />
		</PreviewStyle>
	);
}
