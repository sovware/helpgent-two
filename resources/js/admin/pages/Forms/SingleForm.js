import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { FormAppStateProvider } from './context/FormAppStateContext';
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

	//console.log( isLoading, data, singleForm );
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
				<FormAppStateProvider>
					<Header />
					<MainContent
						singleForm={ singleForm }
						setSingleForm={ setSingleForm }
					/>
				</FormAppStateProvider>
			) }
		</SingleFormStyle>
	);
}

export default SingleForm;
