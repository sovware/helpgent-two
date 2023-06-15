import { v4 as uuidv4 } from 'uuid';
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
import bar from '@icon/bar.svg';
import hash from '@icon/hash.svg';

export default function ScreenBar( props ) {
	const { singleForm, setSingleForm } = props;
	const ref = useRef( null );
	const endScreenRef = useRef( null );
	const [ isOpenMegaDropdown, setMegaDropdown ] = useState( false );
	const [ testQuestion, setTestQuestion ] = useState( [
		{
			id: uuidv4(),
			title: 'Long text',
			screen_type: 'short-text',
			icon: bar,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
							],
						},
					],
					fieldLogic: [],
				},
			],
			groupName: 'basic',
			medias: [],
			layout: 'content-right',
		},
		{
			id: uuidv4(),
			title: 'Number',
			screen_type: 'short-text',
			icon: bar,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
							],
						},
					],
					fieldLogic: [],
				},
			],
			groupName: 'basic',
			medias: [],
			layout: 'content-right',
		},
		{
			id: uuidv4(),
			title: 'Short text',
			screen_type: 'short-text',
			icon: bar,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
							],
						},
					],
					fieldLogic: [],
				},
			],
			groupName: 'basic',
			medias: [],
			layout: 'content-right',
		},
		{
			id: uuidv4(),
			title: 'Short text',
			screen_type: 'File Upload',
			icon: bar,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
							],
						},
					],
					fieldLogic: [],
				},
			],
			groupName: 'basic',
			medias: [],
			layout: 'content-right',
		},
		{
			id: uuidv4(),
			title: 'Button',
			screen_type: 'short-text',
			icon: hash,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
							],
						},
					],
					fieldLogic: [],
				},
			],
			groupName: 'basic',
			medias: [],
			layout: 'content-right',
		},
	] );
	function handleToggleMegaDropdown( e ) {
		e.preventDefault();
		setMegaDropdown( ! isOpenMegaDropdown );
		//setStoreData(['helpgent-single-form'],{})
	}

	const { getStoreData, setStoreData } = useStore();
	//console.log(getStoreData( [ 'helpgent-single-form' ] ));

	//const { form } = singleForm;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	console.log( content, questions );
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
		const { destination, source, draggableId, type } = results;
		if ( ! destination ) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		//console.log(questions);
		const welcomeQuestion = questions.filter(
			( item ) => item.screen_type === 'welcome'
		);
		const endQuestions = questions.filter(
			( item ) => item.screen_type === 'end'
		);
		const otherQuestions = Array.from(
			questions.filter(
				( item ) =>
					item.screen_type !== 'welcome' && item.screen_type !== 'end'
			)
		);
		//const newTestQuestion = Array.from(testQuestion);
		//console.log(otherQuestions);
		const [ removedQuestion ] = otherQuestions.splice( source.index, 1 );
		//const [removedTestQuestion] = newTestQuestion.splice(source.index,1);
		otherQuestions.splice( destination.index, 0, removedQuestion );
		//newQuestionOrder.unshift(welcomeQuestion);
		const updatedOrderedQuestion = [
			...welcomeQuestion,
			...otherQuestions,
			...endQuestions,
		];

		//console.log(updatedOrderedQuestion, otherQuestions);
		//setTestQuestion(newTestQuestion)
		const updatedForm = {
			...singleForm,
			content: JSON.stringify( { questions: updatedOrderedQuestion } ),
		};
		setSingleForm( updatedForm );

		//setStoreData( [ 'helpgent-single-form' ], { form: updatedForm } );
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
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					isOpenMegaDropdown={ isOpenMegaDropdown }
					setMegaDropdown={ setMegaDropdown }
				/>
			</div>
			<div className="helpgent-screenBar-content">
				{ getWelcomeType( questions ) }
				<DragDropContext onDragEnd={ onDragEnd }>
					<Droppable
						droppableId="helpgent-other-droppable-screen"
						//direction="vertical"
					>
						{ ( provided ) => (
							<div
								className="helpgent-screen helpgent-screenBar-content__other"
								ref={ provided.innerRef }
								{ ...provided.droppableProps }
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
