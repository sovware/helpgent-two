import { useQuery } from '@tanstack/react-query';
import dataFetcher from '@helper/fetchData';
import getErrorMessage from '@helper/getError';

export default function useFetchData( queryKey, path, objectKey ) {
	const { data, isLoading, error } = useQuery(
		[ queryKey ],
		() => dataFetcher( path ),
		{ refetchOnWindowFocus: false }
	);

	return {
		data: !! error || isLoading ? null : data[ objectKey ],
		isLoading,
		errorMessage: !! error
			? getErrorMessage( error ? error.data.status : '' )
			: '',
		isError: !! error,
	};
}
