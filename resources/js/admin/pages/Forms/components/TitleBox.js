import { TitleBoxStyle } from './style.js';

function TitleBox() {
	return (
		<TitleBoxStyle className="helpgent-titlebox">
			<div className="helpgent-titlebox__data">
				<span className="helpgent-titlebox__name helpgent-show"></span>
				<div className="helpgent-titlebox__editor">
					<input type="text" name="helpgent-title-input" />
				</div>
			</div>
			<div className="helpgent-titlebox__actions">
				<a href="" className="helpgent-titlebox__actions-cancel">
					<span className="dashicons dashicons-no"></span>
				</a>
				<a href="" className="helpgent-titlebox__actions-yes">
					<span className="dashicons dashicons-yes"></span>
				</a>
				<a href="" className="helpgent-titlebox__actions-edit">
					<span className="dashicons dashicons-edit"></span>
				</a>
			</div>
		</TitleBoxStyle>
	);
}

export default TitleBox;
