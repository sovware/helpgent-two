import { useState, useRef, useEffect } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import checkedClickedOutside from '../helper/checkClickedOutside';
import { Link } from 'react-router-dom';

export default function Dropdown( {
	className,
	dropDownIcon,
	dropdownList,
	placement,
	handleDropdownTrigger,
} ) {
	const ref = useRef( null );
	const [ isDropdownOpen, setDropDownOpen ] = useState( false );
	const dropdownClassName = `helpgent-dropdown ${
		isDropdownOpen ? 'helpgent-dropdown-open ' : ''
	}${ className && className } helpgent-dropdown-${ placement }`;

	function handleDropdown( e ) {
		e.preventDefault();
		setDropDownOpen( ! isDropdownOpen );
	}

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isDropdownOpen, setDropDownOpen, ref );
	}, [ isDropdownOpen ] );

	return (
		<div className={ dropdownClassName } ref={ ref }>
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
