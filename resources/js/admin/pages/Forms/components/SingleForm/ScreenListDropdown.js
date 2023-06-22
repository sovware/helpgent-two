import { useState } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import ScreenListType from './ScreenListType.js';
import { questions } from '../../../../../constants.js';
import search from '../../../../../../../assets/svg/icon/search.svg';
import { ScreenItemStyle, MegaDropdownStyle } from './style.js';

export default function ScreenListDropdown( {
	singleForm,
	setSingleForm,
	isOpenMegaDropdown,
} ) {
	const [ screenList, setScreenList ] = useState( questions );

	function handleScreenSearch( e ) {
		const query = e.target.value;
		if ( e.target.value.trim() === '' ) {
			setScreenList( questions );
			return;
		}

		const filteredScreenTypes = screenList.filter( ( screen ) =>
			screen.title.toLowerCase().includes( query.toLowerCase() )
		);

		setScreenList( filteredScreenTypes );
	}

	function getQuestionType( groupName ) {
		const filteredByGroup = screenList.filter(
			( item ) => item.groupName === groupName
		);
		return (
			<ScreenListType
				singleForm={ singleForm }
				setSingleForm={ setSingleForm }
				type={ groupName }
				screenList={ filteredByGroup }
			/>
		);
	}

	return (
		isOpenMegaDropdown && (
			<MegaDropdownStyle className="helpgent-mega-dropdown">
				<div className="helpgent-mega-dropdown__search">
					<span className="helpgent-mega-dropdown__search-icon">
						<ReactSVG src={ search } />
					</span>
					<input
						type="text"
						name="helpgent-screen-search"
						placeholder="Find a question type"
						onChange={ ( e ) => handleScreenSearch( e ) }
					/>
				</div>
				<div className="helpgent-mega-dropdown__content">
					<h3 className="helpgent-mega-dropdown__title">
						All question types
					</h3>

					<div className="helpgent-screen-type-wrap">
						<div className="helpgent-screen-type-column">
							{ getQuestionType( 'basic' ) }
							{ getQuestionType( 'rating' ) }
						</div>
						<div className="helpgent-screen-type-column">
							{ getQuestionType( 'contact' ) }
							{ getQuestionType( 'answer' ) }
						</div>
						<div className="helpgent-screen-type-column">
							{ getQuestionType( 'choices' ) }
							{ getQuestionType( 'initial' ) }
						</div>
					</div>
				</div>
			</MegaDropdownStyle>
		)
	);
}
