import Switch from '@components/Switch.js';

export default function ActionButtonField( props ) {
	const { isActive, buttonText } = props;
	return (
		<>
			<div className="helpgent-field-element">
				<div className="helpgent-field-element__top">
					<Switch
						handleToggle={ handleShowTimer }
						label="Add action button"
						isActive={ showTimerStatus }
					/>
				</div>
				<div className="helpgent-field-element__content">
					<div className="helpgent-form-group">
						<input
							type="text"
							className="helpgent-form-group__element"
							id="helpgent-btnText"
							value={ buttonText }
							onChange={ handleUpdateButtonText }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
