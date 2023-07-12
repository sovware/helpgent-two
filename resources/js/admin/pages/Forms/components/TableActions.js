import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormTableState } from '../context/FormTableStateContext.js';
import useDeleteMutation from '../../../../hooks/useDeleteMutation.js';
import useStore from '@hooks/useStore.js';
import Dropdown from '@components/Dropdown.js';
import ReactSVG from 'react-inlinesvg';
import pencil from '@icon/pencil-solid.svg';
import ellipsisH from '@icon/ellipsis-h.svg';
import user from '@icon/comment-user.svg';
import penNib from '@icon/pen-nib.svg';
import trash from '@icon/trash.svg';

export default function TableActions( props ) {
	const { id, form, setEditModeStatus } = props;
	const { formTableState, setFormTableState } = useFormTableState();

	const { setStoreData, getStoreData } = useStore();
	const forms = getStoreData( [ 'helpgent-form' ] );

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

	/* Form Delete Mutation */
	const {
		mutateAsync: deleteFormMutation,
		isLoading,
		error,
	} = useDeleteMutation( `/helpgent/admin/form/${ id }` );

	async function handleDropdownTrigger( event, name ) {
		event.preventDefault();
		if ( name === 'rename' ) {
			setEditModeStatus( true );
			setFormTableState( {
				...formTableState,
				formInputTitle: form.title,
			} );
		} else if ( name === 'delete' ) {
			try {
				const deleteFormResponse = await deleteFormMutation();

				const updatedForms = forms.forms.filter(
					( singleForm ) => singleForm.id !== id
				);

				const formData = {
					...forms,
					forms: updatedForms,
				};
				setStoreData( [ 'helpgent-form' ], formData );
				toast.success( deleteFormResponse.message, {
					autoClose: 3000,
				} );
			} catch ( error ) {
				console.log( error );
				toast.success( 'Server Error', {
					autoClose: 3000,
				} );
			}
		}
	}

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
