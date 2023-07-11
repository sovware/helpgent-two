import Switch from '@components/Switch.js';

export default function ShowTimerField( props ) {
	const { handleShowTimer, showTimerStatus } = props;
	return (
		<>
			<div className="helpgent-field-element">
				<div className="helpgent-field-element__top">
					<Switch
						handleToggle={ handleShowTimer }
						label="Show timer"
						isActive={ showTimerStatus }
						tooltip
						tooltipText="Timer Text"
					/>
				</div>
			</div>
			{ showTimerStatus === '1' ? (
				<div className="helpgent-field-element">
					<div className="helpgent-field-element__top">
						<label
							className="helpgent-field-element__label"
							htmlFor="helpgent-timer-time"
						>
							Time in mins
						</label>
					</div>
					<div className="helpgent-field-element__content">
						<div className="helpgent-form-group">
							<input
								type="text"
								className="helpgent-form-group__element"
								id="helpgent-timer-time"
							/>
						</div>
					</div>
				</div>
			) : null }
		</>
	);
}
