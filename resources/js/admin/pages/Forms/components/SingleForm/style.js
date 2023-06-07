import Styled from 'styled-components';

const HeaderStyle = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -20px;
    padding: 0 30px;
    background-color: var(--helpgent-color-white);
    .helpgent-single-form-header__back-link{
        position: relative;
        font-size: 1.07rem;
        font-weight: 500;
        text-decoration: none;
        padding-right: 20px;
        margin-right: 20px;
        &:after{
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 20px;
            content: '';
            background-color: var(--helpgent-color-border-light);
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

const MainContentStyle = Styled.div`
    
`;

const ScreenBarStyle = Styled.div`
    
`;

export { HeaderStyle, FormStyle, MainContentStyle, ScreenBarStyle };
