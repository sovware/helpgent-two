export default function getFormTableHead() {
	return (
		<tr>
			<th className="helpgent-head-name">Name</th>
			<th className="helpgent-head-shortCode">ShortCode</th>
			<th className="helpgent-head-response">Responses</th>
			<th className="helpgent-head-created">Updated</th>
			<th className="helpgent-head-status">Status</th>
			<th className="helpgent-head-action">Action</th>
		</tr>
	);
}
