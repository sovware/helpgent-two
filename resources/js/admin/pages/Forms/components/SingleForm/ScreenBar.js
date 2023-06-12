import { useState, useRef, useEffect } from '@wordpress/element';
import { Link } from 'react-router-dom';
import useStore from '../../../../../hooks/useStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ScreenItem from './ScreenItem.js';
import ReactSVG from 'react-inlinesvg';
import checkedClickedOutside from '../../../../../lib/checkClickedOutside.js';
import arrowSquareRight from '../../../../../../../assets/svg/icon/arrow-square-right.svg';
import arrowSquareLeft from '../../../../../../../assets/svg/icon/arrow-square-left.svg';
import plus from '../../../../../../../assets/svg/icon/plus.svg';
import { ScreenBarStyle, ScreenItemStyle } from './style.js';
import ScreenListDropdown from './ScreenListDropdown.js';

export default function ScreenBar() {
	const ref = useRef( null );
	const queryClient = useQueryClient();
	const [ isOpenMegaDropdown, setMegaDropdown ] = useState( false );
	function handleToggleMegaDropdown( e ) {
		e.preventDefault();
		setMegaDropdown( ! isOpenMegaDropdown );
	}

	const { getStoreData } = useStore();


	console.log(queryClient.getQueryData(['helpgent-single-form']));

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isOpenMegaDropdown, setMegaDropdown, ref );
	}, [ isOpenMegaDropdown ] );

	return (
		<ScreenBarStyle>
			<div className="helpgent-screenBar-header" ref={ ref }>
				<h5 className="helpgent-screenBar-header__title">Screens</h5>
				<Link
					className="helpgent-screenBar-header__add"
					onClick={ ( e ) => handleToggleMegaDropdown( e ) }
				>
					<ReactSVG src={ plus } />
					Add screen
				</Link>
				<ScreenListDropdown
					isOpenMegaDropdown={ isOpenMegaDropdown }
					setMegaDropdown={ setMegaDropdown }
				/>
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
