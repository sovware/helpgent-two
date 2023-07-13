import { useState, useRef, useEffect } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import Dropdown from '../../../../../components/Dropdown.js';
import Badge from '../../../../../components/Badge.js';
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
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const { id, icon, title, isPro, isComing } = question;

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

			console.log( questions, previousElement );

			const updatedForm = {
				...singleForm,
				content: JSON.stringify( { questions: newQuestionList } ),
			};
			setSingleFormState( {
				...singleFormState,
				singleForm: updatedForm,
				activeScreenId: previousElement.id,
			} );
		}
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
		</ScreenItemStyle>
	);
}
