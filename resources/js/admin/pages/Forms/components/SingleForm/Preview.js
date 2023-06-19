import ReactSVG from 'react-inlinesvg';
import MediaPreview from './MediaPreview';
import QuestionPreview from './QuestionPreview';
import PreviewDeviceControl from './PreviewDeviceControl';
import handDown from '@icon/hand-down.svg';
import { PreviewStyle } from './style';
export default function Preview( props ) {
	const { singleForm, setSingleForm, activeScreenId } = props;
	console.log( activeScreenId );
	return (
		<PreviewStyle>
			<div className="helpgent-preview-top">
				<ReactSVG src={ handDown } />
				<span className="helpgent-preview-top__text">
					Preview your changes
				</span>
			</div>
			<div className="helpgent-preview-container">
				<MediaPreview
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					activeScreenId={ activeScreenId }
				/>
				<QuestionPreview
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					activeScreenId={ activeScreenId }
				/>
			</div>
			<PreviewDeviceControl />
		</PreviewStyle>
	);
}
