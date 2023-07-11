import { lazy, Suspense, useState } from '@wordpress/element';
import { Spinner, FormToggle } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
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
					<td>
						<TitleBox
							isEditModeActive={ isEditModeActive }
							setEditModeStatus={ setEditModeStatus }
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
