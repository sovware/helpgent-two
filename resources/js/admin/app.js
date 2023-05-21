import { lazy, Suspense } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Messenger = lazy( () => import( './pages/Messenger' ) );
const Forms = lazy( () => import( './pages/Forms' ) );
const Analytics = lazy( () => import( './pages/Analytics' ) );
const Settings = lazy( () => import( './pages/Settings' ) );
const Submissions = lazy( () => import( './pages/Submissions' ) );

export default function App() {
	const { isLoading, error, data, isFetching } = useQuery(
		[ 'data-fetch' ],
		fetchData
	);

	//callback for fetching data
	function fetchData() {
		return apiFetch( { path: '/wp/v2/posts' } ).then( ( res ) => res );
	}
	console.log( isLoading, data );

	return (
		<HashRouter>
			<Suspense fallback={ <></> }>
				<Routes>
					<Route
						index
						path={ `/*` }
						element={ <Messenger /> }
					></Route>
					<Route path="/forms" element={ <Forms /> }></Route>
					<Route path="/analytics" element={ <Analytics /> }></Route>
					<Route path="/settings" element={ <Settings /> }></Route>
					<Route
						path="/submissions"
						element={ <Submissions /> }
					></Route>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}
