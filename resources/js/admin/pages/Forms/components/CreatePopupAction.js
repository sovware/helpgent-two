import ReactSVG from 'react-inlinesvg';

export default function CreatePopupAction( props ) {
	const { icon, text } = props;
	return (
		<a href="#" className="helpgent-createPopup__action">
			<div className="helpgent-createPopup__action-icon">
				<ReactSVG src={ icon } />
			</div>
			{ text && (
				<span className="helpgent-createPopup__action-text">
					{ text }
				</span>
			) }
		</a>
	);
}
