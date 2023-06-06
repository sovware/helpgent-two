export default async function handleCreateForm( form, createFormMutation ) {
	// const screenData = {
	// 	screens:[
	// 		{
	// 			id: "1",
	// 			index: "1",
	// 			title: "Welcome Screen",
	// 			position: { x: -150, y: 0 },
	// 			fields: [
	// 			  /* Text Field */
	// 			  {
	// 				id: "1", //string
	// 				type: "text", // elementor, gutenburg, shortcode
	// 				label: "Graduation", //string
	// 				description: "",
	// 				maxLength: "",
	// 				inputMask: false,
	// 				inputMaskValue: "", //string
	// 				inputMaskIsCustom: false,
	// 				rules: [
	// 				  isRequired,
	// 				  isString,
	// 				  noDuplicates
	// 				],
	// 				value: "", //string
	// 				placeholder: "", //string
	// 				fieldSize: "large", // large, medium, small
	// 				descriptionPlacement: "",
	// 				confirmationField: true,
	// 				autoComplete: true,
	// 				autoCompleteAttribute: "",
	// 				visibility: "visible", //visible,hidden,Administrative(ref: gravity form)
	// 				defaultValue: "", //string
	// 				labelVisibility: "",
	// 				customClass: "",
	// 				validationMessage: ""
	// 			  }
	// 			],
	// 			medias: [
	// 				// {
	// 				// 	id: "1",
	// 				// 	type: "video",
	// 				// 	src: ""
	// 				// }
	// 			]
	// 		},
	// 		{
	// 			id: "2",
	// 			position: { x: -150, y: 0 },
	// 			fields: [
	// 			  {
	// 				id: "1",
	// 				label: "Graduation",
	// 				type: "input", //elementor,gutenburg,shortcode
	// 				value: "",
	// 				placeholder: "",
	// 			  }
	// 			]
	// 		}
	// 	]
	// }
	console.log( createFormMutation );
	const formData = {
		status: 'draft',
		content: {},
	};
	formData.title = form.title;
	formData.available_pages = form.available_pages;
	formData.displayChatBubble = form.displayChatBubble;
	console.log( formData );
	try {
		const createFormResponse = await createFormMutation( formData );
		console.log( createFormResponse );
	} catch ( error ) {
		console.log( error );
	}

	// mutate( formData, {
	// 	onError: ( error ) => {
	// 		setServerErrors( error.messages );
	// 	},
	// } );
}
