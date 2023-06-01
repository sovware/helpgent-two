import { CheckboxControl } from '@wordpress/components';
import { components } from 'react-select';
const Option = ( props ) => {
	console.log( props );
	return (
		<div>
			<components.Option { ...props }>
				<div className="helpgent-checkbox">
					<CheckboxControl
						id={ `helpgent-${ props.value }` }
						label={ props.label }
						// onChange={handleCustomPageCheckbox}
						checked={ props.isSelected }
					/>
				</div>
			</components.Option>
		</div>
	);
};

export default Option;
