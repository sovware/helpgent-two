import { useQuery } from '@tanstack/react-query';
import dataFetcher from '@helper/fetchData';
import getErrorMessage from '@helper/getError';

export default function useForms() {
	const { data, isLoading, error } = useQuery(
		[ 'helpgent-forms' ],
		() => dataFetcher( '/helpgent/admin/form' ),
		{ refetchOnWindowFocus: false }
	);

	return {
		forms: !! error || isLoading ? {} : data.forms,
		isLoading,
		errorMessage: !! error
			? getErrorMessage( error ? error.data.status : '' )
			: '',
		isError: !! error,
	};
}
