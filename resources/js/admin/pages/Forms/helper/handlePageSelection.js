export default function handlePageSelection(
	selectEvent,
	setSelectedPages,
	selected,
	setValue
) {
	setSelectedPages( selectEvent );
	setValue( 'available_pages', selectEvent );
}
