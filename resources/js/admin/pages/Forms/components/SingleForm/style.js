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

    .helpgent-screenBar-content__welcome{
        padding: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--helpgent-color-bg-gray);
    }
    .helpgent-screenBar-content__end{
        padding: 0 20px 20px;
        border-top: 1px solid var(--helpgent-color-bg-gray);
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
        margin: 0;
        color: var(--helpgent-color-text);
        .helpgent-badge{
            display: inline-block;
            margin-left: 6px;
            line-height: 1.8;
            padding: 0 4px;
        }
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

export {
	HeaderStyle,
	FormStyle,
	MainContentStyle,
	ScreenBarStyle,
	ScreenItemStyle,
	MegaDropdownStyle,
};