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
import EndQuestion from '@components/questionList/EndQuestion.js';

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
	end: EndQuestion,
};

export { PreviewComponents };
