import CreatePopupHeader from './CreatePopupHeader';
import CreatePopupAction from './CreatePopupAction';
import PropTypes from 'prop-types';
import Pencil from '../../../../../../assets/svg/icon/pencil-plus.svg';
import template from '../../../../../../assets/svg/icon/template.svg';
export default function CreatePopupInitial( props ) {
	const { setFormCreationStage } = props;
	const actionsData = [
		{
			icon: Pencil,
			text: 'Create From Scratch',
			step: 'scratch',
		},
		{
			icon: template,
			text: 'Start From A Template',
			step: 'template',
		},
	];

	function handleCreateFormSteps( event, step ) {
		event.preventDefault();
		if ( step === 'scratch' ) {
			setFormCreationStage( 'scratch' );
		} else if ( step === 'template' ) {
			setFormCreationStage( 'template' );
		}
	}

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
								step={ item.step }
								handleCreateFormSteps={ handleCreateFormSteps }
							/>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}

CreatePopupInitial.propTypes = {
	setFormCreationStage: PropTypes.func,
};
