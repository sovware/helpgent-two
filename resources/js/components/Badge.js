export default function Badge( { type, text } ) {
	return (
		<span className={ ` helpgent-badge helpgent-badge-${ type }` }>
			{ text }
		</span>
	);
}
