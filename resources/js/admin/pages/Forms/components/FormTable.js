import { lazy, Suspense } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { FormToggle } from '@wordpress/components';
import PropTypes from 'prop-types';
const TitleBox = lazy( () => import( './TitleBox' ) );
const TableActions = lazy( () => import( './TableActions.js' ) );
const WelcomeBox = lazy( () => import( './WelcomeBox.js' ) );
import useForms from '../../../../hooks/forms/useForms.js';
import useFetchData from '../../../../hooks/useFetchData.js';
import { formatDate } from '@helper/formatter.js';
import { FormTableStyle, WelcomeBoxStyleWrap } from './style.js';

export default function FormTable( props ) {
	const {
		forms,
		isFetchError,
		formErrorMessage,
		isCreatePopupOpen,
		setCreatePopupStatus,
	} = props;

	/**
	 * Function for load data with dom
	 * @returns Dom of table body
	 */
	function tableContent() {
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
					<td>{ form.id }</td>
					<td>{ form.title }</td>
					<td className="helpgent-form-shortCode">
						<label>
							<input
								type="text"
								readOnly
								value={ `[helpgent_form id="${ form.id }"]` }
							/>
						</label>
					</td>
					<td>{ form.total_submissions }</td>
					<td>
						<div className="helpgent-toggle helpgent-toggle-success">
							<FormToggle />
						</div>
					</td>
					<td>
						{ formatDate(
							'en-US',
							form.created_at,
							dateFormatOptions
						) }
					</td>
					<td>
						<Suspense fallback={ <></> }>
							<TableActions id={ form.id } />
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

	return (
		<FormTableStyle>
			<div className="helpgent-table-wrap helpgent-table-forms-list helpgent-table-responsive">
				<table className="helpgent-table">
					<thead>
						<tr>
							<th className="helpgent-head-id">Id</th>
							<th className="helpgent-head-name">Name</th>
							<th className="helpgent-head-shortCode">
								ShortCode
							</th>
							<th className="helpgent-head-response">
								Responses
							</th>
							<th className="helpgent-head-status">Status</th>
							<th className="helpgent-head-created">Created</th>
							<th className="helpgent-head-action">Action</th>
						</tr>
					</thead>
					<tbody>
						{ forms ? (
							tableContent()
						) : (
							<tr>
								<td colSpan={ 7 }>
									<Spinner />
								</td>
							</tr>
						) }
					</tbody>
				</table>
			</div>
		</FormTableStyle>
	);
}

FormTable.propTypes = {
	forms: PropTypes.array,
	isFetchError: PropTypes.bool,
	formErrorMessage: PropTypes.string,
	isCreatePopupOpen: PropTypes.bool,
	setCreatePopupStatus: PropTypes.func,
};
