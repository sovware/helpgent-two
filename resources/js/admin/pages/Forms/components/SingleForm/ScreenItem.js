import { useState, useRef, useEffect } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import checkedClickedOutside from '@helper/checkClickedOutside';
import Dropdown from '../../../../../components/Dropdown.js';
import Badge from '../../../../../components/Badge.js';
import updateQuestion from '../../helper/updateQuestion';
import handleAddQuestion from '../../helper/handleAddQuestion';
import { iconList } from './constants.js';
import ellipsisH from '../../../../../../../assets/svg/icon/ellipsis-h.svg';
import pen from '../../../../../../../assets/svg/icon/pen-nib.svg';
import copy from '../../../../../../../assets/svg/icon/copy.svg';
import trash from '../../../../../../../assets/svg/icon/trash.svg';
import { ScreenItemStyle } from './style.js';

export default function ScreenItem( {
	question,
	handler,
	hasDropdown,
	index,
	isDisabled,
	isActive,
} ) {
	const ref = useRef( null );
	const [ isActiveRename, setRenameField ] = useState( false );
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const { id, icon, title, isPro, isComing } = question;

	/* Close Dropdown click on outside */
	useEffect( () => {
		checkedClickedOutside( isActiveRename, setRenameField, ref );
	}, [ isActiveRename ] );

	const getDropdownOption = () => {
		let moreDropdown = [
			{
				name: 'rename',
				icon: pen,
				text: 'Rename',
			},
			{
				name: 'duplicate',
				icon: copy,
				text: 'Duplicate',
			},
			{
				name: 'delete',
				icon: trash,
				text: 'Delete',
			},
		];

		if ( questions.length === 1 ) {
			const newDropdownOptions = moreDropdown.filter(
				( item ) => item.name !== 'delete'
			);

			return newDropdownOptions;
		}

		return moreDropdown;
	};

	function handleDropdownTrigger( event, name ) {
		event.preventDefault();
		if ( name === 'delete' ) {
			const newQuestionList = questions.filter(
				( item ) => item.id !== id
			);

			let previousElement = null;

			for ( let i = 0; i < questions.length; i++ ) {
				if ( questions[ i ].id === id ) {
					previousElement =
						i > 0 ? questions[ i - 1 ] : questions[ i + 1 ];
				}
			}

			const updatedForm = {
				...singleForm,
				content: JSON.stringify( { questions: newQuestionList } ),
			};
			setSingleFormState( {
				...singleFormState,
				singleForm: updatedForm,
				activeScreenId: previousElement.id,
			} );
		} else if ( name === 'rename' ) {
			setRenameField( true );
		} else if ( name === 'duplicate' ) {
			const duplicateQuestion = questions.filter(
				( item ) => item.id === id
			)[ 0 ];
			handleAddQuestion(
				duplicateQuestion,
				singleFormState,
				setSingleFormState
			);
		}
	}

	function handleRenameScreen( event ) {
		updateQuestion(
			'title',
			event.target.value,
			id,
			singleFormState,
			setSingleFormState
		);
	}

	return (
		<ScreenItemStyle
			className={
				isDisabled
					? 'helpgent-screen__item helpgent-screen__disabled'
					: isActive
					? 'helpgent-screen__item helpgent-active'
					: 'helpgent-screen__item'
			}
			ref={ ref }
		>
			<div
				className="helpgent-screen__inner"
				onClick={ () => handler( question ) }
			>
				<div className="helpgent-screen__content">
					<div className="helpgent-screen__icon">
						<ReactSVG src={ iconList[ icon ] } />
					</div>
					<h4 className="helpgent-screen__title">
						{ /* { index && (
							<span className="helpgent-screen__counter">
								{ index }.
							</span>
						) } */ }
						{ title }
						{ isPro && <Badge type="success" text="PRO" /> }
						{ isComing && <Badge type="gray" text="Coming Soon" /> }
					</h4>
				</div>
			</div>

			{ hasDropdown && (
				<Dropdown
					className="helpgent-screen-dropdown"
					dropDownIcon={ ellipsisH }
					dropdownList={ getDropdownOption() }
					placement={ 'right' }
					handleDropdownTrigger={ handleDropdownTrigger }
				/>
			) }
			{ isActiveRename && (
				<div className="helpgent-rename-screen">
					<input
						type="text"
						value={ title }
						onChange={ handleRenameScreen }
					/>
				</div>
			) }
		</ScreenItemStyle>
	);
}
