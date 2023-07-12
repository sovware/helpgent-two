import { useMutation } from '@tanstack/react-query';
import deleteData from '@helper/deleteData.js';

const useDeleteMutation = ( path ) => {
	return useMutation( () => deleteData( path ) );
};

export default useDeleteMutation;
