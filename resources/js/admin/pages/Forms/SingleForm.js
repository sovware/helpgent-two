import { Link } from 'react-router-dom';
import Header from './components/SingleForm/Header';
import MainContent from './components/SingleForm/MainContent';
import { SingleFormStyle } from './components/style.js';

function SingleForm() {
	return (
		<SingleFormStyle>
			<Header />
			<MainContent />
		</SingleFormStyle>
	);
}

export default SingleForm;
