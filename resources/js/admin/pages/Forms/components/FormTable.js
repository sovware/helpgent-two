import { lazy, Suspense, useState } from '@wordpress/element';
import { Spinner, FormToggle } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import getFormTableBody from '../helper/getFormTableBody.js';
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

	const [ formTitleInput, setFormTitleInput ] = useState( '' );

	return (
		<FormTableStyle>
			<div className="helpgent-table-wrap helpgent-table-responsive-">
				<table className="helpgent-table">
					<thead>
						<tr>
							<th className="helpgent-head-name">Name</th>
							<th className="helpgent-head-shortCode">
								ShortCode
							</th>
							<th className="helpgent-head-response">
								Responses
							</th>
							<th className="helpgent-head-created">Updated</th>
							<th className="helpgent-head-status">Status</th>
							<th className="helpgent-head-action">Action</th>
						</tr>
					</thead>
					<tbody>
						{ forms ? (
							getFormTableBody(
								forms,
								isEditModeActive,
								setEditModeStatus,
								setFormTitleInput,
								isFetchError
							)
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
