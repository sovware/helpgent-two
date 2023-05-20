import { createRoot, lazy, Suspense } from '@wordpress/element';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { select } from '@wordpress/data';

const Messenger = lazy( () => import( './containers/Messenger' ) );
const Forms = lazy( () => import( './containers/Forms' ) );
const Analytics = lazy( () => import( './containers/Analytics' ) );
const Settings = lazy( () => import( './containers/Settings' ) );
const Submissions = lazy( () => import( './containers/Submissions' ) );

import store from '@helpgent/store';

const core = select( 'helpgent-store' );

export default function App() {
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

document.addEventListener( 'DOMContentLoaded', function () {
	const container = document.querySelector( '.helpgent-root' );
	if ( ! container ) {
		return;
	}

	if ( createRoot ) {
		const root = createRoot( container );

		root.render( <App /> );
	} else {
		render( <App />, container );
	}
} );
