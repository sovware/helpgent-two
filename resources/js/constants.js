import { v4 as uuidv4 } from 'uuid';

const screenData = {
	screens: [
		{
			id: uuidv4(),
			title: 'Welcome Screen',
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
			medias: [],
			layout: 'content-right',
		},
		{
			id: uuidv4(),
			title: 'End Screen',
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
			medias: [],
			layout: 'content-right',
		},
	],
};

const screenTypes = {
	basic: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
	ratingRanking: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
	contact: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
	answers: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
	choices: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
	initialScreen: {
		screens: [
			{
				id: uuidv4(),
				title: 'Welcome Screen',
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
				medias: [],
				layout: 'content-right',
			},
			{
				id: uuidv4(),
				title: 'End Screen',
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
				medias: [],
				layout: 'content-right',
			},
		],
	},
};

export { screenData, screenTypes };
