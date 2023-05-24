import { useQuery } from '@tanstack/react-query';
import dataFetcher from '../../lib/dataFetcher';

export default function useForms() {
	const { data, isLoading, error } = useQuery( [ 'helpgent-forms' ], () =>
		dataFetcher( '/helpgent/admin/formo' )
	);
	console.log( data, error );
	return {
		forms: !! error || isLoading ? {} : data.forms,
		isLoading,
		errorCode: !! error ? error.data.status : null,
		isError: !! error,
	};
}
