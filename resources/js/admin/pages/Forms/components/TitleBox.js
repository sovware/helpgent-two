import { useState } from '@wordpress/element';
import { useFormAppState } from '../context/FormAppStateContext';
import ReactSVG from 'react-inlinesvg';
import useStore from '@hooks/useStore.js';
import { TitleBoxStyle } from './style.js';
import times from '@icon/times.svg';
import check from '@icon/check.svg';

function titleBox( props ) {
	const { isEditModeActive, setEditModeStatus, form } = props;
	const { title } = form;
	const { formAppState, setFormAppState } = useFormAppState();

	function handleCancelEditMode() {
		setEditModeStatus( false );
	}

	function handleChangeFormTitle( e ) {
		setFormAppState( {
			...formAppState,
			formInputTitle: e.target.value,
		} );
	}

	function handleRenameFormTitle() {}

	return (
		<TitleBoxStyle className="helpgent-titleBox">
			<div className="helpgent-titleBox__data">
				{ isEditModeActive ? (
					<div className="helpgent-titleBox__editor">
						<input
							type="text"
							name="helpgent-title-input"
							value={ formAppState.formInputTitle }
							onChange={ handleChangeFormTitle }
						/>
					</div>
				) : (
					<div className="helpgent-titleBox__content helpgent-show">
						<div className="helpgent-titleBox-media"></div>
						<div className="helpgent-titleBox-text">
							<span className="helpgent-title">{ title }</span>
							<ul className="helpgent-titleBox-meta">
								<li className="helpgent-titleBox-meta__id">
									ID #20
								</li>
								<li className="helpgent-titleBox-meta__date">
									Created: May 29, 2023
								</li>
							</ul>
						</div>
					</div>
				) }
			</div>
			{ isEditModeActive && (
				<div className="helpgent-titleBox__actions">
					<span
						className="helpgent-titleBox-action-item helpgent-titleBox__actions-cancel"
						onClick={ handleCancelEditMode }
					>
						<ReactSVG src={ times } />
					</span>
					<span
						className="helpgent-titleBox-action-item helpgent-titleBox__actions-yes"
						onClick={ handleRenameFormTitle }
					>
						<ReactSVG src={ check } />
					</span>
				</div>
			) }
		</TitleBoxStyle>
	);
}

export default titleBox;
