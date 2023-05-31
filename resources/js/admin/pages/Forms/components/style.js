import Styled from 'styled-components';

const PageHeaderStyle = Styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    .helpgent-page-header-title{
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--helpgent-color-dark);
    }
    .helpgent-page-header-btn{
        ${ ( { theme } ) =>
			theme.direction === 'ltr' ? 'margin-left' : 'margin-right' }: 20px;
    }
`;

const FormTableStyle = Styled.div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--helpgent-color-white);
    .helpgent-table-wrap{
        position: relative;
        min-height: 200px;
    }
    .helpgent-table{
        th{
            &.helpgent-head-name{
                width: 200px;
            }
            &.helpgent-head-shortcode{
                width: 210px;
            }
            &.helpgent-head-status{
                width: 80px;
            }
        }
    }
`;

const TitleBoxStyle = Styled.div`
   
`;

const CreatePopupStyle = Styled.div`
    width: fit-content;
    margin: 0 auto;
    .helpgent-createPopup{
        text-align: center;
        margin: 80px 0;
    }
   .helpgent-createPopup__header{
        h4{
            font-size: 2rem;
            margin: 0;
            color: var(--helpgent-color-dark);
        }
        p{
            font-size: 1.07rem;
        }
   }
   .helpgent-createPopup__actions{
    display: flex;
    align-items: center;
    margin-top: 36px;
   }
   .helpgent-createPopup__action{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
        border-radius: 20px;
        padding: 40px 52px;
        text-decoration: none;
        background-color: var(--helpgent-color-bg-gray);
        &:hover{
            background-color: 
        }
   }
   .helpgent-createPopup__action-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background-color: var(--helpgent-color-white);
   }
   .helpgent-createPopup__action-text{
        display: block;
        font-size: 1rem;
        font-weight: 600;
        max-width: 96px;
        margin-top: 20px;
        line-height: 1.38;
        color: var(--helpgent-color-dark);
   }
`;

const WelcomeBoxStyleWrap = Styled.div`
    width: fit-content;
    margin: 100px auto;
    border-radius: 20px;
    text-align: center;
    padding: 3.6rem clamp(1rem, 10%, 7.5rem);
    border: 1px solid var(--helpgent-color-border-light);
    .helpgent-welcome-top{
        margin-bottom: 6px;
    }
    .helpgent-welcome-top{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .helpgent-welcome-top__icon{
        margin-right: 10px;
    }
    .helpgent-welcome-top__title{
        font-size: 1.47rem;
        margin: 0;
        color: var(--helpgent-color-dark);
    }
    p{
        font-size: 1.07rem;
        margin: 0;
    }
    .helpgent-btn-create{
        padding: 0 30px;
        height: 46px;
        margin-top: 35px;
        border-radius: 10px;
    }
`;

export {
	PageHeaderStyle,
	FormTableStyle,
	TitleBoxStyle,
	CreatePopupStyle,
	WelcomeBoxStyleWrap,
};
