import TitleBox from '../components/TitleBox';
import TableActions from '../components/TableActions';
import { formatDate } from '../../../../helper/formatter';
import handleUpdateFormStatus from './handleUpdateFormStatus';
import useUpdateMutation from '@hooks/useUpdateMutation.js';
import FormTableStatus from '../components/FormTableStatus';
import WelcomeBox from '../components/WelcomeBox';
import { Spinner, FormToggle } from '@wordpress/components';
import { lazy, Suspense, useState } from '@wordpress/element';
import { WelcomeBoxStyleWrap } from '../components/style';
/**
 * Function for load data with dom
 * @returns Dom of table body
 */
export default function getFormTableBody(
	forms,
	renameFormId,
	setRenameFormId,
	isFetchError,
	isCreatePopupOpen,
	setCreatePopupStatus
) {
	if ( isFetchError ) {
		return <span>{ formErrorMessage }</span>;
	}

	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	function handleToggleFormStatus( id, status ) {
		const { mutateAsync: updateStatusFormMutation, isLoading } =
			useUpdateMutation( `/helpgent/admin/form/${ id }/status` );

		handleUpdateFormStatus( id, updateStatusFormMutation, forms, status );
	}

	return forms.length !== 0 ? (
		forms.map( ( form ) => (
			<tr key={ form.id }>
				<td>
					<TitleBox
						renameFormId={ renameFormId }
						setRenameFormId={ setRenameFormId }
						form={ form }
					/>
				</td>
				<td className="helpgent-form-shortCode">
					<label>
						<input
							type="text"
							readOnly
							value={ `[helpgent_form id="${ form.id }"]` }
						/>
					</label>
				</td>
				<td>{ form.total_responses }</td>
				<td>
					{ formatDate(
						'en-US',
						form.created_at,
						dateFormatOptions
					) }
				</td>
				<td>
					<FormTableStatus id={ form.id } status={ form.status } />
				</td>
				<td>
					<Suspense fallback={ <></> }>
						<TableActions
							id={ form.id }
							form={ form }
							setRenameFormId={ setRenameFormId }
						/>
					</Suspense>
				</td>
			</tr>
		) )
	) : (
		<tr>
			<td colSpan={ 7 }>
				<WelcomeBoxStyleWrap>
					<Suspense fallback={ <Spinner /> }>
						<WelcomeBox
							isCreatePopupOpen={ isCreatePopupOpen }
							setCreatePopupStatus={ setCreatePopupStatus }
						/>
					</Suspense>
				</WelcomeBoxStyleWrap>
			</td>
		</tr>
	);
}
