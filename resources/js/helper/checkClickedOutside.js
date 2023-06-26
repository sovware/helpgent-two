export default function checkedClickedOutside(
	isOpenDropdown,
	setDropdown,
	ref
) {
	const checkIfClickedOutside = ( e ) => {
		if (
			isOpenDropdown &&
			ref.current &&
			! ref.current.contains( e.target )
		) {
			setDropdown( false );
		}
	};
	document.addEventListener( 'mousedown', checkIfClickedOutside );
	return () => {
		// Cleanup the event listener
		document.removeEventListener( 'mousedown', checkIfClickedOutside );
	};
}
