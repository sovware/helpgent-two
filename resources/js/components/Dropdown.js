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
		const parent = e.target.closest( '.helpgent-dropdown' );
		const parentRect = parent.getBoundingClientRect();
		const dropdownContent = parent.querySelector(
			'.helpgent-dropdown__content'
		);
		dropdownContent.style.top = `${ parentRect.top + 20 }px`;
		if ( parent.classList.contains( 'helpgent-dropdown-right' ) ) {
			dropdownContent.style.left = `${ parentRect.left }px`;
		} else if ( parent.classList.contains( 'helpgent-dropdown-left' ) ) {
			dropdownContent.style.right = `calc(100% - ${ parentRect.right }px)`;
		}
	}

	function handleScroll() {
		const parent = document.querySelector( '.helpgent-dropdown-open' );
		if ( parent ) {
			const parentRect = parent.getBoundingClientRect();
			const dropdownContent = parent.querySelector(
				'.helpgent-dropdown__content'
			);
			dropdownContent.style.top = `${ parentRect.top + 20 }px`;
		}
	}

	document.addEventListener( 'scroll', handleScroll );

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
									onClick={ ( e ) => {
										setDropDownOpen( false );
										return handleDropdownTrigger(
											e,
											item.name
										);
									} }
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
