import { useState, useRef, useEffect } from '@wordpress/element';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useStore from '../../../../../hooks/useStore';
import { useQuery } from '@tanstack/react-query';
import ScreenItem from './ScreenItem.js';
import ReactSVG from 'react-inlinesvg';
import getWelcomeType from '../../helper/getWelcomeType';
import getOtherType from '../../helper/getOtherType';
import getEndType from '../../helper/getEndType';
import checkedClickedOutside from '../../../../../helper/checkClickedOutside.js';
import handleResize from '../../helper/handleResize';
import plus from '../../../../../../../assets/svg/icon/plus.svg';
import { ScreenBarStyle, ScreenItemStyle } from './style.js';
import ScreenListDropdown from './ScreenListDropdown.js';
import { endScreen } from '../../../../../constants';

export default function ScreenBar() {
	const ref = useRef( null );
	const endScreenRef = useRef( null );
	const [ isOpenMegaDropdown, setMegaDropdown ] = useState( false );
	function handleToggleMegaDropdown( e ) {
		e.preventDefault();
		setMegaDropdown( ! isOpenMegaDropdown );
		//setStoreData(['helpgent-single-form'],{})
	}

	const { getStoreData, setStoreData } = useStore();
	//console.log(getStoreData( [ 'helpgent-single-form' ] ));
	const { form } = getStoreData( [ 'helpgent-single-form' ] );
	const { content } = form;
	const { questions } = JSON.parse( content );

	//console.log(form);

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isOpenMegaDropdown, setMegaDropdown, ref );
	}, [ isOpenMegaDropdown ] );

	useEffect( () => {
		const generateHeight =
			endScreenRef.current.getBoundingClientRect().height;
		endScreenRef.current.style.height =
			generateHeight < 185 ? '185px' : `${ generateHeight }'px'`;
	}, [] );

	const onDragEnd = ( results ) => {
		//console.log(results);
	};

	function handleAddEndScreen( e ) {
		e.preventDefault();
		questions.push( endScreen );
		const updatedForm = {
			...form,
			content: JSON.stringify( { questions: questions } ),
		};

		setStoreData( [ 'helpgent-single-form' ], { form: updatedForm } );
	}

	return (
		<ScreenBarStyle>
			<div className="helpgent-screenBar-header" ref={ ref }>
				<h5 className="helpgent-screenBar-header__title">Screens</h5>
				<Link
					className="helpgent-screenBar-header__add"
					onClick={ ( e ) => handleToggleMegaDropdown( e ) }
				>
					<ReactSVG src={ plus } />
					Add screen
				</Link>
				<ScreenListDropdown
					isOpenMegaDropdown={ isOpenMegaDropdown }
					setMegaDropdown={ setMegaDropdown }
				/>
			</div>
			<div className="helpgent-screenBar-content">
				{ getWelcomeType( questions ) }
				<DragDropContext onDragEnd={ onDragEnd }>
					<Droppable
						droppableId="all-columns"
						direction="horizontal"
						type="column"
					>
						{ ( provided ) => (
							<div
								className="helpgent-screen helpgent-screenBar-content__other"
								{ ...provided.droppableProps }
								ref={ provided.innerRef }
							>
								{ getOtherType( questions ) }
								{ provided.placeholder }
							</div>
						) }
					</Droppable>
				</DragDropContext>

				<div
					className="helpgent-screen helpgent-screenBar-content__end"
					ref={ endScreenRef }
				>
					<div
						className="helpgent-ending-draggable"
						onMouseDown={ ( e ) => handleResize( e, endScreenRef ) }
					>
						<span className="helpgent-ending-draggable__pipe"></span>
					</div>
					<div className="helpgent-screenBar-end-head">
						<div className="helpgent-screenBar-end-head__title">
							Endings
						</div>
						<a
							href="#"
							className="helpgent-screenBar-end-head__add"
							onClick={ handleAddEndScreen }
						>
							+ Add
						</a>
					</div>
					<div className="helpgent-end-screen-list">
						{ getEndType( questions ) }
					</div>
				</div>
			</div>
		</ScreenBarStyle>
	);
}
