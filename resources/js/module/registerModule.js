/**
 * @param { string } moduleName
 * @param { Object } module
 */
export default function registerModule( moduleName, module ) {
	for ( let itemName of Object.keys( module ) ) {
		//check if the moduleName already exists.
		if ( ! window[ moduleName ] ) {
			window[ moduleName ] = {};
			window[ moduleName ][ itemName ] = module[ itemName ];
		} else {
			//check if the module already exists.
			if ( ! window[ moduleName ][ itemName ] ) {
				window[ moduleName ][ itemName ] = module[ itemName ];
			}
		}
	}
}
