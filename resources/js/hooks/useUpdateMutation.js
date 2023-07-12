import { useMutation } from '@tanstack/react-query';
import createData from '@helper/createData.js';

const useUpdateMutation = ( path ) => {
	return useMutation( ( data ) => createData( path, data ) );
};

export default useUpdateMutation;
