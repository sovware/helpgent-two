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

import RequireField from './fieldList/requireField';
import ShowTimerField from './fieldList/ShowTimerField';
import TimeCompleteField from './fieldList/TimeCompleteField';
import ButtonTextField from './fieldList/ButtonTextField';

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

const fieldList = {
	required: RequireField,
	showTimer: ShowTimerField,
	timeComplete: TimeCompleteField,
	btnText: ButtonTextField,
};

export { iconList, fieldList };
