import { useState, useEffect, Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { ToastContainer } from 'react-toastify';
import { SingleFormStateProvider } from './context/SingleFormStateContext';
import useStore from '../../../hooks/useStore';
import useFetchData from '../../../hooks/useFetchData';
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
	const [ singleForm, setSingleForm ] = useState( null );
	useEffect( () => {
		setSingleForm( data );
	}, [ isLoading ] );

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
				<SingleFormStateProvider>
					<Header />
					<MainContent
						singleForm={ singleForm }
						setSingleForm={ setSingleForm }
					/>
					<ToastContainer />
				</SingleFormStateProvider>
			) }
		</SingleFormStyle>
	);
}

export default SingleForm;
