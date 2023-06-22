import Styled from 'styled-components';

const HeaderStyle = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -20px;
    padding: 0 30px;
    margin-bottom: 20px;
    background-color: var(--helpgent-color-white);
    .helpgent-single-form-header__back-link{
        position: relative;
        font-size: 1.07rem;
        font-weight: 500;
        text-decoration: none;
        padding-right: 20px;
        margin-right: 20px;
        color: var(--helpgent-color-text);
        &:after{
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 20px;
            content: '';
            background-color: var(--helpgent-color-border-light);
        }
        svg {
            position: relative;
            top: -1px;
            path {
                fill: var(--helpgent-color-text);
            }
        }
    }
    .helpgent-single-form-header__title{
        font-size: 1.07rem;
        width: 14px;
        height: 14px;
        strong{
            color: var(--helpgent-color-dark);
            font-weight: 600;
        }
        svg{
            margin-right: 10px;
        }
    }

    .helpgent-single-form-header__middle{
        flex: .48;
    }

    .helpgent-single-form-header__tab{
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        list-style: none;
        li{
            margin: 0;
            padding: 0;
        }
    }
    .helpgent-single-form-header__tab-link{
        position: relative;
        font-size: 1.07rem;
        display: inline-block;
        text-decoration: none;
        padding: 30px 15px;
        color: var(--helpgent-color-text);
        transition: color .3s ease-in;
        &:after{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            border-radius: 10px;
            content: '';
            opacity: 0;
            visibility: visible;
            transition: background-color .3s ease-in;
            background-color: var(--helpgent-color-primary);
        }
        &:hover,
        &.helpgent-active{
            color:  var(--helpgent-color-primary);
            &:after{
                opacity: 1;
                visibility: visible;
            }
        }
    }
`;

const FormStyle = Styled.div`
    
`;

const ScreenBarStyle = Styled.div`
    width: 280px;
    border-radius: 14px;
    background-color: var(--helpgent-color-white);
    .helpgent-screenBar-header{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
    }
    .helpgent-screenBar-header__title{
        font-size: 1rem;
        margin: 0;
        color: var(--helpgent-color-dark);
    }
    .helpgent-screenBar-header__add{
        position: relative;
        font-size: .87rem;
        font-weight: 500;
        text-decoration: none;
        color: var(--helpgent-color-primary);
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
        svg{
            margin-right: 4px;
        }
    }
    .helpgent-screenBar-content{
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: calc( 70vh );
        .helpgent-screen__item{
            padding: 6px;
        }
        .helpgent-screen__icon{
            width: 36px;
            height: 36px;
        }
    }
    .helpgent-sortable-item{
        margin-bottom: 10px;
    }
    .helpgent-screenBar-content__welcome{
        padding: 20px;
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
    }
    .helpgent-screenBar-content__other{
        flex: 1 1 0%;
        padding: 0 20px 20px;
        margin-top: 20px;
        overflow-y: auto;
    }
    .helpgent-screenBar-content__end{
        display: flex;
        flex-direction: column;
        padding: 0 20px 20px;
        border-top: 1px solid var(--helpgent-color-bg-gray);
        .helpgent-end-screen-list{
            overflow-y: auto;
        }
    }
    .helpgent-ending-draggable{
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 16px;
        cursor: grab;
        .helpgent-ending-draggable__pipe{
            width: 50px;
            height: 4px;
            border-radius: 20px;
            background-color: var(--helpgent-color-light-gray);
        }
    }
    .helpgent-screenBar-end-head{
        display: flex;
        justify-content: space-between;
        margin: 10px 0 20px;
    }
    .helpgent-screenBar-end-head__title{
        font-size: 1rem;
        font-weight: 500;
        color: var(--helpgent-color-dark);
    }
    .helpgent-screenBar-end-head__add{
        font-size: .87rem;
        text-decoration: none;
        color: var(--helpgent-color-light-gray);
    }
