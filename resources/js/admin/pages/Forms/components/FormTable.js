import { lazy, Suspense } from '@wordpress/element';
const TitleBox = lazy( () => import( './TitleBox' ) );
import useForms from '../../../../hooks/forms/useForms.js';
import { FormTableStyle } from './style.js';

function FormTable() {
	const { forms, isLoading, isError, errorCode } = useForms();

	console.log( forms, isLoading, isError, errorCode );

	function tableContent() {
		if ( isError ) {
			return errorCode === 404 ? <span>Server Error</span> : null;
		}

		if ( isLoading ) {
			return <span>Loader</span>;
		}

		return forms.map( ( form ) => {
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>;
		} );
	}
	return (
		<FormTableStyle>
			<div className="helpgent-table-wrap helpgent-table-responsive">
				<table className="helpgent-table">
					<thead>
						<tr>
							<th className="helpgent-head-name">Name</th>
							<th className="helpgent-head-shortcode">
								ShortCode
							</th>
							<th className="helpgent-head-status">Status</th>
							<th className="helpgent-head-action">Actions</th>
						</tr>
					</thead>
					<tbody>{ tableContent() }</tbody>
				</table>
			</div>
		</FormTableStyle>
	);
}

export default FormTable;
