import { useQueryClient } from '@tanstack/react-query';

export default function useStore() {
	const queryClient = useQueryClient();

	const setStoreData = ( queryKey, data ) => {
		queryClient.setQueryData( queryKey, data );
	};

	const getStoreData = ( queryKey ) => {
		return queryClient.getQueryData( queryKey );
	};

	const removeStoreData = ( queryKey ) => {
		queryClient.removeQueries( queryKey );
	};

	return { setStoreData, getStoreData, removeStoreData };
}
