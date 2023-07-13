import { useState, useEffect, Fragment } from '@wordpress/element';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import ScreenBar from './ScreenBar';
import Preview from './Preview.js';
import ScreenSettings from './ScreenSettings';
import { MainContentStyle } from './style';

export default function MainContent( props ) {
	const { singleFormState, setSingleFormState } = useSingleFormState();
	const { singleForm, activeScreenId } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	useEffect( () => {
		const welcomeQuestion = questions.filter(
			( item ) => item.screen_type === 'welcome'
		);
		if ( welcomeQuestion.length > 0 ) {
			setSingleFormState( {
				...singleFormState,
				activeScreenId: welcomeQuestion[ 0 ].id,
			} );
		} else {
			const endQuestions = questions.filter(
				( item ) => item.screen_type === 'end'
			);
			setSingleFormState( {
				...singleFormState,
				activeScreenId: endQuestions[ 0 ].id,
			} );
		}
	}, [] );

	return (
		<MainContentStyle>
			<ScreenBar />
			{ activeScreenId && (
				<Fragment>
					<Preview activeScreenId={ activeScreenId } />
					<ScreenSettings activeScreenId={ activeScreenId } />
				</Fragment>
			) }
		</MainContentStyle>
	);
}
