import { v4 as uuidv4 } from 'uuid';
import chartBar from '../../assets/svg/icon/chart-bar.svg';
import bar from '../../assets/svg/icon/bar.svg';
import hash from '../../assets/svg/icon/hash.svg';
import button from '../../assets/svg/icon/button.svg';
import upload from '../../assets/svg/icon/upload.svg';
import slider from '../../assets/svg/icon/sliders.svg';
import date from '../../assets/svg/icon/calendar-check.svg';
import star from '../../assets/svg/icon/star.svg';
import meter from '../../assets/svg/icon/meter.svg';
import marker from '../../assets/svg/icon/marker.svg';
import address from '../../assets/svg/icon/address-book.svg';
import envelope from '../../assets/svg/icon/envelope.svg';
import phone from '../../assets/svg/icon/phone-flip.svg';
import url from '../../assets/svg/icon/link-alt.svg';
import openEnded from '../../assets/svg/icon/open-ended.svg';
import horizontalBar from '../../assets/svg/icon/chart-simple-horizontal.svg';
import video from '../../assets/svg/icon/video.svg';
import comment from '../../assets/svg/icon/comment.svg';
import scrubber from '../../assets/svg/icon/scrubber.svg';
import checkbox from '../../assets/svg/icon/checkbox.svg';
import angleCircle from '../../assets/svg/icon/angle-circle.svg';
import toggle from '../../assets/svg/icon/toggle.svg';
import picture from '../../assets/svg/icon/picture.svg';
import arrowSquareRight from '../../assets/svg/icon/arrow-square-right.svg';
import arrowSquareLeft from '../../assets/svg/icon/arrow-square-left.svg';

const allForms = {
	questions: [
		{
			id: uuidv4(),
			title: 'Welcome',
			screen_type: 'welcome',
			icon: arrowSquareRight,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
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
			icon: arrowSquareLeft,
			isPro: false,
			isComing: false,
			position: { x: -150, y: 0 },
			fields: [
				/* Text Field */
				{
					id: uuidv4(), //string
					type: 'text', // elementor, gutenburg, shortcode
					elements: [
						{ greeting_text: '' },
						{ description: '' },
						{ is_required: '0' },
						{ is_show_timer: '0' },
						{ time_in_mins: '' },
						{ is_time_to_complete: '0' },
						{ button_text: 'Submit' },
					],
					allowedRules: [],
					fieldDesign: [
						{
							textStyle: [
								{ font_family: '' },
								{ font_size: '' },
								{ font_weight: '' },
								{ text_color: '' },
							],
						},
						{
							buttonStyle: [
								{ button_color: '' },
								{ button_radius: '' },
								{ text_color: '' },
								{ font_size: '' },
							],
						},
						{
							mediaStyle: [
								{ is_video_overlay: '0' },
								{ overlay_color: '' },
								{ overlay_opacity: '' },
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
	],
};

//apply filter

const screens = [
	{
		id: uuidv4(),
		title: 'Long text',
		screen_type: 'long-text',
		icon: chartBar,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: bar,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: hash,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: button,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: upload,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: slider,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: date,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: star,
		isPro: true,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		title: 'Likert Scale (0-10)',
		screen_type: 'likert',
		icon: meter,
		isPro: true,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: marker,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: address,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: envelope,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: phone,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		screen_type: 'website',
		icon: url,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: openEnded,
		isPro: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: horizontalBar,
		isPro: true,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: video,
		isPro: false,
		isComing: true,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: comment,
		isPro: false,
		isComing: true,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: scrubber,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: checkbox,
		isPro: true,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: angleCircle,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: toggle,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: picture,
		isPro: true,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: arrowSquareRight,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
		icon: arrowSquareLeft,
		isPro: false,
		isComing: false,
		position: { x: -150, y: 0 },
		fields: [
			/* Text Field */
			{
				id: uuidv4(), //string
				type: 'text', // elementor, gutenburg, shortcode
				elements: [
					{ greeting_text: '' },
					{ description: '' },
					{ is_required: '0' },
					{ is_show_timer: '0' },
					{ time_in_mins: '' },
					{ is_time_to_complete: '0' },
					{ button_text: 'Submit' },
				],
				allowedRules: [],
				fieldDesign: [
					{
						textStyle: [
							{ font_family: '' },
							{ font_size: '' },
							{ font_weight: '' },
							{ text_color: '' },
						],
					},
					{
						buttonStyle: [
							{ button_color: '' },
							{ button_radius: '' },
							{ text_color: '' },
							{ font_size: '' },
						],
					},
					{
						mediaStyle: [
							{ is_video_overlay: '0' },
							{ overlay_color: '' },
							{ overlay_opacity: '' },
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
];

export { allForms, screens };
