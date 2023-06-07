import { Link } from 'react-router-dom';
import Dropdown from '../../../../../components/Dropdown.js';
import ellipsisH from '../../../../../../../assets/svg/icon/ellipsis-h.svg';
import pen from '../../../../../../../assets/svg/icon/pen-nib.svg';
import copy from '../../../../../../../assets/svg/icon/copy.svg';
import trash from '../../../../../../../assets/svg/icon/trash.svg';
import { ScreenBarStyle } from './style.js';

export default function ScreenBar() {
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

	return (
		<ScreenBarStyle>
			<div className="helpgent-screenBar-header"></div>
			<div className="helpgent-screenBar-content">
				<ul className="helpgent-screen-list">
					<li className="helpgent-screen__item">
						<div className="helpgent-screen__content">
							<div className="helpgent-screen__icon"></div>
							<h4 className="helpgent-screen__title"></h4>
						</div>
						<Dropdown
							dropDownIcon={ ellipsisH }
							dropdownList={ moreDropdown }
						/>
						<Link className="helpgent-screen__action">
							<div className="helpgent-screen__dropdown"></div>
						</Link>
					</li>
				</ul>
			</div>
		</ScreenBarStyle>
	);
}
