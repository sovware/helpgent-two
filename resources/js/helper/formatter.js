function formatDate( formatType, date, options ) {
	const dataObject = new Date( date );
	const formattedDate = dataObject.toLocaleDateString( formatType, options );
	return formattedDate;
}

export { formatDate };
