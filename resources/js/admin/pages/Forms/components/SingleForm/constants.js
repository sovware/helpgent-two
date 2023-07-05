/* Import Screens  */
import WelcomeQuestion from '@components/questionList/WelcomeQuestion.js';
import LongTextQuestion from '@components/questionList/LongTextQuestion.js';
import ShortTextQuestion from '@components/questionList/ShortTextQuestion.js';
import NumberQuestion from '@components/questionList/NumberQuestion.js';
import ButtonQuestion from '@components/questionList/ButtonQuestion.js';
import FileQuestion from '@components/questionList/FileQuestion.js';
import EmailQuestion from '@components/questionList/EmailQuestion.js';
import UrlQuestion from '@components/questionList/UrlQuestion.js';
import SliderQuestion from '@components/questionList/SliderQuestion.js';
import DateQuestion from '@components/questionList/DateQuestion.js';
import AddressQuestion from '@components/questionList/AddressQuestion.js';
import ResultQuestion from '@components/questionList/ResultQuestion.js';
import ScoreQuestion from '@components/questionList/ScoreQuestion.js';
import SingleSelectQuestion from '@components/questionList/SingleSelectQuestion';
import MultiSelectQuestion from '@components/questionList/MultiSelectQuestions';
import DropdownQuestion from '@components/questionList/DropdownQuestion';
import PhoneNumberQuestion from '@components/questionList/PhoneNumberQuestion';
import EndQuestion from '@components/questionList/EndQuestion.js';

/* Import Svg icons */
import chartBar from '@icon/chart-bar.svg';
import bar from '@icon/bar.svg';
import hash from '@icon/hash.svg';
import button from '@icon/button.svg';
import upload from '@icon/upload.svg';
import slider from '@icon/sliders.svg';
import date from '@icon/calendar-check.svg';
import star from '@icon/star.svg';
import meter from '@icon/meter.svg';
import marker from '@icon/marker.svg';
import address from '@icon/address-book.svg';
import envelope from '@icon/envelope.svg';
import phone from '@icon/phone-flip.svg';
import url from '@icon/link-alt.svg';
import openEnded from '@icon/open-ended.svg';
import horizontalBar from '@icon/chart-simple-horizontal.svg';
import video from '@icon/video.svg';
import comment from '@icon/comment.svg';
import scrubber from '@icon/scrubber.svg';
import checkbox from '@icon/checkbox.svg';
import angleCircle from '@icon/angle-circle.svg';
import toggle from '@icon/toggle.svg';
import picture from '@icon/picture.svg';
import arrowSquareRight from '@icon/arrow-square-right.svg';
import arrowSquareLeft from '@icon/arrow-square-left.svg';

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
	address: AddressQuestion,
	result: ResultQuestion,
	score: ScoreQuestion,
	'single-select': SingleSelectQuestion,
	'multi-select': MultiSelectQuestion,
	dropdown: DropdownQuestion,
	phone: PhoneNumberQuestion,
	end: EndQuestion,
};

const iconList = {
	chartBar: chartBar,
	bar: bar,
	hash: hash,
	button: button,
	upload: upload,
	slider: slider,
	date: date,
	star: star,
	meter: meter,
	marker: marker,
	address: address,
	envelope: envelope,
	phone: phone,
	url: url,
	openEnded: openEnded,
	horizontalBar: horizontalBar,
	video: video,
	comment: comment,
	scrubber: scrubber,
	checkbox: checkbox,
	angleCircle: angleCircle,
	toggle: toggle,
	picture: picture,
	arrowSquareRight: arrowSquareRight,
	arrowSquareLeft: arrowSquareLeft,
};

export { PreviewComponents, iconList };
