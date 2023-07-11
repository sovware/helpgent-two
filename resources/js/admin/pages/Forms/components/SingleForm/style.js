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
        font-size: 0.93rem;
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
        font-size: .93rem;
        display: inline-block;
        text-decoration: none;
        padding: 30px 15px;
        transition: color .3s ease-in;
        color: var(--helpgent-color-text);
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
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
    box-sizing: border-box;
    padding: 0 20px 0 0;
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

const ScreenSettingsStyle = Styled.div`
    width: 340px;
    border-radius: 14px;
    background-color: var(--helpgent-color-white);
    .helpgent-screen-setting-header{
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
    }
    .helpgent-screen-setting-element__label{
        font-size: .93rem;
        font-weight: 500;
        margin: 0 0 10px;
        color: var(--helpgent-color-dark);
    }
    .helpgent-screen-setting-element__content{
        position: relative;
        .helpgent-mega-dropdown{
            left: auto;
            right: 0;
            top: 50px;
        }
        .helpgent-mega-dropdown__content{
            height: min(80vh, 520px);
            overflow-y: auto;
        }
    }
    .helpgent-screen-setting-list{
        display: flex;
        align-items: center;
        padding: 10px 10px 0;
        margin: 0;
        li{
            padding: 14px 15px;
            font-size: .93rem;
            font-weight: 500;
            cursor: pointer;
            color: var(--helpgent-color-gray);
        }
    }
    .helpgent-screen-setting-block{
        padding: 25px;
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
    }
    .helpgent-question-dropdown{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 18px 5px 5px;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color .3s ease-in-out;
        background-color: var(--helpgent-color-bg-gray);
        .helpgent-question-dropdown__content{
            display: flex;
            align-items: center;
        }
        .helpgent-question-dropdown__icon{
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            margin-right: 10px;
            background-color: var(--helpgent-color-white);
        }
        .helpgent-question-dropdown__title{
            font-size: .93rem;
            font-weight: 500;
            margin: 0;
            color: var(--helpgent-color-dark);
        }
    }
    .helpgent-media-uploader{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 160px;
        background-color: var(--helpgent-color-bg-light);
        .helpgent-btn-upload-trigger{
            font-size: .93rem;
            white-space: nowrap;
            color: var(--color-dark);
            background-color: var(--helpgent-color-white);
        }
    }
    .helpgent-media-preview{
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        video{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 12px;
        }
    }
    .helpgent-media-preview__src{
        height: 100%;
    }
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
	PreviewDeviceControlStyle,
};
