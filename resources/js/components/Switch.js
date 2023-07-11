import { FormToggle, Tooltip } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import questionCircle from '@icon/question-circle.svg';

const Switch = ( props ) => {
	const { handleToggle, label, isActive, tooltip, tooltipText } = props;

	return (
		<div className="helpgent-toggle helpgent-toggle-inline">
			{ label && (
				<span
					className="helpgent-toggle__label"
					onClick={ handleToggle }
				>
					{ label }
					{ tooltip && (
						<Tooltip text={ tooltipText }>
							<span className="helpgent-tooltip-toggle">
								<ReactSVG src={ questionCircle } />
							</span>
						</Tooltip>
					) }
				</span>
			) }
			<FormToggle
				checked={ isActive === '1' ? true : false }
				onChange={ handleToggle }
			/>
		</div>
	);
};

// Specifies the default values for props:
Switch.defaultProps = {};

// Specifies the prop Types:
Switch.propTypes = {};

export default Switch;
