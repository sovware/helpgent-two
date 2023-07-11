import { v4 as uuidv4 } from 'uuid';
import SliderQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'Range slider',
	screen_type: 'slider',
	icon: 'slider',
	isPro: false,
	isComing: false,
	position: { x: -150, y: 0 },
	fields: [
		/* Text Field */
		{
			id: uuidv4(), //string
			type: 'text', // elementor, gutenburg, shortcode
			elements: [
				{
					key: 'label',
					text: 'Type your question here!*',
				},
				{
					key: 'description',
					text: 'Type a description',
				},
				{
					key: 'required',
					is_required: '0',
				},
				{
					key: 'min',
					minValue: '0',
				},
				{
					key: 'max',
					maxValue: '0',
				},
				{
					key: 'start',
					startValue: '0',
				},
				{
					key: 'action-btn',
					isActive: false,
					button_text: 'Submit',
				},
			],
			allowedRules: [],
			fieldDesign: [
				{
					labelStyle: [
						{
							key: 'font-family',
							font_family: '',
						},
						{
							key: 'font-size',
							font_size: '',
						},
						{
							key: 'font-weight',
							font_weight: '',
						},
						{
							key: 'text-color',
							text_color: '',
						},
					],
				},
				{
					buttonStyle: [
						{
							key: 'btn-color',
							button_color: '',
						},
						{
							key: 'btn-radius',
							button_radius: '',
						},
						{
							key: 'btn-text-color',
							text_color: '',
						},
						{
							key: 'font-size',
							font_size: '',
						},
					],
				},
				{
					mediaStyle: [
						{ is_video_overlay: '0' },
						{
							key: 'overlay-color',
							overlay_color: '',
						},
						{
							key: 'overlay-opacity',
							overlay_opacity: '',
						},
					],
				},
			],
			fieldLogic: [],
		},
	],
	groupName: 'basic',
	medias: [],
	layout: 'content-right',
};

export default question;
