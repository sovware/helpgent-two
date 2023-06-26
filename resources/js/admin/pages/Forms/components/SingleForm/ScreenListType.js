import { v4 as uuidv4 } from 'uuid';
import ScreenItem from './ScreenItem.js';

export default function ScreenListType( {
	singleForm,
	setSingleForm,
	type,
	screenList,
} ) {
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	const hasWelcomeQuestion = questions.filter(
		( item ) => item.screen_type === 'welcome'
	);
	function handleAddQuestion( item ) {
		item.id = uuidv4();
		if ( item.type === 'welcome' && hasWelcomeQuestion !== 0 ) {
			return;
		}
		questions.push( item );

		const updatedForm = {
			...singleForm,
			content: JSON.stringify( { questions: questions } ),
		};
		setSingleForm( updatedForm );
	}
	return (
		screenList.length !== 0 && (
			<div className="helpgent-screen-type">
				<span className="helpgent-screen-type__title">{ type }</span>
				{ screenList.map( ( item, index ) => (
					<ScreenItem
						question={ item }
						handler={ handleAddQuestion }
						key={ index }
						isDisabled={ hasWelcomeQuestion.length !== 0 }
					/>
				) ) }
			</div>
		)
	);
}
