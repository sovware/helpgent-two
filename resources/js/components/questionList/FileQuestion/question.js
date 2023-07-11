import { v4 as uuidv4 } from 'uuid';
import FileQuestion from './index.js';
const question = {
	id: uuidv4(),
	title: 'File Upload',
	screen_type: 'upload',
	icon: 'upload',
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
					key: 'upload-btn-text',
					upload_btn_text: 'Drop file here or click to upload',
				},
				{
					key: 'upload-note',
					upload_note: 'Max file size 10MB',
				},
				{
					key: 'file-size',
					maxSize: '3',
				},
				{
					key: 'file-count',
					maxFile: 'Submit',
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
