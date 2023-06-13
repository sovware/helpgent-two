import ScreenItem from './ScreenItem.js';

export default function ScreenListType( { type, screenList } ) {
	function handleAddQuestion( item ) {
		console.log( item );
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
					/>
				) ) }
			</div>
		)
	);
}
