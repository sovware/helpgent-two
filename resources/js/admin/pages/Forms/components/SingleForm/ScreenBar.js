import { useState, useRef, useEffect } from '@wordpress/element';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import onDragEnd from '@helper/onDragEnd';
import checkedClickedOutside from '@helper/checkClickedOutside.js';
import ReactSVG from 'react-inlinesvg';
import getWelcomeType from '../../helper/getWelcomeType';
import getOtherType from '../../helper/getOtherType';
import getEndType from '../../helper/getEndType';
import handleAddEndScreen from '../../helper/handleAddEndScreen';
import handleResize from '../../helper/handleResize';
import { ScreenBarStyle } from './style.js';
import ScreenListDropdown from './ScreenListDropdown.js';
import plus from '@icon/plus.svg';

export default function ScreenBar( props ) {
	const { singleForm, setSingleForm, activeScreenId, setActiveScreenId } =
		props;
	const ref = useRef( null );
	const endScreenRef = useRef( null );
	const [ isOpenMegaDropdown, setMegaDropdown ] = useState( false );

	function handleToggleMegaDropdown( e ) {
		e.preventDefault();
		setMegaDropdown( ! isOpenMegaDropdown );
	}

	const { content } = singleForm;
	const { questions } = JSON.parse( content );

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
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					isOpenMegaDropdown={ isOpenMegaDropdown }
					setMegaDropdown={ setMegaDropdown }
				/>
			</div>
			<div className="helpgent-screenBar-content">
				{ getWelcomeType(
					questions,
					activeScreenId,
					setActiveScreenId
				) }
				<DragDropContext
					onDragEnd={ ( results ) =>
						onDragEnd(
							results,
							questions,
							singleForm,
							setSingleForm
						)
					}
				>
					<Droppable
						droppableId="helpgent-other-droppable-screen"
						type="helpgent-other-screens"
					>
						{ ( provided ) => (
							<div
								className="helpgent-screen helpgent-screenBar-content__other"
								ref={ provided.innerRef }
								{ ...provided.droppableProps }
							>
								{ getOtherType(
									questions,
									activeScreenId,
									setActiveScreenId
								) }
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
							onClick={ ( e ) =>
								handleAddEndScreen(
									e,
									questions,
									singleForm,
									setSingleForm
								)
							}
						>
							+ Add
						</a>
					</div>
					<DragDropContext
						onDragEnd={ ( results ) =>
							onDragEnd(
								results,
								questions,
								singleForm,
								setSingleForm
							)
						}
					>
						<Droppable
							droppableId="helpgent-other-droppable-screen"
							type="helpgent-end-screens"
						>
							{ ( provided ) => (
								<div
									className="helpgent-end-screen-list"
									ref={ provided.innerRef }
									{ ...provided.droppableProps }
								>
									{ getEndType(
										questions,
										activeScreenId,
										setActiveScreenId
									) }
									{ provided.placeholder }
								</div>
							) }
						</Droppable>
					</DragDropContext>
				</div>
			</div>
		</ScreenBarStyle>
	);
}
