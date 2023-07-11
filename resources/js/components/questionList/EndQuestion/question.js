import { v4 as uuidv4 } from 'uuid';
import EndQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'End',
	screen_type: 'end',
	icon: 'arrowSquareLeft',
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
					label: '',
				},
				{
					key: 'description',
					description: '',
				},
			],
			socials: [ 'facebook', 'twitter', 'youtube', 'instagram' ],
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
			externalButton: {
				isActive: true,
				buttonText: 'Try for Free',
				buttonUrl: 'https://wpwax.com',
			},
		},
	],
	groupName: 'initial',
	medias: [],
	layout: 'content-right',
};

export default question;
