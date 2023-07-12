import TitleBox from '../components/TitleBox';
import TableActions from '../components/TableActions';
import { formatDate } from '../../../../helper/formatter';
import { Spinner, FormToggle } from '@wordpress/components';
import { lazy, Suspense, useState } from '@wordpress/element';
/**
 * Function for load data with dom
 * @returns Dom of table body
 */
export default function getFormTableBody(
	forms,
	isEditModeActive,
	setEditModeStatus,
	setFormTitleInput,
	isFetchError
) {
	if ( isFetchError ) {
		return <span>{ formErrorMessage }</span>;
	}

	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return forms.length !== 0 ? (
		forms.map( ( form ) => (
			<tr key={ form.id }>
				<td>
					<TitleBox
						isEditModeActive={ isEditModeActive }
						setEditModeStatus={ setEditModeStatus }
						form={ form }
					/>
				</td>
				<td className="helpgent-form-shortcode">
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
					<div className="helpgent-toggle helpgent-toggle-success">
						<FormToggle />
						<span className="helpgent-form-status">Active</span>
					</div>
				</td>
				<td>
					<Suspense fallback={ <></> }>
						<TableActions
							id={ form.id }
							form={ form }
							setEditModeStatus={ setEditModeStatus }
							setFormTitleInput={ setFormTitleInput }
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
