import { Link } from 'react-router-dom';
import ReactSVG from 'react-inlinesvg';
import pencil from '../../../../.././../assets/svg/icon/pencil-solid.svg';
import trash from '../../../../.././../assets/svg/icon/trash-solid.svg';

export default function TableActions( { id } ) {
	return (
		<div className="helpgent-table-action">
			<Link
				to={ `/forms/${ id }` }
				className="helpgent-btn helpgent-btn-light"
			>
				{ /* <ReactSVG src={pencil} /> */ }
				Edit
			</Link>
			<Link className="helpgent-btn helpgent-btn-danger">
				{ /* <ReactSVG src={trash} /> */ }
				Delete
			</Link>
		</div>
	);
}
