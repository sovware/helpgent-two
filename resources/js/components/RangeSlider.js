import { RangeControl } from '@wordpress/components';
import PropTypes from 'prop-types';

const RangeSlider = ( props ) => {
	return (
		<div className="helpgent-rangeControl">
			<div className="helpgent-rangeControl__wayline">
				<span className="helpgent-starting-point">0</span>
				<span className="helpgent-ending-point">10</span>
			</div>
			<RangeControl
				initialPosition={ 4 }
				max={ 10 }
				min={ 0 }
				withInputField={ false }
				railColor="#D5D5D5"
				trackColor="#6551F2"
				onChange={ () => {} }
			/>
		</div>
	);
};

// Specifies the default values for props:
RangeSlider.defaultProps = {};

// Specifies the prop Types:
RangeSlider.propTypes = {};

export default RangeSlider;
