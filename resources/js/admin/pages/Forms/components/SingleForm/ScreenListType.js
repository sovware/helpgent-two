import ScreenItem from './ScreenItem.js';

export default function ScreenListType( {
	singleForm,
	setSingleForm,
	type,
	screenList,
	handleItemEvent,
	activeScreenId,
	handler,
} ) {
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
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
								singleForm,
								setSingleForm,
								activeScreenId
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
