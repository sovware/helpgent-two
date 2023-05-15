/**
 *
 * @param { string } moduleName
 * @param { Object } module
 */
export default function registerModule( moduleName, module ) {
	//check if the module already exists.
	if ( window[ moduleName ][ module ] ) {
		return;
	} else {
		window[ moduleName ] = {};

		//add all the items to the module.
		for ( let itemName of Object.keys( module ) ) {
			window[ moduleName ][ itemName ] = module[ itemName ];
		}
	}
}
