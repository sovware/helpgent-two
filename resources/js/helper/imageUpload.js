export function __( text, context ) {
	let translations = ( wpWaxCustomerSupportApp_CoreScriptData.__ && typeof wpWaxCustomerSupportApp_CoreScriptData.__ === 'object' ) ? wpWaxCustomerSupportApp_CoreScriptData.__ : {};
	let translation = ( translations.hasOwnProperty(text) ) ? translations[ text ] : text;

	if ( context ) {
		translation = ( translations.hasOwnProperty(context) && translations[ context ] ) ? translations[ context ] : translation;
	}

	return translation;
}