import { useEffect, Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import useStore from '../../../hooks/useStore';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './components/SingleForm/Header';
import MainContent from './components/SingleForm/MainContent';
import { allForms } from '../../../constants';
import { SingleFormStyle } from './style.js';

function SingleForm() {
	const { id } = useParams();
	const { isLoading, errorMessage, isError } = useFetchData(
		'helpgent-single-form',
		`/helpgent/admin/form/${ id }`,
		'form'
	);
	return (
		<SingleFormStyle>
			{ isLoading || isError ? (
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
				</Fragment>
			) }
		</SingleFormStyle>
	);
}

export default SingleForm;
