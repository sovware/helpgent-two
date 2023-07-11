import { useState, useEffect, Fragment } from '@wordpress/element';
import useStore from '@hooks/useStore';
import ScreenBar from './ScreenBar';
import Preview from './Preview.js';
import ScreenSettings from './ScreenSettings';
import { MainContentStyle } from './style';

export default function MainContent( props ) {
	const { getStoreData, setStoreData } = useStore();
	const [ activeScreenId, setActiveScreenId ] = useState( null );
	//const [ layoutMode, setLayoutMode ] = useState( 'mediaLeft' ); //mediaLeft, mediaRight, mediaBehind
	const { singleForm, setSingleForm } = props;
	const { content } = singleForm;
	const { questions } = JSON.parse( content );
	useEffect( () => {
		const welcomeQuestion = questions.filter(
			( item ) => item.screen_type === 'welcome'
		);
		if ( welcomeQuestion.length > 0 ) {
			setActiveScreenId( welcomeQuestion[ 0 ].id );
		} else {
			const endQuestions = questions.filter(
				( item ) => item.screen_type === 'end'
			);
			setActiveScreenId( endQuestions[ 0 ].id );
		}
	}, [] );

	return (
		<MainContentStyle>
			<ScreenBar
				singleForm={ singleForm }
				setSingleForm={ setSingleForm }
				activeScreenId={ activeScreenId }
				setActiveScreenId={ setActiveScreenId }
			/>
			{ activeScreenId && (
				<Fragment>
					<Preview
						singleForm={ singleForm }
						setSingleForm={ setSingleForm }
						activeScreenId={ activeScreenId }
					/>
					<ScreenSettings
						singleForm={ singleForm }
						setSingleForm={ setSingleForm }
						activeScreenId={ activeScreenId }
					/>
				</Fragment>
			) }
		</MainContentStyle>
	);
}
