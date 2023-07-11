import { FormToggle } from '@wordpress/components';
import { useState } from '@wordpress/element';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function YesNoQuestion(props) {
    const {
        layoutMode,
        singleForm,
        setSingleForm,
        selectedQuestion: yesNoQuestionField,
    } = props;
    const { content } = singleForm;
    const { questions } = JSON.parse(content);

    const required = true;

    const quillModules = {
        toolbar: false,
    };

    const [questionAnswer, setQuestionAnswer] = useState(true);

    const handleQuestionToggle = () => {
        setQuestionAnswer((state) => !state);
    };

    const handleAlternativeToggle = () => {
        setQuestionAnswer((state) => !state);
    };

    return (
        <div className="helpgent-question-element">
            <div className="helpgent-question-element__text">
                <div className="helpgent-question-element__label">
                    <ReactQuill
                        modules={quillModules}
                        placeholder={`Your question here! ${required ? '*' : null}`}
                    />
                </div>
                <div className="helpgent-question-element__description">
                    <ReactQuill modules={quillModules} placeholder="Type a description" />
                </div>
            </div>
            <div className="helpgent-question-element__action">
                <div className="helpgent-form-group helpgent-form-group-column">
                    <div className="helpgent-form__element-inline helpgent-form__element-inline--yes-no-toggler helpgent-mb-10">
                        <div className="helpgent-toggle">
                            <FormToggle checked={questionAnswer} onChange={handleQuestionToggle} />
                        </div>
                        <span className="helpgent-form__label">Yes</span>
                    </div>
                    <div className="helpgent-form__element-inline helpgent-form__element-inline--yes-no-toggler">
                        <div className="helpgent-toggle">
                            <FormToggle checked={!questionAnswer} onChange={handleAlternativeToggle} />
                        </div>
                        <span className="helpgent-form__label">No</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
