import { lazy, Suspense, useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import useFetchData from '../hooks/useFetchData.js';

const Messenger = lazy( () => import( './pages/Messenger' ) );
const Forms = lazy( () => import( './pages/Forms' ) );
const SingleForm = lazy( () => import( './pages/Forms/SingleForm.js' ) );
const FormMap = lazy( () => import( './pages/Forms/FormsMap.js' ) );
const Analytics = lazy( () => import( './pages/Analytics' ) );
const Settings = lazy( () => import( './pages/Settings' ) );
const Submissions = lazy( () => import( './pages/Submissions' ) );

export default function App() {
	//const { data: forms, isLoading: isFormLoading, isError: isFetchFormError, errorMessage: isErrorMessage } = useFetchData('helpgent-form', '/helpgent/admin/form', 'forms');
	const [ dir, setDir ] = useState( 'ltr' );

	const theme = {
		direction: dir,
	};

	useEffect( () => {
		if ( document.documentElement.getAttribute( 'dir' ) === 'rtl' ) {
			setDir( 'rtl' );
		} else {
			setDir( 'ltr' );
		}
	}, [] );

	// const { isLoading, error, data, isFetching } = useQuery(
	// 	[ 'data-fetch' ],
	// 	fetchData
	// );

	//callback for fetching data
	// function fetchData() {
	// 	return apiFetch( { path: '/wp/v2/posts' } ).then( ( res ) => res );
	// }
	// console.log( isLoading, data );

	return (
		<div className="helpgent-app-wrap">
			<HashRouter>
				<Suspense fallback={ <></> }>
					<ThemeProvider theme={ theme }>
						<Routes>
							<Route
								index
								path={ `/*` }
								element={ <Messenger /> }
							></Route>
							<Route path="/forms" element={ <Forms /> }></Route>
							<Route
								path="/forms/single"
								element={ <SingleForm /> }
							></Route>
							<Route
								path="/forms/map"
								element={ <FormMap /> }
							></Route>
							<Route
								path="/analytics"
								element={ <Analytics /> }
							></Route>
							<Route
								path="/settings"
								element={ <Settings /> }
							></Route>
							<Route
								path="/submissions"
								element={ <Submissions /> }
							></Route>
						</Routes>
					</ThemeProvider>
				</Suspense>
			</HashRouter>
		</div>
	);
}
