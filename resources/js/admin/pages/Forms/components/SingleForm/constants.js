import WelcomeQuestion from './previewList.js/WelcomeQuestion';
import LongTextQuestion from './previewList.js/LongTextQuestion';
import ShortTextQuestion from './previewList.js/ShortTextQuestion';
import NumberQuestion from './previewList.js/NumberQuestion';
import ButtonQuestion from './previewList.js/ButtonQuestion';
import EndQuestion from './previewList.js/EndQuestion';

const PreviewComponents = {
	welcome: WelcomeQuestion,
	'long-text': LongTextQuestion,
	'short-text': ShortTextQuestion,
	number: NumberQuestion,
	button: ButtonQuestion,
	end: EndQuestion,
};

export { PreviewComponents };
