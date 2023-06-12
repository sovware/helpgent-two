import { useEffect } from '@wordpress/element';
import useStore from '../../../hooks/useStore';
import { Link } from 'react-router-dom';
import Header from './components/SingleForm/Header';
import MainContent from './components/SingleForm/MainContent';
import { allForms } from '../../../constants';
import { SingleFormStyle } from './components/style.js';

function SingleForm() {
	const { setStoreData, getStoreData } = useStore();
	setStoreData( ['helpgent-single-form'], allForms)

	return (
		<SingleFormStyle>
			<Header />
			<MainContent />
		</SingleFormStyle>
	);
}

export default SingleForm;
