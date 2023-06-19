import ScreenItem from '../components/SingleForm/ScreenItem.js';

import arrowSquareRight from '@icon/arrow-square-right.svg';
import arrowSquareLeft from '@icon/arrow-square-left.svg';

export default function getWelcomeType(
	questions,
	activeScreenId,
	setActiveScreenId
) {
	const welcomeQuestion = questions.filter(
		( question ) => question.screen_type === 'welcome'
	);
	function handleActivateQuestion( question ) {
		setActiveScreenId( question.id );
	}
	return (
		welcomeQuestion.length !== 0 && (
			<div className="helpgent-screen helpgent-screenBar-content__welcome">
				<ScreenItem
					question={ welcomeQuestion[ 0 ] }
					handler={ handleActivateQuestion }
					hasDropdown
					isActive={ welcomeQuestion[ 0 ].id === activeScreenId }
				/>
			</div>
		)
	);
}
