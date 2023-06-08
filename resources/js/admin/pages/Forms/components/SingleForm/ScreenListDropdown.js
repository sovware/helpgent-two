import ReactSVG from 'react-inlinesvg';
import ScreenListType from './ScreenListType.js';
import { screenTypes } from '../../../../../constants.js';
import search from '../../../../../../../assets/svg/icon/search.svg';
import { ScreenItemStyle, MegaDropdownStyle } from './style.js';

export default function ScreenListDropdown( { isOpenMegaDropdown } ) {
	return (
		isOpenMegaDropdown && (
			<MegaDropdownStyle className="helpgent-mega-dropdown">
				<div className="helpgent-mega-dropdown__search">
					<span className="helpgent-mega-dropdown__search-icon">
						<ReactSVG src={ search } />
					</span>
					<input
						type="text"
						name="helpgent-screen-search"
						placeholder="Find a question type"
					/>
				</div>
				<div className="helpgent-mega-dropdown__content">
					<h3 className="helpgent-mega-dropdown__title">
						All question types
					</h3>
					<div className="helpgent-screen-type-wrap">
						<ScreenListType
							type="Basic"
							screenList={ screenTypes.basic.screens }
						/>
						<ScreenListType
							type="Rating & Ranking"
							screenList={ screenTypes.ratingRanking.screens }
						/>
						<ScreenListType
							type="Contact"
							screenList={ screenTypes.contact.screens }
						/>
						<ScreenListType
							type="Answers"
							screenList={ screenTypes.answers.screens }
						/>
						<ScreenListType
							type="Choices"
							screenList={ screenTypes.choices.screens }
						/>
						<ScreenListType
							type="Screens"
							screenList={ screenTypes.initialScreen.screens }
						/>
					</div>
				</div>
			</MegaDropdownStyle>
		)
	);
}
