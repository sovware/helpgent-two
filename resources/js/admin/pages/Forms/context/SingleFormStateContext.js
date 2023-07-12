import { createContext, useContext, useState } from '@wordpress/element';
const SingleFormStateContent = createContext();

export const useSingleFormState = () => useContext( SingleFormStateContent );

export const SingleFormStateProvider = ( { children } ) => {
	const singleFormObj = {
		layoutMode: 'mediaLeft', //mediaLeft, mediaRight, mediaBehind
	};
	const [ singleFormState, setSingleFormState ] = useState( singleFormObj );

	return (
		<SingleFormStateContent.Provider
			value={ { singleFormState, setSingleFormState } }
		>
			{ children }
		</SingleFormStateContent.Provider>
	);
};
