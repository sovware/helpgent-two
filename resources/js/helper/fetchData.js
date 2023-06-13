import apiFetch from '@wordpress/api-fetch';

export default async function fetchData( path ) {
	return await apiFetch( { path: path } ).then( ( res ) => res );
}
