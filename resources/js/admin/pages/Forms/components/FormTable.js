import { lazy, Suspense, useState } from '@wordpress/element';
import { ToastContainer } from 'react-toastify';
import { Spinner, FormToggle } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import useUpdateMutation from '@hooks/useUpdateMutation.js';
import getFormTableBody from '../helper/getFormTableBody.js';
import getFormTableHead from '../helper/getFormTableHead.js';
const TitleBox = lazy( () => import( './TitleBox' ) );
const TableActions = lazy( () => import( './TableActions.js' ) );
const WelcomeBox = lazy( () => import( './WelcomeBox.js' ) );
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

	const [ isEditModeActive, setEditModeStatus ] = useState( false );

	return (
		<FormTableStyle>
			<div className="helpgent-table-wrap helpgent-table-forms-list helpgent-table-responsive">
				<table className="helpgent-table">
					<thead>{ getFormTableHead() }</thead>
					<tbody>
						{ forms ? (
							getFormTableBody(
								forms,
								isEditModeActive,
								setEditModeStatus,
								isFetchError,
								isCreatePopupOpen,
								setCreatePopupStatus
							)
						) : (
							<tr>
								<td colSpan={ 7 }>
									<div class="helpgent-table-loader">
										<Spinner />
									</div>
								</td>
							</tr>
						) }
					</tbody>
				</table>
			</div>
			<ToastContainer />
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
