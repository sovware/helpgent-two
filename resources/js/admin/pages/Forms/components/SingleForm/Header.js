import { Link } from 'react-router-dom';
import ReactSVG from 'react-inlinesvg';
import arrowSmall from '../../../../../../../assets/svg/icon/arrow-small-left.svg';
import pencilDash from '../../../../../../../assets/svg/icon/pencil-dash.svg';
import { HeaderStyle } from './style';

export default function Header() {
	return (
		<HeaderStyle className="helpgent-single-form-header">
			<div className="helpgent-single-form-header__left">
				<Link className="helpgent-single-form-header__back-link">
					<ReactSVG src={ arrowSmall } /> All Forms
				</Link>
				<span className="helpgent-single-form-header__title">
					<ReactSVG src={ pencilDash } />
					You are editing the <strong>Customer Support</strong> form
				</span>
			</div>
			<div className="helpgent-single-form-header__middle">
				<ul className="helpgent-single-form-header__tab">
					<li>
						<Link className="helpgent-single-form-header__tab-link">
							Editor
						</Link>
					</li>
					<li>
						<Link className="helpgent-single-form-header__tab-link">
							Settings
						</Link>
					</li>
				</ul>
			</div>
			<div className="helpgent-single-form-header__right">
				<div className="helpgent-single-form-header__action">
					<button className="helpgent-btn helpgent-btn-light">
						Preview
					</button>
					<button className="helpgent-btn helpgent-btn-primary">
						Publish
					</button>
				</div>
			</div>
		</HeaderStyle>
	);
}
