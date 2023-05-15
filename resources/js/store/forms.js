export const formsReducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_FORMS':
			return [ ...action.payload ];
	}

	return state;
};

export const formsActions = {
	setForms( data ) {
		return {
			type: 'SET_FORMS',
			payload: data,
		};
	},
};

export const formsSelectors = {
	getForms( { formsReducer } ) {
		return formsReducer;
	},
};
