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
        border-bottom: 1px solid var(--helpgent-color-border-light);
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
        padding: 20px;
        .helpgent-screen-welcome{
            height: 60vh;
        }
    }
`;

const MainContentStyle = Styled.div`
    
`;

const ScreenItemStyle = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
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
    .helpgent-screen__content{
        display: flex;
        align-items: center;
    }
    .helpgent-screen__icon{
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-right: 10px;
        background-color: var(--helpgent-color-white);
    }
    .helpgent-screen__title{
        font-size: .87rem;
        margin: 0;
        color: var(--helpgent-color-text);
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
    left: 100px;
    top: -15px;
    border-radius: 14px;
    cursor: auto;
    box-shadow: 0 5px 30px rgba(0,0,0,.10);
    background-color: var(--helpgent-color-white);
    .helpgent-mega-dropdown__title{
        font-size: 1.07rem;
        font-weight: 600;
        color: var(--helpgent-color-dark);
        margin: 0 0 20px;
    }
    .helpgent-screen-type__title{
        font-size: .93rem;
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--helpgent-color-bg-deep);
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
        display: grid;
        font-size: clamp(.93rem, 4vw, 1rem);
    }
    .helpgent-mega-dropdown__content{
        padding: 20px 30px 40px;
    }
`;

export {
	HeaderStyle,
	FormStyle,
	MainContentStyle,
	ScreenBarStyle,
	ScreenItemStyle,
	MegaDropdownStyle,
};
