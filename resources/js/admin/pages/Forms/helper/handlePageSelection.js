export default function handlePageSelection(
	selectEvent,
	setSelectedPages,
	selected,
	setValue
) {
	console.log( selectEvent );
	setSelectedPages( selectEvent );
	setValue( 'available_pages', selectEvent );
}
