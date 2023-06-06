import { useState } from '@wordpress/element';
import Checkbox from '../../../../components/Checkbox.js';
import { components } from 'react-select';
const Option = ( props ) => {
	return (
		<div>
			<components.Option { ...props }>
				<Checkbox
					id={ `helpgent-${ props.value }` }
					label={ props.label }
					checked={
						props.value === 'all' ? isAllSelected : props.isSelected
					}
				/>
			</components.Option>
		</div>
	);
};

export default Option;
