/**
 * WordPress dependencies
 */
import { createReduxStore, register, combineReducers } from '@wordpress/data';
import { formsReducer, formsActions, formsSelectors } from './forms';
import registerModule from '../module/registerModule';

const store = createReduxStore( 'helpgent-store', {
	reducer: combineReducers( { formsReducer } ),
	actions: formsActions,
	selectors: formsSelectors,
} );

// register store at window
registerModule( 'helpgent', { store } );

// register store to app
register( store );
