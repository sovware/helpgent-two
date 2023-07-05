import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSVG from 'react-inlinesvg';
import star from '@icon/star.svg';
import starAlt from '@icon/star-alt.svg';

export default function RatingQuestion(props) {
    const {
        layoutMode,
        singleForm,
        setSingleForm,
        selectedQuestion: fileQuestion,
    } = props;
    const { content } = singleForm;
    const { questions } = JSON.parse(content);

	const { elements } = fileQuestion[0].fields[0];

    const elementsObject = elements.reduce((acc, element) => {
        acc[element.key] = element;
        return acc;
    }, {});

    const {
        label,
        description,
        placeholder,
        required,
        'action-btn': actionBtn,
    } = elementsObject;

    const quillModules = {
        toolbar: false,
    };

    const ratingAmount = 5;

    function fillStars(){
        const stars = document.querySelectorAll('.helpgent-rating-single');
        stars.forEach((elm) =>{
            elm.setAttribute('selected');
            console.log('selected');
        })
    }

    return (
        <div className="helpgent-question-element">
            <div className="helpgent-question-element__text">
                <div className="helpgent-question-element__label">
                    <ReactQuill
                        modules={quillModules}
                        placeholder={`Your question here`}
                    />
                </div>
                <div className="helpgent-question-element__description">
                    <ReactQuill modules={quillModules} placeholder="Type a description" />
                </div>
            </div>
            <div className="helpgent-question-element__action">
                <div className="helpgent-form-group helpgent-form-group-column">
                    <div className="helpgent-form-group helpgent-rating-wrapper">
                        {[...Array(ratingAmount)].map((_, index) => (
                        <div className="helpgent-rating-single" key={index} onMouseOver={fillStars}>
                            <ReactSVG src={starAlt} />
                            <span className="helpgent-rating-value">{index + 1}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
