import apiFetch from '@wordpress/api-fetch';

export default async function deleteData( path ) {
	return await apiFetch( { path: path, method: 'DELETE' } ).then(
		( res ) => res
	);
}
