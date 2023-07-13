import { useState, useEffect, useRef, Fragment } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { useAppState } from '../../../../Context.js';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import ScreenListDropdown from './ScreenListDropdown';
import handleChangeQuestionType from '../../helper/handleChangeQuestionType';
import checkedClickedOutside from '@helper/checkClickedOutside.js';
import updateQuestionFields from '../../helper/updateQuestionFields.js';
import handleOpenUploader from '../../helper/handleOpenUploader';
import { iconList, fieldList } from './constants.js';
import angleDown from '@icon/angle-small-down.svg';
import shuffle from '@icon/shuffle.svg';
import trash from '@icon/trash-solid.svg';
import mediaLeft from '@icon/media-left.svg';
import mediaRight from '@icon/media-right.svg';
import mediaBehind from '@icon/media-behind.svg';
export default function SettingQuestion( props ) {
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { appState, setAppState } = useAppState();
	const { singleForm, layoutMode } = singleFormState;

	const ref = useRef( null );

	const [ isDropdownOpen, setDropdownOpen ] = useState( false );
	const { activeScreen } = props;
	const { questions } = JSON.parse( singleForm.content );

	const { id: activeScreenId, icon, title, fields, medias } = activeScreen;

	const { elements: questionFields } = fields[ 0 ];

	const fieldObject = questionFields.reduce( ( acc, field ) => {
		acc[ field.key ] = field;
		return acc;
	}, {} );

	const requireDom = fieldList.required;

	function handleToggleDropdown() {
		setDropdownOpen( true );
	}
	let requiredStatus = fieldObject?.required?.is_required;
	let showTimerStatus =
		fieldObject[ 'show-timer' ] &&
		fieldObject[ 'show-timer' ].is_show_timer;
	let timeToCompleteStatus =
		fieldObject[ 'time-complete' ] &&
		fieldObject[ 'time-complete' ].is_time_to_complete;
	let btnText =
		fieldObject[ 'btn-text' ] && fieldObject[ 'btn-text' ].button_text;
	function handleRequire() {
		fieldObject.required.is_required = requiredStatus === '0' ? '1' : '0';

		updateQuestionFields(
			fields,
			activeScreenId,
			singleFormState,
			setSingleFormState
		);
	}

	function handleShowTimer() {
		fieldObject[ 'show-timer' ].is_show_timer =
			showTimerStatus === '0' ? '1' : '0';

		updateQuestionFields(
			fields,
			activeScreenId,
			singleFormState,
			setSingleFormState
		);
	}

	function handleTimeComplete() {
		fieldObject.required.is_time_to_complete =
			timeToCompleteStatus === '0' ? '1' : '0';

		updateQuestionFields(
			fields,
			activeScreenId,
			singleFormState,
			setSingleFormState
		);
	}

	function handleUpdateButtonText( event ) {
		fieldObject[ 'btn-text' ].button_text = event.target.value;

		updateQuestionFields(
			fields,
			activeScreenId,
			singleFormState,
			setSingleFormState
		);
	}

	function handleRemoveMedia() {
		const updatedQuestions = questions.map( ( question ) => {
			if ( question.id === activeScreenId ) {
				return {
					...question,
					medias: [],
				};
			}
			return question;
		} );

		const updatedForm = {
			...singleForm,
			content: JSON.stringify( { questions: updatedQuestions } ),
		};

		setSingleForm( updatedForm );
	}

	function handleChangeLayout( mode ) {
		setSingleFormState( {
			...singleFormState,
			layoutMode: mode,
		} );
	}

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isDropdownOpen, setDropdownOpen, ref );
	}, [ isDropdownOpen ] );

	return (
		<div className="helpgent-screen-setting-wrap">
			<div className="helpgent-screen-setting-block">
				<div className="helpgent-screen-setting-element">
					<h5 className="helpgent-screen-setting-element__label">
						Question Type
					</h5>
					<div
						className="helpgent-screen-setting-element__content"
						ref={ ref }
					>
						<div
							className="helpgent-question-dropdown"
							onClick={ handleToggleDropdown }
						>
							<div className="helpgent-question-dropdown__content">
								<div className="helpgent-question-dropdown__icon">
									<ReactSVG src={ iconList[ icon ] } />
								</div>
								<h4 className="helpgent-question-dropdown__title">
									{ title }
								</h4>
							</div>

							<span className="helpgent-question-dropdown__arrow">
								<ReactSVG src={ angleDown } />
							</span>
						</div>
						<ScreenListDropdown
							isOpenMegaDropdown={ isDropdownOpen }
							handleItemEvent={ handleChangeQuestionType }
						/>
					</div>
				</div>
			</div>
			<div className="helpgent-screen-setting-block">
				<span className="helpgent-screen-setting-block__label">
					Element settings
				</span>
				<div className="helpgent-screen-setting-element">
					{ fieldObject.required && (
						<fieldList.required
							handleRequire={ handleRequire }
							requiredStatus={ requiredStatus }
						/>
					) }
					{ fieldObject[ 'show-timer' ] && (
						<fieldList.showTimer
							handleShowTimer={ handleShowTimer }
							showTimerStatus={ showTimerStatus }
						/>
					) }
					{ fieldObject[ 'time-complete' ] && (
						<fieldList.timeComplete
							handleRequire={ handleTimeComplete }
							requiredStatus={ timeToCompleteStatus }
						/>
					) }
					{ fieldObject[ 'btn-text' ] && (
						<fieldList.btnText
							handleUpdateButtonText={ handleUpdateButtonText }
							buttonText={ btnText }
						/>
					) }
				</div>
			</div>
			<div className="helpgent-screen-setting-block">
				<span className="helpgent-screen-setting-block__label">
					Add image or video
				</span>
				<div className="helpgent-media-uploader">
					<span
						className="helpgent-btn helpgent-btn-sm helpgent-btn-upload-trigger"
						onClick={ () =>
							handleOpenUploader(
								medias,
								activeScreenId,
								singleFormState,
								setSingleFormState
							)
						}
					>
						Add image/video
					</span>
					{ medias.length !== 0 && (
						<Fragment>
							<div className="helpgent-media-preview">
								<div className="helpgent-media-preview__src">
									<video
										src={ medias[ 0 ].url }
										playsInline
									></video>
								</div>
							</div>
							<div className="helpgent-media-actions">
								<span
									className="helpgent-btn helpgent-btn-replace"
									onClick={ () =>
										handleOpenUploader(
											medias,
											activeScreenId,
											singleFormState,
											setSingleFormState
										)
									}
								>
									<ReactSVG src={ shuffle } />
									Replace
								</span>
								<span
									className="helpgent-btn helpgent-btn-remove"
									onClick={ handleRemoveMedia }
								>
									<ReactSVG src={ trash } />
								</span>
							</div>
						</Fragment>
					) }
				</div>
			</div>
			<div className="helpgent-screen-setting-block">
				<span className="helpgent-screen-setting-block__label">
					Layout
				</span>
				<div className="helpgent-layout-actions">
					<div
						className={
							layoutMode === 'mediaLeft'
								? 'helpgent-layout-action__single helpgent-active'
								: 'helpgent-layout-action__single'
						}
						onClick={ () => handleChangeLayout( 'mediaLeft' ) }
					>
						<ReactSVG src={ mediaLeft } />
					</div>
					<div
						className={
							layoutMode === 'mediaRight'
								? 'helpgent-layout-action__single helpgent-active'
								: 'helpgent-layout-action__single'
						}
						onClick={ () => handleChangeLayout( 'mediaRight' ) }
					>
						<ReactSVG src={ mediaRight } />
					</div>
					<div
						className={
							layoutMode === 'mediaBehind'
								? 'helpgent-layout-action__single helpgent-active'
								: 'helpgent-layout-action__single'
						}
						onClick={ () => handleChangeLayout( 'mediaBehind' ) }
					>
						<ReactSVG src={ mediaBehind } />
					</div>
				</div>
			</div>
		</div>
	);
}
