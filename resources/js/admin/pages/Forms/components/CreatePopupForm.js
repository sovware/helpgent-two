import { useState } from '@wordpress/element';
import { Tooltip, FormToggle } from '@wordpress/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReactSVG from 'react-inlinesvg';
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
	const [ form, setForm ] = useState( {
		title: '',
		status: 'publish',
		content: {},
	} );

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm( {
		mode: 'all',
	} );

	const [ serverErrors, setServerErrors ] = useState( {} );

	const { mutate } = useCreateMutation(
		'/helpgent/admin/form',
		'helpgent-form',
		function ( previousData, form ) {
			previousData.forms.push( form );
			previousData.total = previousData.forms.length;
			queryClient.setQueryData(
				[ 'helpgent-form' ],
				( old ) => previousData
			);
		}
	);

	return (
		<div className="helpgent-createPopup">
			<CreatePopupHeader title="Let’s get started" />
			<CreateFormStyleWrap>
				<form onSubmit={ handleSubmit( handleCreateForm ) }>
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
								Collect user info?
								<Tooltip text="More information">
									<span className="helpgent-tooltip-toggle">
										<ReactSVG src={ questionCircle } />
									</span>
								</Tooltip>
							</span>
							<div className="helpgent-toggle">
								<FormToggle />
							</div>
						</div>
					</div>
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
						<Select
							inputId="helpgent-page-select"
							className="helpgent-select"
							classNamePrefix="helpgent-select"
							options={ availablePages }
							isMulti
							searchable={ false }
							hideSelectedOptions={ false }
							components={ {
								Option,
							} }
							// defaultValue={}
							defaultMenuIsOpen={ true }
							name=""
							// onChange={handleOnChangeDisplayOnCustomPages}
							allowSelectAll={ true }
						/>
					</div>
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
