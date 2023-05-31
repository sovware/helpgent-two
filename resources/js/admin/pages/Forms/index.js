import { Link } from 'react-router-dom';
import { lazy, Suspense, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import useFetchData from '../../../hooks/useFetchData.js';
import CreatePopup from './CreatePopup.js';

const PageHeader = lazy( () => import( './components/PageHeader.js' ) );
const FormTable = lazy( () => import( './components/FormTable.js' ) );

export default function Forms() {
	const {
		data: forms,
		isError: isFetchError,
		errorMessage: formErrorMessage,
	} = useFetchData( 'helpgent-form', '/helpgent/admin/form', 'forms' );

	const [ createPopupStatus, setCreatePopupStatus ] = useState( false );
	return (
		<div className="helpgent-page-inner">
			<Suspense fallback={ <></> }>
				<PageHeader
					forms={ forms }
					isCreatePopupOpen={ createPopupStatus }
					setCreatePopupStatus={ setCreatePopupStatus }
				/>
			</Suspense>
			<Suspense fallback={ <Spinner /> }>
				<FormTable
					forms={ forms }
					isFetchError={ isFetchError }
					formErrorMessage={ formErrorMessage }
					isCreatePopupOpen={ createPopupStatus }
					setCreatePopupStatus={ setCreatePopupStatus }
				/>
			</Suspense>
			<CreatePopup
				isCreatePopupOpen={ createPopupStatus }
				setCreatePopupStatus={ setCreatePopupStatus }
			/>
		</div>
	);
}
