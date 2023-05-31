import CreatePopupHeader from './CreatePopupHeader';
import CreatePopupAction from './CreatePopupAction';
import Pencil from '../../../../../../assets/svg/icon/pencil-plus.svg';
import template from '../../../../../../assets/svg/icon/template.svg';
export default function CreatePopupForm() {
	return (
		<div className="helpgent-createPopup">
			<CreatePopupHeader title="Let’s get started" />
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
									const isValid = value.trim().length !== 0;
									return isValid || 'Only spaces not allowed';
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
		</div>
	);
}
