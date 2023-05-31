import CreatePopupHeader from './CreatePopupHeader';
import CreatePopupAction from './CreatePopupAction';
import Pencil from '../../../../../../assets/svg/icon/pencil-plus.svg';
import template from '../../../../../../assets/svg/icon/template.svg';
export default function CreatePopupInitial() {
	const actionsData = [
		{
			icon: Pencil,
			text: 'Create From Scratch',
			key: 'scratch',
		},
		{
			icon: template,
			text: 'Start From A Template',
			key: 'template',
		},
	];

	return (
		<div className="helpgent-createPopup">
			<CreatePopupHeader
				title="Create a New Form"
				subtitle="You can select a template to assist you, or start from scratch."
			/>
			<div className="helpgent-createPopup__body">
				<div className="helpgent-createPopup__actions">
					{ actionsData.map( ( item ) => {
						return (
							<CreatePopupAction
								icon={ item.icon }
								text={ item.text }
							/>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}
