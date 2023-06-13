import apiFetch from '@wordpress/api-fetch';

export default async function createData( path, data ) {
	return await apiFetch( { path: path, method: 'POST', data } ).then(
		( res ) => res
	);
}
