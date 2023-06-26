import { Draggable } from 'react-beautiful-dnd';
import ScreenItem from '../components/SingleForm/ScreenItem.js';

import arrowSquareRight from '@icon/arrow-square-right.svg';
import arrowSquareLeft from '@icon/arrow-square-left.svg';

export default function getotherQuestion(
	questions,
	activeScreenId,
	setActiveScreenId
) {
	const otherQuestion = questions.filter(
		( question ) =>
			question.screen_type !== 'welcome' && question.screen_type !== 'end'
	);

	function handleActivateQuestion( question ) {
		setActiveScreenId( question.id );
	}

	return otherQuestion.map( ( item, index ) => (
		<Draggable draggableId={ item.id } index={ index } key={ item.id }>
			{ ( provided ) => (
				<div
					className="helpgent-sortable-item"
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
				>
					<ScreenItem
						question={ item }
						handler={ handleActivateQuestion }
						hasDropdown
						index={ index + 1 }
						isActive={ item.id === activeScreenId }
					/>
				</div>
			) }
		</Draggable>
	) );
}
