import { v4 as uuidv4 } from 'uuid';
import AddressQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'Address',
	screen_type: 'address',
	icon: 'marker',
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
					key: 'placeholder',
					text: '',
				},
				{
					key: 'address-group',
					fields: [
						{
							label: 'Address',
							text: '',
							isRequired: true,
							isVisible: true,
						},
						{
							label: 'Address line 2',
							text: '',
							isRequired: true,
							isVisible: true,
						},
						{
							label: 'City',
							text: '',
							isRequired: true,
							isVisible: true,
						},
						{
							label: 'State/Region',
							text: '',
							isRequired: true,
							isVisible: true,
						},
						{
							label: 'Zip/Post code',
							text: '',
							isRequired: true,
							isVisible: true,
						},
						{
							label: 'Country',
							text: '',
							isRequired: true,
							isVisible: true,
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
	groupName: 'contact',
	medias: [],
	layout: 'content-right',
};

export default question;
