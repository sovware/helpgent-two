import { useState, useEffect, useRef } from '@wordpress/element';
import { DatePicker } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import checkedClickedOutside from '@helper/checkClickedOutside';
import calendar from '@icon/calendar.svg';
import PropTypes from 'prop-types';

const DatePickerControl = ( props ) => {
	const { handleChangeDate, date } = props;
	const [ isActivePicker, setActivePicker ] = useState( false );
	const ref = useRef( null );

	function handleOpenDatePicker() {
		setActivePicker( true );
	}

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isActivePicker, setActivePicker, ref );
	}, [ isActivePicker ] );

	return (
		<div
			className={
				isActivePicker
					? 'helpgent-datepicker helpgent-active'
					: 'helpgent-datepicker'
			}
			ref={ ref }
		>
			<div className="helpgent-form helpgent-form-group helpgent-form-icon-right">
				<span className="helpgent-input-icon">
					<ReactSVG src={ calendar } />
				</span>
				<input
					type="text"
					className="helpgent-form__element"
					placeholder="MM-DD-YYYY"
					value={ date }
					onClick={ handleOpenDatePicker }
					readOnly
				/>
			</div>
			<DatePicker
				onChange={ ( newDate ) => handleChangeDate( newDate ) }
			/>
		</div>
	);
};

// Specifies the default values for props:
DatePickerControl.defaultProps = {};

// Specifies the prop Types:
DatePickerControl.propTypes = {};

export default DatePickerControl;
