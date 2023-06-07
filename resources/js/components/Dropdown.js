import { useState, useRef } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';

export default function Dropdown( {
	className,
	dropDownIcon,
	dropdownList,
	handleDropdownTrigger,
} ) {
	const ref = useRef( null );
	console.log( dropdownList, dropDownIcon );
	const [ isDropdownOpen, setDropDownOpen ] = useState( false );

	function handleDropdown( e ) {
		e.preventDefault();
		setDropDownOpen( ! isDropdownOpen );
	}

	return (
		<div
			className={ `${
				isDropdownOpen
					? 'helpgent-dropdown helpgent-dropdown-open ' + className
					: 'helpgent-dropdown ' + className
			}` }
			ref={ ref }
		>
			<Link
				href="#"
				className="helpgent-dropdown__toggle helpgent-dropdown__toggle-icon-only"
				onClick={ handleDropdown }
			>
				{ dropDownIcon ? (
					<span className="helpgent-dropdown-icon">
						<ReactSVG src={ dropDownIcon } />
					</span>
				) : null }
			</Link>
			<ul
				className={
					isDropdownOpen
						? 'helpgent-dropdown__content helpgent-show'
						: 'helpgent-dropdown__content'
				}
			>
				{ dropdownList &&
					dropdownList.map( ( item, i ) => {
						return (
							<li key={ i }>
								<Link
									href="#"
									onClick={ ( e ) =>
										handleDropdownTrigger( e, item.name )
									}
								>
									{ item.icon ? (
										<span className="helpgent-dropdown-item-icon">
											<ReactSVG src={ item.icon } />
										</span>
									) : (
										''
									) }
									{ item.text }
								</Link>
							</li>
						);
					} ) }
			</ul>
		</div>
	);
}
