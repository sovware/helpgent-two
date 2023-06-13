import ScreenItem from '../components/SingleForm/ScreenItem.js';

import arrowSquareRight from '@icon/arrow-square-right.svg';
import arrowSquareLeft from '@icon/arrow-square-left.svg';

export default function getWelcomeType( questions ) {
	const welcomeType = questions.filter(
		( question ) => question.screen_type === 'welcome'
	);
	function handleActivateQuestion() {}
	return (
		welcomeType.length !== 0 && (
			<div className="helpgent-screen helpgent-screenBar-content__welcome">
				<ScreenItem
					question={ welcomeType[ 0 ] }
					handler={ handleActivateQuestion }
					hasDropdown
				/>
			</div>
		)
	);
}
