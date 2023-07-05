import { useState, useEffect } from '@wordpress/element';
import SettingQuestion from './SettingQuestion.js';
import { ScreenSettingsStyle } from './style.js';
export default function ScreenSettings( props ) {
	const { singleForm, setSingleForm, activeScreenId } = props;
	const { questions } = JSON.parse( singleForm.content );
	const activeScreen = questions.filter(
		( item ) => item.id === activeScreenId
	);
	const [ screenSettingType, setScreenSettingType ] = useState( 'question' );

	function getScreenSettingContent( props ) {
		if ( screenSettingType === 'question' ) {
			return (
				<SettingQuestion
					singleForm={ singleForm }
					setSingleForm={ setSingleForm }
					activeScreen={ activeScreen[ 0 ] }
				/>
			);
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
