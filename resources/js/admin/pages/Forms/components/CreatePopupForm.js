import { useState, useEffect } from '@wordpress/element';
import { Tooltip, FormToggle } from '@wordpress/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReactSVG from 'react-inlinesvg';
import { default as ReactSelect } from 'react-select';
import dataFetcher from '../../../../lib/fetchData';
import AsyncSelect from 'react-select/async';
import Select from '../../../../components/Select.js';
import createData from '../../../../lib/createData.js';
import Option from '../helper/createSelectOptions.js';
import handleCreateForm from '../helper/handleCreateForm.js';
import useCreateMutation from '../../../../hooks/useCreateMutation.js';
import getValidationMessage from '../../../../lib/getValidationMessage.js';
import CreatePopupHeader from './CreatePopupHeader';
import { useForm } from 'react-hook-form';
import questionCircle from '../../../../../../assets/svg/icon/question-circle.svg';
import { CreateFormStyleWrap } from './style.js';
export const availablePages = [
	{ value: '01', label: 'Homepage' },
	{ value: '02', label: 'Overview' },
	{ value: '03', label: 'Dashboard' },
];
export default function CreatePopupForm() {
	const queryClient = useQueryClient();
	const [ forms, setForms ] = useState( {
		title: '',
		status: 'draft',
		content: {},
	} );

	const { title, status, content } = forms;

	const [ defaultPages, setDefaultPages ] = useState( [] );
	const [ selectedPages, setSelectedPages ] = useState( null );
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm( { mode: 'all' } );
	const [ serverErrors, setServerErrors ] = useState( {} );
	const [ displayChatBubble, setDisplayChatBubble ] = useState( false );

	const { mutateAsync: createFormMutation } = useCreateMutation(
		'/helpgent/admin/form',
		'helpgent-form',
		function ( previousData, forms ) {
			previousData.forms.push( forms );
			previousData.total = previousData.forms.length;
			queryClient.setQueryData(
				[ 'helpgent-form' ],
				( old ) => previousData
			);
		}
	);

	console.log( createFormMutation );

	function handlePageSelection( selected ) {
		setSelectedPages( selected );
		setValue( 'available_pages', selected );
	}

	const handleLoadPages = async ( inputValue ) => {
		const availablePages = await dataFetcher(
			`/helpgent/admin/page/?search=${ inputValue }`
		);

		const availableOptions = availablePages.pages.map(
			( { id, title } ) => ( {
				value: id,
				label: title,
			} )
		);

		return availableOptions;
	};

	useEffect( () => {
		const fetchDefaultPages = async () => {
			const initialPages = await handleLoadPages( '' );
			setDefaultPages( initialPages );
		};

		fetchDefaultPages();
	}, [] );

	function handleChatBubbleToggle() {
		setDisplayChatBubble( ! displayChatBubble );
		setValue( 'displayChatBubble', ! displayChatBubble );
	}

	return (
		<div className="helpgent-createPopup">
			<CreatePopupHeader title="Let’s get started" />
			<CreateFormStyleWrap>
				<form
					onSubmit={ handleSubmit( ( formData ) =>
						handleCreateForm( formData, createFormMutation )
					) }
				>
					<div className="helpgent-form-group">
						<input
							type="text"
							className="helpgent-form__element"
							name="title"
							placeholder="Form Name"
							{ ...register( 'title', {
								required: {
									value: true,
									message: 'The title field is required',
								},
								validate: {
									isOnlySpace: ( value ) => {
										const isValid =
											value.trim().length !== 0;
										return (
											isValid || 'Only spaces not allowed'
										);
									},
								},
							} ) }
						/>
						{ errors.title?.type === 'required'
							? getValidationMessage( errors.title.message )
							: serverErrors.title
							? getValidationMessage( serverErrors.title )
							: null }
						{ errors.title?.type === 'isOnlySpace'
							? getValidationMessage( errors.title.message )
							: serverErrors.title
							? getValidationMessage( serverErrors.title )
							: null }
					</div>
					<div className="helpgent-form-group">
						<div className="helpgent-form__element-inline">
							<span className="helpgent-form__label">
								Display as a chat bubble?
								<Tooltip text="More information">
									<span className="helpgent-tooltip-toggle">
										<ReactSVG src={ questionCircle } />
									</span>
								</Tooltip>
							</span>
							<div className="helpgent-toggle">
								<FormToggle
									checked={ displayChatBubble }
									onChange={ handleChatBubbleToggle }
								/>
							</div>
						</div>
					</div>
					{ displayChatBubble ? (
						<div className="helpgent-form-group">
							<label
								htmlFor="helpgent-page-select"
								className="helpgent-form__label"
							>
								Select pages
								<Tooltip text="More information">
									<span className="helpgent-tooltip-toggle">
										<ReactSVG src={ questionCircle } />
									</span>
								</Tooltip>
							</label>

							<AsyncSelect
								cacheOptions
								inputId="helpgent-page-select"
								className="helpgent-select"
								classNamePrefix="helpgent-select"
								isMulti
								isClearable={ false }
								closeMenuOnSelect={ false }
								hideSelectedOptions={ false }
								components={ {
									Option,
								} }
								value={ selectedPages }
								onChange={ handlePageSelection }
								allowSelectAll={ true }
								loadOptions={ handleLoadPages }
								defaultOptions={ defaultPages }
							/>
						</div>
					) : null }

					<button
						type="submit"
						className={ `helpgent-btn helpgent-btn-md helpgent-btn-dark helpgent-btn-block ${
							Object.keys( errors ).length !== 0
								? 'helpgent-btn-disabled'
								: null
						}` }
						disable={
							Object.keys( errors ).length !== 0 ? true : false
						}
					>
						Create Form
					</button>
				</form>
			</CreateFormStyleWrap>
		</div>
	);
}
