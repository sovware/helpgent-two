import useStore from '../../../../../hooks/useStore';
import ReactSVG from 'react-inlinesvg';
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
	const { getStoreData, setStoreData } = useStore();
	const { form } = getStoreData( [ 'helpgent-single-form' ] );
	const { content } = form;
	const { questions } = JSON.parse( content );

	const { id, icon, title, isPro, isComing } = question;

	const moreDropdown = [
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

	function handleDropdownTrigger( event, name ) {
		if ( name === 'delete' ) {
			const newQuestionList = questions.filter(
				( item ) => item.id !== id
			);

			const updatedForm = {
				...form,
				content: JSON.stringify( { questions: newQuestionList } ),
			};

			setStoreData( [ 'helpgent-single-form' ], { form: updatedForm } );
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
			{ hasDropdown && (
				<Dropdown
					dropDownIcon={ ellipsisH }
					dropdownList={ moreDropdown }
					placement={ 'right' }
					handleDropdownTrigger={ handleDropdownTrigger }
				/>
			) }
		</ScreenItemStyle>
	);
}
