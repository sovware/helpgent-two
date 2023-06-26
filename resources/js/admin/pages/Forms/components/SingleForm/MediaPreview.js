import ReactSVG from 'react-inlinesvg';
import play from '@icon/play.svg';
import expand from '@icon/expand.svg';
import { MediaPreviewStyle } from './style.js';
export default function MediaPreview( props ) {
	const { singleForm, setSingleForm, activeScreenId } = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	const selectedQuestion = questions.filter(
		( item ) => item.id === activeScreenId
	);
	return (
		<MediaPreviewStyle>
			{ selectedQuestion.length === 0 ||
			selectedQuestion[ 0 ].medias.length === 0 ? (
				<div className="helpgent-media-empty"></div>
			) : (
				<div className="helpgent-media-src">
					<div className="helpgent-video-thumbnail"></div>
					<video src="" playsInline={ true } preload="auto"></video>
					<div className="helpgent-video-visualization">
						<span className="helpgent-video-visualization__timer">
							00.00/00:06
						</span>
						<span className="helpgent-video-visualization__fullScreen">
							<ReactSVG src={ expand } />
						</span>
					</div>
					<span className="helpgent-video-control">
						<ReactSVG src={ play } />
					</span>
				</div>
			) }
		</MediaPreviewStyle>
	);
}
