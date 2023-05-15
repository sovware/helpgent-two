import store from '@helpgent/store';
import { select } from '@wordpress/data';

const core = select( 'helpgent-store' );
console.log( core.getForms() );
