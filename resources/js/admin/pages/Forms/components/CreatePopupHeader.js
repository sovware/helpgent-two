import PropTypes from 'prop-types';

export default function CreatePopupHeader( props ) {
	const { title, subtitle } = props;

	return (
		<div className="helpgent-createPopup__header">
			{ title && <h4>{ title }</h4> }
			{ subtitle && <p>{ subtitle }</p> }
		</div>
	);
}

CreatePopupHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};
