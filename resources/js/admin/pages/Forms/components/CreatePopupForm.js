import { useState, useEffect } from '@wordpress/element';
import { Tooltip, FormToggle } from '@wordpress/components';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import ReactSVG from 'react-inlinesvg';
import AsyncSelect from 'react-select/async';
import Option from '../helper/createSelectOptions.js';
import handleCreateForm from '../helper/handleCreateForm.js';
import handleChatBubbleToggle from '../helper/handleChatBubbleToggle';
import handleLoadPages from '../helper/handleLoadPages';
import handlePageSelection from '../helper/handlePageSelection.js';
import useCreateMutation from '../../../../hooks/useCreateMutation.js';
import getValidationMessage from '@helper/getValidationMessage.js';
import CreatePopupHeader from './CreatePopupHeader';
import questionCircle from '../../../../../../assets/svg/icon/question-circle.svg';
import { CreateFormStyleWrap } from './style.js';

export default function CreatePopupForm() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [ defaultPages, setDefaultPages ] = useState( [] );
	const [ selectedPages, setSelectedPages ] = useState( null );
	const [ serverErrors, setServerErrors ] = useState( {} );
	const [ displayChatBubble, setDisplayChatBubble ] = useState( false );
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm( { mode: 'all' } );

	const { mutateAsync: createFormMutation } = useCreateMutation(
		'/helpgent/admin/form',
		function ( previousData, forms ) {
			previousData.forms.push( forms );
			previousData.total = previousData.forms.length;
			queryClient.setQueryData(
				[ 'helpgent-form' ],
				( old ) => previousData
			);
		}
	);

	useEffect( () => {
		const fetchDefaultPages = async () => {
			const initialPages = await handleLoadPages( '' );
			setDefaultPages( initialPages );
		};

		fetchDefaultPages();
	}, [] );

	return (
		<div className="helpgent-createPopup">
			<CreatePopupHeader title="Let’s get started" />
			<CreateFormStyleWrap>
				<form
					onSubmit={ handleSubmit( ( formData ) =>
						handleCreateForm(
							formData,
							createFormMutation,
							setServerErrors,
							navigate
						)
					) }
				>
					<div className="helpgent-form-group">
						<input
							type="text"
							className="helpgent-form-group__element"
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
									minLength: ( value ) => {
										const isValid =
											value.trim().length >= 5;
										return (
											isValid ||
											'The title filed must be at least 5 characters.'
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
						{ errors.title?.type === 'minLength'
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
									onChange={ () =>
										handleChatBubbleToggle(
											setDisplayChatBubble,
											setValue,
											displayChatBubble
										)
									}
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
								onChange={ ( selectEvent ) =>
									handlePageSelection(
										selectEvent,
										setSelectedPages,
										selectedPages,
										setValue
									)
								}
								allowSelectAll={ true }
								loadOptions={ handleLoadPages }
								defaultOptions={ defaultPages }
							/>
						</div>
					) : null }

					<button
						type="submit"
						className={ `helpgent-btn helpgent-btn-md helpgent-btn-primary helpgent-btn-block ${
							Object.keys( errors ).length !== 0 ||
							Object.keys( serverErrors ).length !== 0
								? 'helpgent-btn-disabled'
								: null
						}` }
						disabled={
							Object.keys( errors ).length !== 0 ||
							Object.keys( serverErrors ).length !== 0
								? true
								: false
						}
					>
						Create Form
					</button>
					{ serverErrors.internal &&
						getValidationMessage( serverErrors.internal ) }
				</form>
			</CreateFormStyleWrap>
		</div>
	);
}
