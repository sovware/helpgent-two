import { createContext, useContext, useState } from '@wordpress/element';
const FormAppStateContent = createContext();

export const useFormAppState = () => useContext( FormAppStateContent );

export const FormAppStateProvider = ( { children } ) => {
	const formAppObj = {
		formInputTitle: '',
		layoutMode: 'mediaLeft',
	};
	const [ formAppState, setFormAppState ] = useState( formAppObj );

	return (
		<FormAppStateContent.Provider
			value={ { formAppState, setFormAppState } }
		>
			{ children }
		</FormAppStateContent.Provider>
	);
};
