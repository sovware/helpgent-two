export default function TableActions() {
	return (
		<div className="helpgent-table-action">
			<a href={ `/edit/id` } className="helpgent-btn helpgent-btn-light">
				{ /* <ReactSVG src={editIcon} /> */ }
				Edit
			</a>
			<a href="#" className="helpgent-btn helpgent-btn-danger">
				{ /* <ReactSVG src={trashIcon} /> */ }
				Delete
			</a>
		</div>
	);
}
