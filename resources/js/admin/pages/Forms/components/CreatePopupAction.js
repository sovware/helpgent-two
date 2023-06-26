import PropTypes from 'prop-types';
import ReactSVG from 'react-inlinesvg';

export default function CreatePopupAction( props ) {
	const { icon, text, step, handleCreateFormSteps } = props;
	return (
		<a
			href="#"
			className="helpgent-createPopup__action"
			onClick={ ( e ) => handleCreateFormSteps( e, step ) }
		>
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

CreatePopupAction.propTypes = {
	icon: PropTypes.string,
	text: PropTypes.string,
	step: PropTypes.string,
	handleCreateFormSteps: PropTypes.func,
};
