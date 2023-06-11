import ScreenItem from './ScreenItem.js';

export default function ScreenListType( { type, screenList } ) {
	console.log( screenList );
	return (
		screenList.length !== 0 && (
			<div className="helpgent-screen-type">
				<span className="helpgent-screen-type__title">{ type }</span>
				{ screenList.map( ( item ) => (
					<ScreenItem
						icon={ item.icon }
						isPro={ item.isPro }
						isComing={ item.isComing }
						title={ item.title }
					/>
				) ) }
			</div>
		)
	);
}
