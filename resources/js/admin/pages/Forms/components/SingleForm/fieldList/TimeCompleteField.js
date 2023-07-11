import Switch from '@components/Switch.js';

export default function TimeCompleteField( props ) {
	const { handleTimeToComplete, isTimeToComplete } = props;
	return (
		<div className="helpgent-field-element">
			<div className="helpgent-field-element__top">
				<Switch
					handleToggle={ handleTimeToComplete }
					label="Time to complete"
					isActive={ isTimeToComplete }
					tooltip
					tooltipText="Timer Text"
				/>
			</div>
		</div>
	);
}
