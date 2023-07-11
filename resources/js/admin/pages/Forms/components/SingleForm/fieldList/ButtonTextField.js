import Switch from '@components/Switch.js';

export default function ButtonTextField( props ) {
	const { handleUpdateButtonText, buttonText } = props;
	return (
		<div className="helpgent-field-element">
			<div className="helpgent-field-element__top">
				<label
					className="helpgent-field-element__label"
					htmlFor="helpgent-btnText"
				>
					Button
				</label>
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
	);
}
