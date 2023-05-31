import { lazy, Suspense } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import PropTypes from 'prop-types';
const TitleBox = lazy( () => import( './TitleBox' ) );
const TableActions = lazy( () => import( './TableActions.js' ) );
const WelcomeBox = lazy( () => import( './WelcomeBox.js' ) );
import useForms from '../../../../hooks/forms/useForms.js';
import useFetchData from '../../../../hooks/useFetchData.js';
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

		return forms.length !== 0 ? (
			forms.map( ( form ) => (
				<tr key={ form.id }>
					<td>{ form.title }</td>
					<td>{ form.status }</td>
					<td>{ form.status }</td>
					<td>
						<Suspense fallback={ <></> }>
							<TableActions />
						</Suspense>
					</td>
				</tr>
			) )
		) : (
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
		);
	}

	return (
		<FormTableStyle>
			<div className="helpgent-table-wrap helpgent-table-responsive">
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
					<tbody>{ forms ? tableContent() : <Spinner /> }</tbody>
				</table>
			</div>
		</FormTableStyle>
	);
}

FormTable.propTypes = {
	forms: PropTypes.object,
	isFetchError: PropTypes.bool,
	formErrorMessage: PropTypes.string,
	isCreatePopupOpen: PropTypes.bool,
	setCreatePopupStatus: PropTypes.func,
};
