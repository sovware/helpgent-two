import PropTypes from 'prop-types';
import { default as ReactSelect } from 'react-select';

export default function Select( props ) {
	if ( props.allowSelectAll ) {
		return (
			<ReactSelect
				{ ...props }
				options={ [ props.allOption, ...props.options ] }
				onChange={ ( selected ) => {
					if (
						selected !== null &&
						selected.length > 0 &&
						selected[ selected.length - 1 ].value ===
							props.allOption.value
					) {
						if ( ! isAllSelected ) {
							return props.onChange( props.options );
						} else {
							return props.onChange( [] );
						}
					}
					return props.onChange();
				} }
			/>
		);
	}
	return <ReactSelect { ...props } />;
}

ReactSelect.propTypes = {
	inputId: PropTypes.string,
	className: PropTypes.string,
	classNamePrefix: PropTypes.string,
	isMulti: PropTypes.bool,
	searchable: PropTypes.bool,
	hideSelectedOptions: PropTypes.bool,
	options: PropTypes.array,
	value: PropTypes.any,
	onChange: PropTypes.func,
	allowSelectAll: PropTypes.bool,
	allOption: PropTypes.shape( {
		label: PropTypes.string,
		value: PropTypes.string,
	} ),
};

ReactSelect.defaultProps = {
	allOption: {
		label: 'Select all',
		value: '*',
	},
};
