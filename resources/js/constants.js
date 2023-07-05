import ReactSVG from 'react-inlinesvg';
import { v4 as uuidv4 } from 'uuid';

import facebook from '@icon/facebook.svg';
import twitter from '@icon/twitter.svg';
import youtube from '@icon/youtube.svg';
import instagram from '@icon/instagram.svg';

//apply filter

const questions = [
	{
		id: uuidv4(),
		title: 'Long text',
		screen_type: 'long-text',
		icon: 'chartBar',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'basic',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Short text',
		screen_type: 'short-text',
		icon: 'bar',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'basic',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Number',
		screen_type: 'number',
		icon: 'hash',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'basic',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Button',
		screen_type: 'button',
		icon: 'button',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'basic',
		medias: [],
		layout: 'content-right',
	},
	{
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
	},
	{
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
	},
	{
		id: uuidv4(),
		title: 'Date',
		screen_type: 'date',
		icon: 'date',
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
						key: 'format',
						dataFormat: 'MM-DD-YYYY',
					},
					{
						key: 'separator',
						sign: '-',
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
	},
	{
		id: uuidv4(),
		title: 'Rating (Stars)',
		screen_type: 'rating',
		icon: 'star',
		isPro: true,
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
						key: 'required',
						is_required: '0',
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
		groupName: 'rating',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Promoter score',
		screen_type: 'score',
		icon: 'meter',
		isPro: true,
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
						key: 'format',
						dataFormat: 'MM-DD-YYYY',
					},
					{
						key: 'separator',
						sign: '-',
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
		groupName: 'rating',
		medias: [],
		layout: 'content-right',
	},
	{
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
	},
	{
		id: uuidv4(),
		title: 'Contact info',
		screen_type: 'contact',
		icon: 'address',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'contact',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Email',
		screen_type: 'email',
		icon: 'envelope',
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
	},
	{
		id: uuidv4(),
		title: 'Phone number',
		screen_type: 'phone',
		icon: 'phone',
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
						key: 'default_country',
						text: '',
					},
					{
						key: 'placeholder',
						text: '',
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
	},
	{
		id: uuidv4(),
		title: 'Website',
		screen_type: 'url',
		icon: 'url',
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
	},
	{
		id: uuidv4(),
		title: 'Open Ended',
		screen_type: 'open-ended',
		icon: 'openEnded',
		isPro: false,
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
						key: 'required',
						is_required: '0',
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
		groupName: 'answer',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Results',
		screen_type: 'result',
		icon: 'horizontalBar',
		isPro: true,
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
		groupName: 'answer',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Live call',
		screen_type: 'live-call',
		icon: 'video',
		isPro: false,
		isComing: true,
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
						key: 'required',
						is_required: '0',
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
		groupName: 'answer',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Live chat',
		screen_type: 'live-chat',
		icon: 'comment',
		isPro: false,
		isComing: true,
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
						key: 'required',
						is_required: '0',
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
		groupName: 'answer',
		medias: [],
		layout: 'content-right',
	},
	{
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
	},
	{
		id: uuidv4(),
		title: 'Multi-select',
		screen_type: 'multi-select',
		icon: 'checkbox',
		isPro: true,
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
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 2',
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 3',
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 4',
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
	},
	{
		id: uuidv4(),
		title: 'Dropdown',
		screen_type: 'dropdown',
		icon: 'angleCircle',
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
								value: 'option-1',
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 2',
								value: 'option-1',
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 3',
								value: 'option-1',
							},
							{
								id: uuidv4(), //string
								label: 'Choose option 4',
								value: 'option-1',
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
	},
	{
		id: uuidv4(),
		title: 'Yes/No',
		screen_type: 'yes-no',
		icon: 'toggle',
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
						key: 'required',
						is_required: '0',
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
		groupName: 'choices',
		medias: [],
		layout: 'content-right',
	},
	{
		id: uuidv4(),
		title: 'Picture select',
		screen_type: 'picture-select',
		icon: 'picture',
		isPro: true,
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
						key: 'required',
						is_required: '0',
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
		groupName: 'choices',
		medias: [],
		layout: 'content-right',
	},
	{
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
						key: 'required',
						is_required: '0',
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
	},
	{
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
	},
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

export { endQuestion, questions, initialQuestions, socialIcons };
