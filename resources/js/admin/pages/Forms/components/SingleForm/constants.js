import ReactSVG from 'react-inlinesvg';
import WelcomeQuestion from './previewList.js/WelcomeQuestion';
import LongTextQuestion from './previewList.js/LongTextQuestion';
import ShortTextQuestion from './previewList.js/ShortTextQuestion';
import NumberQuestion from './previewList.js/NumberQuestion';
import ButtonQuestion from './previewList.js/ButtonQuestion';
import FileQuestion from './previewList.js/FileQuestion';
import EmailQuestion from './previewList.js/EmailQuestion';
import UrlQuestion from './previewList.js/UrlQuestion';
import SliderQuestion from './previewList.js/SliderQuestion';
import DateQuestion from './previewList.js/DateQuestion';
import EndQuestion from './previewList.js/EndQuestion';

import facebook from '@icon/facebook.svg';
import twitter from '@icon/twitter.svg';
import youtube from '@icon/youtube.svg';
import instagram from '@icon/instagram.svg';

const PreviewComponents = {
	welcome: WelcomeQuestion,
	'long-text': LongTextQuestion,
	'short-text': ShortTextQuestion,
	number: NumberQuestion,
	button: ButtonQuestion,
	upload: FileQuestion,
	email: EmailQuestion,
	url: UrlQuestion,
	slider: SliderQuestion,
	date: DateQuestion,
	end: EndQuestion,
};

const socialIcons = {
	facebook: <ReactSVG src={ facebook } />,
	twitter: <ReactSVG src={ twitter } />,
	youtube: <ReactSVG src={ youtube } />,
	instagram: <ReactSVG src={ instagram } />,
};

export { PreviewComponents, socialIcons };
