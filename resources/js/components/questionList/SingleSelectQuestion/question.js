import { v4 as uuidv4 } from 'uuid';
import SingleSelectQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'Single-select',
	screen_type: 'single-select',
	icon: 'scrubber',
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
					text: '',
				},
				{
					key: 'description',
					text: '',
				},
				{
					key: 'option',
					options: [
						{
							id: uuidv4(), //string
							label: 'Choose option 1',
							isSelected: true,
						},
						{
							id: uuidv4(), //string
							label: 'Choose option 2',
							isSelected: false,
						},
						{
							id: uuidv4(), //string
							label: 'Choose option 3',
							isSelected: false,
						},
						{
							id: uuidv4(), //string
							label: 'Choose option 4',
							isSelected: false,
						},
					],
				},
				{
					key: 'required',
					is_required: '0',
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
	groupName: 'choices',
	medias: [],
	layout: 'content-right',
};

export default question;
