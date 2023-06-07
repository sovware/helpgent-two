export default function handlePageSelection( setSelectedPages, selected, setValue ) {
    setSelectedPages( selected );
    setValue( 'available_pages', selected );
}