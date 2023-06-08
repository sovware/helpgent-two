import ReactSVG from 'react-inlinesvg';
import Dropdown from '../../../../../components/Dropdown.js';
import ellipsisH from '../../../../../../../assets/svg/icon/ellipsis-h.svg';
import pen from '../../../../../../../assets/svg/icon/pen-nib.svg';
import copy from '../../../../../../../assets/svg/icon/copy.svg';
import trash from '../../../../../../../assets/svg/icon/trash.svg';
import { ScreenItemStyle } from './style.js';

export default function ScreenItem( { icon, title, hasDropdown } ) {
	const moreDropdown = [
		{
			name: 'rename',
			icon: pen,
			text: 'Rename',
		},
		{
			name: 'duplicate',
			icon: copy,
			text: 'Duplicate',
		},
		{
			name: 'delete',
			icon: trash,
			text: 'Delete',
		},
	];

	function handleDropdownTrigger() {}

	return (
		<ScreenItemStyle className="helpgent-screen__item">
			<div className="helpgent-screen__content">
				<div className="helpgent-screen__icon">
					<ReactSVG src={ icon } />
				</div>
				<h4 className="helpgent-screen__title">{ title }</h4>
			</div>
			{ hasDropdown && (
				<Dropdown
					dropDownIcon={ ellipsisH }
					dropdownList={ moreDropdown }
					placement={ 'right' }
					handleDropdownTrigger={ handleDropdownTrigger }
				/>
			) }
		</ScreenItemStyle>
	);
}
