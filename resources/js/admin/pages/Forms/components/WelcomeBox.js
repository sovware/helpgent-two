import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import ReactSVG from 'react-inlinesvg';
import handsRaised from '../../../../../../assets/svg/icon/hands-raised.svg';

export default function WelcomeBox( props ) {
	const { isCreatePopupOpen, setCreatePopupStatus } = props;

	return (
		<Fragment>
			<div className="helpgent-welcome-top">
				<div className="helpgent-welcome-top__icon">
					<ReactSVG src={ handsRaised } />
				</div>
				<h4 className="helpgent-welcome-top__title">
					Welcome Abdur Rahim!
				</h4>
			</div>
			<p>
				You can select a template to assist you, or start from scratch.
			</p>
			<button
				className="helpgent-btn helpgent-btn-md helpgent-btn-primary helpgent-btn-create"
				onClick={ () => setCreatePopupStatus( ! isCreatePopupOpen ) }
			>
				Create My First Form
			</button>
		</Fragment>
	);
}

WelcomeBox.propTypes = {
	isCreatePopupOpen: PropTypes.bool,
	setCreatePopupStatus: PropTypes.func,
};
