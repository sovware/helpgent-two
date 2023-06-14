import useStore from '../../../../../hooks/useStore';
import ScreenItem from './ScreenItem.js';

export default function ScreenListType( { type, screenList } ) {
	const { getStoreData, setStoreData } = useStore();
	const { form } = getStoreData( [ 'helpgent-single-form' ] );
	const { content } = form;
	const { questions } = JSON.parse( content );
	const hasWelcomeQuestion = questions.filter(
		( item ) => item.screen_type === 'welcome'
	);
	function handleAddQuestion( item ) {
		if ( item.type === 'welcome' && hasWelcomeQuestion !== 0 ) {
			return;
		}
		questions.push( item );

		const updatedForm = {
			...form,
			content: JSON.stringify( { questions: questions } ),
		};

		setStoreData( [ 'helpgent-single-form' ], { form: updatedForm } );
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
