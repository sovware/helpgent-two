import { Link } from 'react-router-dom';
import { lazy, Suspense } from '@wordpress/element';

const PageHeader = lazy( () => import( './components/PageHeader.js' ) );
const FormTable = lazy( () => import( './components/FormTable.js' ) );

export default function Forms() {
	return (
		<div className="helpgent-page-inner">
			<PageHeader />

			<FormTable />
		</div>
	);
}
