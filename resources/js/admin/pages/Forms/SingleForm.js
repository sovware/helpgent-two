import { useState, useEffect, Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { ToastContainer } from 'react-toastify';
import { SingleFormStateProvider } from './context/SingleFormStateContext';
import useFetchData from '../../../hooks/useFetchData';
import { useAppState } from '../../Context';
import { useSingleFormState } from './context/SingleFormStateContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './components/SingleForm/Header';
import MainContent from './components/SingleForm/MainContent';
import { SingleFormStyle } from './style.js';

function SingleForm() {
	const { id } = useParams();
	const { data, isLoading, errorMessage, isError } = useFetchData(
		'helpgent-single-form',
		`/helpgent/admin/form/${ id }`,
		'form'
	);
	const { appState, setAppState } = useAppState();
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm } = singleFormState;
	//const [ singleFodrm, setSingleForm ] = useState( null );
	useEffect( () => {
		setSingleFormState( {
			...singleFormState,
			singleForm: data,
		} );
	}, [ isLoading ] );

	console.log( singleFormState );

	return (
		<SingleFormStyle>
			{ ! singleForm || isLoading || isError ? (
				<div className="helpgent-page-initial">
					{ isLoading ? (
						<Spinner />
					) : isError ? (
						<div className="helpgent-message-error">
							{ errorMessage }
						</div>
					) : null }
				</div>
			) : (
				<Fragment>
					<Header />
					<MainContent />
					<ToastContainer />
				</Fragment>
			) }
		</SingleFormStyle>
	);
}

export default SingleForm;
