import { createContext, useContext, useState } from '@wordpress/element';
const AppStateContent = createContext();

export const useAppState = () => useContext( AppStateContent );

export const AppStateProvider = ( { children } ) => {
	const AppObj = {
		singleForm: null,
	};
	const [ appState, setAppState ] = useState( AppObj );

	return (
		<AppStateContent.Provider value={ { appState, setAppState } }>
			{ children }
		</AppStateContent.Provider>
	);
};
