import { Link } from 'react-router-dom';
import useStore from '@hooks/useStore.js';
import useUpdateMutation from '@hooks/useUpdateMutation.js';
import handleUpdateFormStatus from '../helper/handleUpdateFormStatus';
import { Spinner, FormToggle } from '@wordpress/components';

export default function FormTableStatus( props ) {
	const { id, status } = props;
	const statusText = status === 'publish' ? 'Active' : 'Inactive';

	const { setStoreData, getStoreData } = useStore();
	const forms = getStoreData( [ 'helpgent-form' ] );

	/* Form Update Mutation */
	const { mutateAsync: updateStatusFormMutation, isLoading } =
		useUpdateMutation( `/helpgent/admin/form/${ id }/status` );

	return (
		<div className="helpgent-toggle helpgent-toggle-success">
			<FormToggle
				onChange={ () =>
					handleUpdateFormStatus(
						id,
						forms,
						status,
						updateStatusFormMutation,
						setStoreData
					)
				}
				checked={ status === 'publish' }
			/>
			<span className="helpgent-form-status">{ statusText }</span>
		</div>
	);
}
