import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSVG from 'react-inlinesvg';
import picture from '@icon/picture.svg';
import trash from '@icon/trash.svg';
import plus from '@icon/plus.svg';
import times from '@icon/times.svg';

export default function PictureSelectQuestion( props ) {
	const {
		layoutMode,
		singleFormState,
		setSingleFormState,
		selectedQuestion: pictureSelectQuestionField,
	} = props;
	const { singleForm } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );

	const quillModules = {
		toolbar: false,
	};

	const builderMode = true;

	return (
		<div className="helpgent-question-element">
			<div className="helpgent-question-element__text">
				<div className="helpgent-question-element__label">
					<ReactQuill
						modules={ quillModules }
						placeholder={ `Select Picture` }
					/>
				</div>
				<div className="helpgent-question-element__description">
					<ReactQuill
						modules={ quillModules }
						placeholder="Type a description"
					/>
				</div>
			</div>
			<div className="helpgent-question-element__action">
				<div className="helpgent-form-group helpgent-form-group-column">
					<div className="helpgent-select-picture-list">
						<div className="helpgent-select-picture-single">
							<a
								href=""
								className="helpgent-select-picture-single__remove"
							>
								<ReactSVG src={ times } />
							</a>
							<div className="helpgent-select-picture-single__img">
								<img
									src="http://via.placeholder.com/44x420"
									alt=""
								/>
								<div className="helpgent-select-picture-single__action">
									{ builderMode && (
										<>
											<button className="helpgent-select-picture-single__action__btn">
												<ReactSVG src={ picture } />
											</button>
											<button className="helpgent-select-picture-single__action__btn">
												<ReactSVG src={ trash } />
											</button>
										</>
									) }
								</div>
							</div>
							<div className="helpgent-select-picture-single__caption">
								First Answer
							</div>
						</div>

						<div className="helpgent-select-picture-single helpgent-select-picture-single--add-new">
							<button className="helpgent-select-picture-single__add-picture">
								<span>
									<ReactSVG src={ plus } />
								</span>
								Add new
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
