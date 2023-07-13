import Styled from 'styled-components';

const QuestionPreviewStyle = Styled.div`
    flex: 1 1 0%;
    .helpgent-question-element{
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 40px 0;
        &.helpgent-question--end{
            align-items: center;
            .ql-editor{
                &.ql-blank{
                    &:before{
                        font-size: 1.07rem;
                        text-align: center;
                    }
                }
                p{
                    font-size: 1.07rem;
                    text-align: center;
                }
            }
            .helpgent-question-element__label{
                margin-bottom: 6px;
                .ql-editor{
                    &.ql-blank{
                        &:before{
                            font-size: 2rem;
                        }
                    }
                }
                p{
                    font-size: 2rem;
                }
            }
            .helpgent-question-element__text{
                width: 500px;
            }
            .helpgent-question-element__action{
                margin-top: 40px;
            }
            .helpgent-btn-external{
                padding: 0 140px;
            }
        }
    }
    .helpgent-question-element__uploader{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        max-width: 370px;
        min-height: 178px;
        border-radius: 12px;
        margin-top: 5px;
        background-color: #F7F7F7;
        border: 2px dashed var(--helpgent-color-bg-gray);
        .helpgent-uploader-label{
            display: flex;
            font-size: .93rem;
            font-weight: 400;
            margin-top: 20px;
            color: var(--helpgent-color-dark);
        }
        .helpgent-uploader-size-limit{
            display: inline-block;
            font-size: .8rem;
            margin-top: 6px;
            color: var(--helpgent-color-light-gray);
        }
    }
    .helpgent-question-element__social{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px -4px -4px;
    }
    .helpgent-question-element__social-item{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        margin: 4px;
        cursor: pointer;
        border-radius: 8px;
        &.helpgent-question-element__social-facebook{
            background-color: #2D75ED;
        }
        &.helpgent-question-element__social-twitter{
            background-color: #3CA2F8;
        }
        &.helpgent-question-element__social-youtube{
            background-color: #F30104;
        }
        &.helpgent-question-element__social-instagram{
            background-color: #BF3AD4;
        }
    }
    .helpgent-question-element__label{
        margin-bottom: 6px;
        .ql-editor{
            &.ql-blank{
                &:before{
                    font-size: var(--helpgent-label-font-size);
                    font-weight: var(--helpgent-label-font-weight);
                    color: var(--helpgent-label-color);
                }
            }

            p{
                font-size: 20px;
                font-weight: 600;
                color: var(--helpgent-color-dark);
            }
        }
    }
    .ql-container.ql-snow{
        border: 0 none;
    }
    .ql-editor{
        padding: 0;
        &.ql-blank{
            &:before{
                font-style: normal;
                left: 0;
                opacity: .6;
                font-size: var(--helpgent-description-font-size);
                font-weight: var(--helpgent-description-font-weight)
                color: var(--helpgent-description-color);
            }
        }
    }
    .helpgent-question-element__description{
        min-height: 40px;
    }
    .helpgent-question-element__text,
    .helpgent-question-element__action{
        padding: 0 40px;
    }
    .helpgent-question-element__action{
        text-align: left;
        /* max-height: 430px;
        overflow-y: auto; */
        margin-top: 8px;
        max-width: 370px;
        .helpgent-btn{
            height: 48px;
            border-radius: var(--helpgent-btn-radius);
        }
        .helpgent-btn-start{
            padding: 0 30.5px;
        }
        .helpgent-btn-next{
            padding: 0 28.75px;
        }
        .helpgent-btn-submit{
            width: 100%;
            justify-content: center;
        }
        .helpgent-form__element{
            min-height: 44px;
            padding: 7px 16px 8px;
            border-radius: var(--helpgent-btn-radius);
            background-color: var(--helpgent-input-background);
        }
        textarea.helpgent-form__element{
            resize: none;
            min-height: 100px;
        }
        .helpgent-question-element__option-count{
            display: block;
            width: 100%;
            text-align: right;
            margin-top: 10px;
            font-size: .87rem;
            color: var(--helpgent-color-light-gray);
        }
    }
    .helpgent-form-icon-left{
        .helpgent-form__element{
            padding-left: 40px;
        }
    }
    .helpgent-question-time{
        display: flex;
        align-items: center;
        margin-top: 20px;
        svg{
            margin-right: 8px;
        }
        span{
            font-size: .87rem;
            font-weight: 500;
            color: var(--helpgent-color-dark);
        }
    }

    .helpgent-form-group{
        margin-bottom: 22px;
    }

    .helpgent-form-group__element{
        min-height: 44px;
        border-radius: 10px;
    }
    .helpgent-form-group__label{
        margin-bottom: 10px;
    }
    .helpgent-select__control{
        height: 44px;
        border-radius: 10px;
    }
    .helpgent-select__placeholder{
        font-size: .93rem;
        font-weight: 400;
        color: var(--helpgent-color-gray);
    }
    .helpgent-select__single-value{
        font-size: .93rem;
        font-weight: 500;
        color: var(--helpgent-color-dark);
    }
    .helpgent-form__element-inline--yes-no-toggler{
        padding: 12px 16px;
        border-radius: 10px;
        background: var(--helpgent-color-bg-light);
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    //Picture Select Question
    .helpgent-select-picture-list{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    .helpgent-select-picture-single{
        width: 160px;
        border: 1px solid var(--helpgent-color-bg-gray);
        border-radius: 12px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        &__remove{
            width: 22px;
            height: 22px;
            background: var(--helpgent-color-danger);
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: -9px;
            top: -11px;
            border-radius: 50%;
            visibility: hidden;
            opacity: 0;
            transition: 0.3s ease;
            svg{
                path{
                    fill: #fff;
                }
            }
        }
        &__img{
            position: relative;
            img{
                border-radius: 10px;
                width: 100%;
                max-height: 120px;
                object-fit: cover;
            }
        }
        &__action{
            position: absolute;
            right: 8px;
            top: 8px;
            display: flex;
            align-items: center;
            gap: 5px;
            visibility: hidden;
            opacity: 0;
            transition: 0.3s ease;
            button{
                padding: 0;
                margin: 0;
                background: #fff;
                border-radius: 6px;
                width: 30px;
                height: 30px;
                align-items: center;
                justify-content: center;
                border: 0 none;
                display: flex;
                cursor: pointer;
                svg{
                    width: 13px;
                }
            }
        }
        &__caption{
            font-size: 13px;
            margin-top: 5px;
            color: var(--helpgent-color-gray);
        }
        &--add-new{
            border-style: dashed;
            border-width: 2px;
            min-height: 166px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        &__add-picture{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0;
            margin: 0;
            cursor: pointer;
            background: none;
            border: 0 none;
            color: var(--helpgent-color-gray);
            font-size: 13px;
            &::after{
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            span{
                display: block;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin-bottom: 5px;
                background: var(--helpgent-color-extra-light);
                svg{
                    width: 10px;
                    path{
                        fill: #fff;
                    }
                }
            }
        }
        &:hover{
            .helpgent-select-picture-single__remove,
            .helpgent-select-picture-single__action
            {
                visibility: visible;
                opacity: 1;
            }
        }
    }

    //Open-ended question
    .helpgent-open-ended-question-types{
        display: flex;
        align-items: center;
        gap: 10px;
        .helpgent-open-ended-btn{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--helpgent-color-primary);
            border-radius: 14px;
            min-height: 85px;
            border: 0 none;
            cursor: pointer;
            &:focus{
                outline: 0;
                border: 0 none;
            }
            svg{
                width: 24px;
                path{
                    fill: var(--helpgent-color-white);
                }
            }
            span{
                font-size: 14px;
                font-weight: 500;
                margin-top: 12px;
                color: var(--helpgent-color-white);
            }
        }
    }
    .helpgent-open-ended-notice{
        display: block;
        margin-top: 10px;
        font-size: 13px;
    }

    //Rating Question
    .helpgent-rating-wrapper{
        display: flex;
        align-items: center;
        .helpgent-rating-single{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-right: 6px;
            svg{
                width: 24px;
                height: 24px;
            }
            .helpgent-rating-value{
                display: block;
                margin-top: 8px;
            }
            &--selected{
                svg{
                    path{
                        fill: var(--helpgent-color-primary);
                    }
                }
            }
        }
    }
`;
const ScoreQuestionStyle = Styled.div`
    .helpgent-question-element__action{
        max-width: 100%;
    }
    .helpgent-promoter-score__list{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 0 8px;
    }
    .helpgent-promoter-score__single{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        margin: 2px;
        cursor: pointer;
        transition: .2s ease-in-out;
        border: 1px solid var(--helpgent-color-bg-gray);

        &:hover,
        &.helpgent-active{
            color: var(--helpgent-color-white);
            background-color: var(--helpgent-color-primary);
            border-color: var(--helpgent-color-primary);
        }
    }
    .helpgent-promoter-score__wayline{
        display: flex;
        justify-content: space-between;
        .helpgent-promoter-score__lowest-text,
        .helpgent-promoter-score__highest-text{
            font-size: .93rem;
            color: var(--helpgent-color-gray);
        }
    }
`;
const SingleSelectStyle = Styled.div`
    line-height: 1.25;
    &:not(last-child){
        margin-bottom: 10px;
    }
    input[type='radio']{
        display: none;
        &:checked {
            & + .helpgent-single-select__option{
                font-weight: 500;
                color: var(--helpgent-color-dark);
                &:after{
                    background-color: var(--helpgent-color-primary);
                }
                &:before{
                    width: 8px;
                    height: 8px;
                }
            }
        }
    }
    .helpgent-single-select__option{
        position: relative;
        border-radius: 10px;
        padding: 14px 15px 14px 45px;
        width: 100%;
        display: inline-block;
        max-width: 290px;
        background-color: var(--helpgent-color-bg-light);
        color: var(--helpgent-color-gray);
        &:after{
            position: absolute;
            left: 15px;
            top: 13px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            content: '';
            background-color: #A2A2A2;
        }
        &:before{
            position: absolute;
            width: 16px;
            height: 16px;
            left: 24px;
            top: 22px;
            border-radius: 50%;
            content: '';
            background-color: #EFEFEF;
            transform: translate(-50%,-50%);
            z-index: 10;
        }
    }
`;
const MultiSelectStyle = Styled.div`
    &:not(last-child){
        margin-bottom: 10px;
    }
    input[type='checkbox']{
        display: none;
        &:checked {
            & + .helpgent-multi-select__option{
                svg{
                    display: block;
                }
                &:before{
                    border-color: var(--helpgent-color-primary);
                    background-color: var(--helpgent-color-primary);
                }
            }
        }
    }
    .helpgent-multi-select__option{
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 14px 15px 14px 45px;
        width: 100%;
        display: inline-block;
        max-width: 290px;
        background-color: var(--helpgent-color-bg-light);
        &:before{
            position: absolute;
            left: 15px;
            width: 14px;
            height: 14px;
            border-radius: 5px;
            background-color: transparent;
            content: '';
            border: 2px solid var(--helpgent-color-extra-light);
        }
        svg{
            position: absolute;
            width: 8px;
            height: 8px;
            left: 20px;
            top: 19px;
            display: none;
            path{
                fill: var(--helpgent-color-white);
            }
        }
    }
`;

const CountryDialerControl = Styled.div`
    .helpgent-select{
        margin-right: 10px;
    }
    .helpgent-select__control{
        min-height: 44px;
    }
    .helpgent-select__menu{
        min-width: 220px;
        padding: 8px;
    }
    .helpgent-select__option{
        font-size: .87rem;
        padding: 4px 5px;
    }
    .helpgent-select__single-value{
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        margin: 0 12px 0 0;
    }
    .helpgent-select__indicator{
        padding: 0 10px 0 0;
        svg{
            width: 18px;
            height: 18px;
        }
    }
`;

export {
	QuestionPreviewStyle,
	ScoreQuestionStyle,
	SingleSelectStyle,
	MultiSelectStyle,
	CountryDialerControl,
};
