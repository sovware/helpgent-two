import { useMutation } from '@tanstack/react-query';
import createData from '@helper/createData.js';

const useCreateMutation = ( path ) => {
	return useMutation( ( data ) => createData( path, data ) );
};

export default useCreateMutation;
