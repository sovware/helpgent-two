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
   
`;

export { PageHeaderStyle, FormTableStyle, TitleBoxStyle, CreatePopupStyle };
