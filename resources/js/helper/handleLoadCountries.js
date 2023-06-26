import countries from '../data/countries.js';

export default async function handleLoadCountries( inputValue ) {
	console.log( inputValue );
	const availableCountries = countries.filter( ( country ) =>
		country.name.toLowerCase().includes( inputValue.toLowerCase() )
	);

	return availableCountries.map( ( { name, code } ) => ( {
		value: code,
		label: name,
	} ) );
}
