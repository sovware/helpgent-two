import ScreenItem from './ScreenItem.js';
import arrowSquareRight from '../../../../../../../assets/svg/icon/arrow-square-right.svg';

export default function ScreenListType( { type, screenList } ) {
	console.log( screenList );
	return (
		<div className="helpgent-screen-type">
			<span className="helpgent-screen-type__title">{ type }</span>
			{ screenList &&
				screenList.map( ( item ) => (
					<ScreenItem
						icon={ arrowSquareRight }
						title={ item.title }
					/>
				) ) }
		</div>
	);
}
