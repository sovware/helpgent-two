import ScreenItem from '../components/SingleForm/ScreenItem.js';
import arrowSquareRight from '@icon/arrow-square-right.svg';
import arrowSquareLeft from '@icon/arrow-square-left.svg';

export default function getEndType( questions ) {
	const otherType = questions.filter(
		( question ) => question.screen_type === 'end'
	);
	function handleActivateQuestion() {}
	return otherType.map( ( item, index ) => (
		<ScreenItem
			question={ item }
			handler={ handleActivateQuestion }
			hasDropdown
			key={ index }
		/>
	) );
}
