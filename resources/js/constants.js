import ReactSVG from 'react-inlinesvg';
import { v4 as uuidv4 } from 'uuid';

import facebook from '@icon/facebook.svg';
import twitter from '@icon/twitter.svg';
import youtube from '@icon/youtube.svg';
import instagram from '@icon/instagram.svg';

/* Import Screens  */
import WelcomeQuestion from '@components/questionList/WelcomeQuestion';
import LongTextQuestion from '@components/questionList/LongTextQuestion';
import ShortTextQuestion from '@components/questionList/ShortTextQuestion';
import NumberQuestion from '@components/questionList/NumberQuestion';
import ButtonQuestion from '@components/questionList/ButtonQuestion';
import FileQuestion from '@components/questionList/FileQuestion';
import EmailQuestion from '@components/questionList/EmailQuestion';
import UrlQuestion from '@components/questionList/UrlQuestion';
import SliderQuestion from '@components/questionList/SliderQuestion';
import DateQuestion from '@components/questionList/DateQuestion';
import AddressQuestion from '@components/questionList/AddressQuestion';
import ResultQuestion from '@components/questionList/ResultQuestion';
import ScoreQuestion from '@components/questionList/ScoreQuestion';
import SingleSelectQuestion from '@components/questionList/SingleSelectQuestion';
import MultiSelectQuestion from '@components/questionList/MultiSelectQuestions';
import DropdownQuestion from '@components/questionList/DropdownQuestion';
import PhoneNumberQuestion from '@components/questionList/PhoneNumberQuestion';
import EndQuestion from '@components/questionList/EndQuestion';
import ContactQuestion from '@components/questionList/ContactQuestion';
import OpenEndedQuestion from '@components/questionList/OpenEndedQuestion';
import PictureSelectQuestion from '@components/questionList/PictureSelectQuestion';
import RatingQuestion from '@components/questionList/RatingQuestion';
import YesNoQuestion from '@components/questionList/YesNoQuestion';

import AddressQuestionObj from '@components/questionList/AddressQuestion/question.js';
import ButtonQuestionObj from '@components/questionList/ButtonQuestion/question.js';
import DateQuestionObj from '@components/questionList/DateQuestion/question.js';
import DropdownQuestionObj from '@components/questionList/DropdownQuestion/question.js';
import EmailQuestionObj from '@components/questionList/EmailQuestion/question.js';
import EndQuestionObj from '@components/questionList/EndQuestion/question.js';
import FileQuestionObj from '@components/questionList/FileQuestion/question.js';
import LongTextQuestionObj from '@components/questionList/LongTextQuestion/question.js';
import MultiSelectQuestionObj from '@components/questionList/MultiSelectQuestions/question.js';
import NumberQuestionObj from '@components/questionList/NumberQuestion/question.js';
import PhoneNumberQuestionObj from '@components/questionList/PhoneNumberQuestion/question.js';
import ResultQuestionObj from '@components/questionList/ResultQuestion/question.js';
import ScoreQuestionObj from '@components/questionList/ScoreQuestion/question.js';
import ShortTextQuestionObj from '@components/questionList/ShortTextQuestion/question.js';
import SingleSelectQuestionObj from '@components/questionList/SingleSelectQuestion/question.js';
import SliderQuestionObj from '@components/questionList/SliderQuestion/question.js';
import UrlQuestionObj from '@components/questionList/UrlQuestion/question.js';
import WelcomeQuestionObj from '@components/questionList/WelcomeQuestion/question.js';
import ContactQuestionObj from '@components/questionList/ContactQuestion/question.js';
import OpenEndedQuestionObj from '@components/questionList/OpenEndedQuestion/question.js';
import PictureSelectQuestionObj from '@components/questionList/PictureSelectQuestion/question.js';
import RatingQuestionObj from '@components/questionList/RatingQuestion/question.js';
import YesNoQuestionObj from '@components/questionList/YesNoQuestion/question.js';

/* Register */
const previewComponents = {
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
	address: AddressQuestion,
	result: ResultQuestion,
	score: ScoreQuestion,
	'single-select': SingleSelectQuestion,
	'multi-select': MultiSelectQuestion,
	dropdown: DropdownQuestion,
	phone: PhoneNumberQuestion,
	end: EndQuestion,
	contact: ContactQuestion,
	'open-ended': OpenEndedQuestion,
	'picture-select': PictureSelectQuestion,
	rating: RatingQuestion,
	'yes-no': YesNoQuestion,
};

/* question Array */
const questions = [
	AddressQuestionObj,
	ButtonQuestionObj,
	DateQuestionObj,
	DropdownQuestionObj,
	EmailQuestionObj,
	EndQuestionObj,
	FileQuestionObj,
	LongTextQuestionObj,
	MultiSelectQuestionObj,
	NumberQuestionObj,
	PhoneNumberQuestionObj,
	ResultQuestionObj,
	ScoreQuestionObj,
	ShortTextQuestionObj,
	SingleSelectQuestionObj,
	SliderQuestionObj,
	UrlQuestionObj,
	WelcomeQuestionObj,
	ContactQuestionObj,
	OpenEndedQuestionObj,
	PictureSelectQuestionObj,
	RatingQuestionObj,
	YesNoQuestionObj,
];

const initialQuestions = questions.filter(
	( item ) => item.screen_type === 'welcome' || item.screen_type === 'end'
);
const filteredEndScreen = questions.filter(
	( item ) => item.screen_type === 'end'
);
const endQuestion = filteredEndScreen[ 0 ];

const socialIcons = {
	facebook: <ReactSVG src={ facebook } />,
	twitter: <ReactSVG src={ twitter } />,
	youtube: <ReactSVG src={ youtube } />,
	instagram: <ReactSVG src={ instagram } />,
};

export {
	previewComponents,
	endQuestion,
	questions,
	initialQuestions,
	socialIcons,
};
