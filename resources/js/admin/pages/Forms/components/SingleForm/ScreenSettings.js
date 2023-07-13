import { useState, useEffect } from '@wordpress/element';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import SettingQuestion from './SettingQuestion.js';
import { ScreenSettingsStyle } from './style.js';
export default function ScreenSettings() {
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm, activeScreenId } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const activeScreen = questions.filter(
		( item ) => item.id === activeScreenId
	);
	const [ screenSettingType, setScreenSettingType ] = useState( 'question' );

	function getScreenSettingContent() {
		if ( screenSettingType === 'question' ) {
			return <SettingQuestion activeScreen={ activeScreen[ 0 ] } />;
		}
	}

	return (
		<ScreenSettingsStyle>
			<div className="helpgent-screen-setting-header">
				<ul className="helpgent-screen-setting-list">
					<li>Question</li>
					<li>Design</li>
					<li>Logic</li>
				</ul>
			</div>
			<div className="helpgent-screen-setting-content">
				{ getScreenSettingContent() }
			</div>
		</ScreenSettingsStyle>
	);
}
