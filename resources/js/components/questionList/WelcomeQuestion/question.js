import { v4 as uuidv4 } from 'uuid';
import WelcomeQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'Welcome',
	screen_type: 'welcome',
	icon: 'arrowSquareRight',
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
					key: 'greeting-text',
					greeting_text: '',
				},
				{
					key: 'description',
					label: '',
				},
				{
					key: 'show-timer',
					is_show_timer: '0',
				},
				{
					key: 'time-mins',
					time_in_mins: '',
				},
				{
					key: 'time-complete',
					is_time_to_complete: '0',
				},
				{
					key: 'btn-text',
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
	groupName: 'initial',
	medias: [],
	layout: 'content-right',
};

export default question;
