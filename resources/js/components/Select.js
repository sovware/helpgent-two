import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';
//import { default as ReactSelect } from 'react-select';
import AsyncSelect from 'react-select/async';

const Select = ( props ) => {
	const loadOptions = ( inputValue ) => {
		return fetch(
			`http://jsonplaceholder.typicode.com/posts?userId=5`
		).then( ( res ) => res.json() );
	};
	const [ isAllSelected, setIsAllSelected ] = useState( false );
	if ( props.allowSelectAll ) {
		return (
			<AsyncSelect
				{ ...props }
				cacheOptions
				loadOptions={ [ props.allOption, loadOptions ] }
				onChange={ ( selected ) => {
					if (
						selected !== null &&
						selected.length > 0 &&
						selected[ selected.length - 1 ].value ===
							props.allOption.value
					) {
						setIsAllSelected( ! isAllSelected );
						if ( ! isAllSelected ) {
							return props.onChange( props.options );
						} else {
							return props.onChange( [] );
						}
					}
					return props.onChange( selected );
				} }
			/>
		);
	}
	return <AsyncSelect { ...props } />;
};

Select.propTypes = {
	options: PropTypes.array,
	value: PropTypes.any,
	onChange: PropTypes.func,
	allowSelectAll: PropTypes.bool,
	allOption: PropTypes.shape( {
		label: PropTypes.string,
		value: PropTypes.string,
	} ),
};

Select.defaultProps = {
	allOption: {
		label: 'Select all pages',
		value: 'all',
	},
};

export default Select;
