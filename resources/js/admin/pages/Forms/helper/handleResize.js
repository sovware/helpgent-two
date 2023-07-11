export default function handleResize( event, endScreenRef ) {
	let startY, startHeight;
	const minHeight = 185;
	const maxHeight = 440;
	const offsetPadding = 20;

	const handleDrag = ( e ) => {
		const generatedHeight = startHeight + startY - e.clientY;
		if ( generatedHeight >= minHeight && generatedHeight <= maxHeight ) {
			endScreenRef.current.style.height = `${ generatedHeight }px`;
		}
	};

	const stopResize = () => {
		document.documentElement.removeEventListener(
			'mousemove',
			handleDrag,
			false
		);
		document.documentElement.removeEventListener(
			'mouseup',
			stopResize,
			false
		);
	};

	startY = event.clientY;
	startHeight =
		parseInt( endScreenRef.current.getBoundingClientRect().height ) -
		offsetPadding;
	document.documentElement.addEventListener( 'mousemove', handleDrag, false );
	document.documentElement.addEventListener( 'mouseup', stopResize, false );
}
