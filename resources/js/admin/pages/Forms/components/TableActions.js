import { Link } from 'react-router-dom';
import { useFormAppState } from '../context/FormAppStateContext';
import Dropdown from '@components/Dropdown.js';
import ReactSVG from 'react-inlinesvg';
import pencil from '@icon/pencil-solid.svg';
import ellipsisH from '@icon/ellipsis-h.svg';
import user from '@icon/comment-user.svg';
import penNib from '@icon/pen-nib.svg';
import trash from '@icon/trash.svg';

export default function TableActions( props ) {
	const { id, form, setEditModeStatus, setFormTitleInput } = props;
	const { formAppState, setFormAppState } = useFormAppState();

	const moreDropdown = [
		{
			name: 'responses',
			icon: user,
			text: 'Responses',
		},
		{
			name: 'rename',
			icon: penNib,
			text: 'Rename',
		},
		{
			name: 'delete',
			icon: trash,
			text: 'Delete',
		},
	];

	function handleDropdownTrigger( event, name ) {
		event.preventDefault();
		if ( name === 'rename' ) {
			setEditModeStatus( true );
			setFormAppState( {
				...formAppState,
				formInputTitle: form.title,
			} );
		}
	}

	//console.log(formAppState);

	return (
		<div className="helpgent-table-action">
			<Link
				to={ `/forms/${ id }` }
				className="helpgent-btn helpgent-btn-light"
			>
				{ /* <ReactSVG src={pencil} /> */ }
				Edit
			</Link>
			<Dropdown
				dropDownIcon={ ellipsisH }
				placement="left"
				dropdownList={ moreDropdown }
				handleDropdownTrigger={ handleDropdownTrigger }
			/>
		</div>
	);
}