`;

const MainContentStyle = Styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const ScreenItemStyle = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color .3s ease-in-out;
    background-color: var(--helpgent-color-bg-gray);
    &:hover{
        background-color: #D5D5D5;
    }
    &:not(:last-child){
        margin-bottom: 10px;
    }
    &.helpgent-active{
        background-color: var(--helpgent-color-gray);
        .helpgent-screen__title{
            color: var( --helpgent-color-white );
        }
    }
    .helpgent-screen__content{
        display: flex;
        align-items: center;
    }
    .helpgent-screen__icon{
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-right: 10px;
        background-color: var(--helpgent-color-white);
    }
    .helpgent-screen__title{
        position: relative;
        display: flex;
        align-items: center;
        font-size: .87rem;
        font-weight: 500;
        margin: 0;
        color: var(--helpgent-color-gray);
        .helpgent-badge{
            display: inline-block;
            margin-left: 6px;
            line-height: 1.8;
            padding: 0 4px;
        }
    }
    .helpgent-dropdown{
        line-height: 1;
    }
    .helpgent-dropdown__content{
        width: 200px;
        margin: 0;
        top: 40px;
        right: -6px;
        li{
            margin: 0;
        }
        a{
            font-size: .93rem;
            &:hover{
                background-color: var(--helpgent-color-bg-gray);
            }
        }
    }
    .helpgent-dropdown__toggle{
        padding: 2px 14px;
    }
`;

const MegaDropdownStyle = Styled.div`
    position: absolute;
    width: 45vw;
    left: 270px;
    top: 0;
    border-radius: 14px;
    cursor: auto;
    box-shadow: 0 5px 30px rgba(0,0,0,.10);
    z-index: 101;
    background-color: var(--helpgent-color-white);
    .helpgent-mega-dropdown__title{
        font-size: 1.07rem;
        font-weight: 600;
        color: var(--helpgent-color-dark);
        margin: 0 0 20px;
    }
    .helpgent-screen-type__title{
        display: inline-block;
        font-size: .93rem;
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--helpgent-color-light-gray);
    }
    .helpgent-mega-dropdown__search{
        position: relative;
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
        .helpgent-mega-dropdown__search-icon{
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        input{
            width: 100%;
            font-size: .93rem;
            padding-left: 45px;
            padding-right: 30px;
            min-height: 50px;
            border-radius: 14px 14px 0 0;
            border: 0 none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
    }
    .helpgent-screen-type-wrap{
        display: grid;
        grid-gap: 25px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .helpgent-screen-type{
        font-size: clamp(.93rem, 4vw, 1rem);
        &:not(:last-child){
            margin-bottom: 50px;
        }
    }
    .helpgent-mega-dropdown__content{
        padding: 20px 30px 40px;
        min-height: 300px;
    }
    .helpgent-screen-type-column{
        &:empty{
            display: none;
        }
    }
`;

const PreviewStyle = Styled.div`
    flex: 1 1 0%;
    padding: 0 30px;
    text-align: center;
    .helpgent-preview-top{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        svg{
            margin-right: 10px;
        }
    }
    .helpgent-preview-top__text{
        font-size: 14px;
        font-weight: 500;
        color: var(--helpgent-preview-top__text);
    }
    .helpgent-preview-container{
        display: flex;
        border-radius: 20px;
        min-height: 550px;
        background-color: var(--helpgent-color-white);
    }
`;

const MediaPreviewStyle = Styled.div`
    flex: 1 1 0%;
    .helpgent-media-empty{
        width: 100%;
        height: 100%;
        border-radius: 20px 0 0 20px;
        background-color: var(--helpgent-color-dark);
    }
`;

const QuestionPreviewStyle = Styled.div`
    flex: 1 1 0%;
    .helpgent-question-element{
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 40px;
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
    .helpgent-question-element__action{
        text-align: left;
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
`;

const ScreenSettingsStyle = Styled.div`
    width: 340px;
`;

const PreviewDeviceControlStyle = Styled.div`
    margin-top: 40px;
    .helpgent-device-action{
        cursor: pointer;
        margin: 0 15px;
    }
`;

export {
	HeaderStyle,
	FormStyle,
	MainContentStyle,
	ScreenBarStyle,
	ScreenItemStyle,
	MegaDropdownStyle,
	PreviewStyle,
	ScreenSettingsStyle,
	MediaPreviewStyle,
	QuestionPreviewStyle,
	PreviewDeviceControlStyle,
};
