import Switch from '@components/Switch.js';

export default function RequireField( props ) {
	const { handleRequire, requiredStatus } = props;
	return (
		<div className="helpgent-field-element">
			<div className="helpgent-field-element__top">
				<Switch
					handleToggle={ handleRequire }
					label="Required"
					isActive={ requiredStatus }
				/>
			</div>
		</div>
	);
}
