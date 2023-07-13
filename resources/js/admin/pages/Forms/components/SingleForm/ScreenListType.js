import ScreenItem from './ScreenItem.js';
import { useSingleFormState } from '../../context/SingleFormStateContext.js';

export default function ScreenListType( {
	type,
	screenList,
	handleItemEvent,
} ) {
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const hasWelcomeQuestion = questions.filter(
		( item ) => item.screen_type === 'welcome'
	);

	function getTypeText( type ) {
		let typeText = '';
		switch ( type ) {
			case 'basic':
				typeText = 'Basic';
				break;
			case 'contact':
				typeText = 'Contact';
				break;
			case 'choices':
				typeText = 'Choices';
				break;
			case 'rating':
				typeText = 'Rating & Ranking';
				break;
			case 'answer':
				typeText = 'Answers';
				break;
			case 'initial':
				typeText = 'Screens';
				break;
			default:
				break;
		}
		return typeText;
	}

	return (
		screenList.length !== 0 && (
			<div className="helpgent-screen-type">
				<span className="helpgent-screen-type__title">
					{ getTypeText( type ) }
				</span>
				{ screenList.map( ( item, index ) => (
					<ScreenItem
						question={ item }
						handler={ () =>
							handleItemEvent(
								item,
								singleFormState,
								setSingleFormState
							)
						}
						key={ index }
						isDisabled={ hasWelcomeQuestion.length !== 0 }
					/>
				) ) }
			</div>
		)
	);
}
