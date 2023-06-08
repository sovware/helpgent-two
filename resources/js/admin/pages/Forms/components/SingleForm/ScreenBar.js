import { useState } from '@wordpress/element';
import { Link } from 'react-router-dom';
import ScreenItem from './ScreenItem.js';
import ReactSVG from 'react-inlinesvg';
import arrowSquareRight from '../../../../../../../assets/svg/icon/arrow-square-right.svg';
import arrowSquareLeft from '../../../../../../../assets/svg/icon/arrow-square-left.svg';
import plus from '../../../../../../../assets/svg/icon/plus.svg';
import { ScreenBarStyle, ScreenItemStyle } from './style.js';
import ScreenListDropdown from './ScreenListDropdown.js';

export default function ScreenBar() {
	const [ isOpenMegaDropdown, setMegaDropdown ] = useState( false );
	function handleToggleMegaDropdown( e ) {
		e.preventDefault();
		setMegaDropdown( ! isOpenMegaDropdown );
	}
	return (
		<ScreenBarStyle>
			<div className="helpgent-screenBar-header">
				<h5 className="helpgent-screenBar-header__title">Screens</h5>
				<Link
					className="helpgent-screenBar-header__add"
					onClick={ ( e ) => handleToggleMegaDropdown( e ) }
				>
					{ ' ' }
					<ReactSVG src={ plus } />
					Add screen
					<ScreenListDropdown
						isOpenMegaDropdown={ isOpenMegaDropdown }
						setMegaDropdown={ setMegaDropdown }
					/>
				</Link>
			</div>
			<div className="helpgent-screenBar-content">
				<div className="helpgent-screen helpgent-screen-welcome">
					<ScreenItem
						icon={ arrowSquareRight }
						title="Welcome"
						hasDropdown
					/>
				</div>
				<div className="helpgent-screen helpgent-screen-end">
					<ScreenItem
						icon={ arrowSquareRight }
						title="End"
						hasDropdown
					/>
				</div>
			</div>
		</ScreenBarStyle>
	);
}
