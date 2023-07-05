import { useState, useEffect, useRef } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import ScreenListDropdown from './ScreenListDropdown';
import handleChangeQuestionType from '../../helper/handleChangeQuestionType';
import checkedClickedOutside from '@helper/checkClickedOutside.js';
import { iconList } from './constants.js';
import angleDown from '@icon/angle-small-down.svg';
export default function SettingQuestion( props ) {
	const ref = useRef( null );
	const [ isDropdownOpen, setDropdownOpen ] = useState( false );
	const { singleForm, setSingleForm, activeScreen } = props;

	const { id: activeScreenId, icon, title } = activeScreen;

	function handleToggleDropdown() {
		setDropdownOpen( true );
	}

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isDropdownOpen, setDropdownOpen, ref );
	}, [ isDropdownOpen ] );

	return (
		<div className="helpgent-screen-setting-wrap">
			<div className="helpgent-screen-setting-block">
				<div className="helpgent-screen-setting-element">
					<h5 className="helpgent-screen-setting-element__label">
						Question Type
					</h5>
					<div
						className="helpgent-screen-setting-element__content"
						ref={ ref }
					>
						<div
							className="helpgent-question-dropdown"
							onClick={ handleToggleDropdown }
						>
							<div className="helpgent-question-dropdown__content">
								<div className="helpgent-question-dropdown__icon">
									<ReactSVG src={ iconList[ icon ] } />
								</div>
								<h4 className="helpgent-question-dropdown__title">
									{ title }
								</h4>
							</div>

							<span className="helpgent-question-dropdown__arrow">
								<ReactSVG src={ angleDown } />
							</span>
						</div>
						<ScreenListDropdown
							singleForm={ singleForm }
							setSingleForm={ setSingleForm }
							isOpenMegaDropdown={ isDropdownOpen }
							handleItemEvent={ handleChangeQuestionType }
							activeScreenId={ activeScreenId }
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
