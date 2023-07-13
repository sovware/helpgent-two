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
    .helpgent-table-loader{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 50px;
    }
    .helpgent-table{
        thead{
            border-bottom: 10px solid transparent;
            tr{
                background: #e8e8e8;
                border-radius: 10px;
                th{
                    padding: 16px 15px 10px;
                }
            }
        }
        tbody{
            tr{
                transition: 0.3s ease;
                &:hover{
                    background: #EFEFEF;
                }
                &.helpgent-welcome-wrapper{
                    &:hover{
                        background: none;
                    }
                }
                td{
                    padding: 11px 15px;
                    font-weight: 500;
                    .helpgent-toggle{
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .is-checked{
                        & + .helpgent-form-status{
                            color: var(--helpgent-color-primary);
                        }
                    }
                }
                .helpgent-form-shortcode{
                    input {
                        border: 0 none;
                        background: var(--helpgent-color-bg-deep);
                        color: var(--helpgent-color-dark);
                        border-radius: 5px;
                    }
                }
                .helpgent-table-action{
                    display: flex;
                    align-items: center;
                    gap: 0 20px;
                    .helpgent-btn{
                        padding: 0 15px;
                        height: 34px;
                        font-size: 14px;
                        font-weight: 500;
                        &:hover{
                            background: var(--helpgent-color-dark);
                            color: var(--helpgent-color-white);
                        }
                    }
                    .helpgent-dropdown{
                        line-height: 0;
                        .helpgent-dropdown__toggle{
                            height: 35px;
                            padding: 0 10px;
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        &.helpgent-dropdown-open{
                            .helpgent-dropdown__toggle{
                                background: var(--helpgent-color-bg-deep);
                            }
                        }
                        &__content{
                            li:last-child{
                                border-top: 1px solid #e6e6e6;
                                a{
                                    margin-top: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
        th{
            &.helpgent-head-name{
                width: 300px;
            }
            &.helpgent-head-shortcode{
                width: 210px;
            }
            &.helpgent-head-status{
                width: 150px;
            }
            &.helpgent-head-action{
                width: 115px;
            }
        }
    }
`;

const TitleBoxStyle = Styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    .helpgent-titleBox__editor{
        input{
            border-top: 0px none;
            border-right: 0px none;
            border-bottom: 1px solid #ededed;
            border-left: 0px none;
            border-image: initial;
            background-color: transparent;
            border-radius: 0px;
            padding: 4px 0;
            line-height: 2;
            min-height: 30px;
            color: #2c3338;
            transition: 0.3s ease;
            &:active,
            &:focus{
                border: 0 none;
                border-bottom: 1px solid #000000;
                outline: 0;
                box-shadow: none;
            }
        }
    }
    .helpgent-titleBox__actions{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .helpgent-titleBox-action-item{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer ;
        border-radius: 50%;
        transition: 0.3s ease;
        &.helpgent-titleBox__actions-yes{
            background-color: var(--helpgent-color-success);
            border: 1px solid var(--helpgent-color-success);
        }
        &.helpgent-titleBox__actions-cancel{
            background-color: var(--helpgent-color-danger);
            border: 1px solid var(--helpgent-color-danger);
        }
        svg{
            width: 10px;
            height: 10px;
            path{
                fill: #fff;
                transition: 0.3s ease;
            }
        }
        .helpgent-circle-loader {
            border-color: #fff;
            border-bottom-color: transparent;
            transition: 0.3s ease;
        }
        &:hover{
            background: none;
            svg{
                path{
                    fill: #000;
                }
            }
            .helpgent-circle-loader {
                border-color: var(--helpgent-primary-color);
                border-bottom-color: transparent;
            }
        }
    }

   .helpgent-titleBox-text{
        .helpgent-title{
            font-size: 15px;
            font-weight: 600;
        }
   }
   .helpgent-titleBox-meta{
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 5px 0 0;
        .helpgent-titleBox-meta__id{
            position: relative;
            &::after{
                content: '';
                width: 2px;
                height: 2px;
                background: #6e6e6e;
                border-radius: 50%;
                display: block;
                position: absolute;
                right: -7px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        li{
            font-size: 12px;
            font-weight: 500;
            color: var(--helpgent-color-light-gray);
            margin: 0;
        }
   }
`;

const CreatePopupStyle = Styled.div`
    width: fit-content;
    margin: 0 auto;
    .helpgent-createPopup{
        text-align: center;
        margin: 50px 0;
    }
   .helpgent-createPopup__header{
        h4{
            font-size: 30px;
            font-weight: 600;
            margin: 0;
            line-height: 1.27;
            color: var(--helpgent-color-dark);
        }
        p{
            font-size: 16px;
            font-weight: 400;
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
    svg{
        fill: var(--helpgent-color-primary);
    }
   }
   .helpgent-createPopup__action-text{
        display: block;
        font-size: 16px;
        font-weight: 500;
        max-width: 96px;
        margin-top: 20px;
        line-height: 1.38;
        color: var(--helpgent-color-dark);
   }
   .helpgent-validate-danger{
    display: block;
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
        font-size: 22px;
        font-weight: 600;
        margin: 0;
        color: var(--helpgent-color-dark);
    }
    p{
        font-size: 16px;
        margin: 0;
        font-weight: 400;
    }
    .helpgent-btn-create{
        padding: 0 30px;
        height: 46px;
        margin-top: 35px;
        border-radius: 10px;
    }
`;

const CreateFormStyleWrap = Styled.div`
    text-align: left;
    margin-top: 50px;
    .helpgent-form-group{
        width: 450px;
    }
    .helpgent-tooltip-toggle{
        position: relative;
        top: 1px;
        display: inline-block;
        margin-left: 10px;
        line-height: .85;
        cursor: pointer;
    }
    .helpgent-form__element,
    .helpgent-form__element-inline{
        border-radius: 12px;
        background-color: var(--helpgent-color-bg-gray);
    }
    .helpgent-form__element{
        &::placeholder{
            color: #3C3C3C;
        }
    }
    .helpgent-form__element-inline{
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;
    }
    .helpgent-form__label{
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
        color: var(--helpgent-color-dark);
    }
    .helpgent-select {
        margin-top: 12px;
    }
`;

const SingleFormHeaderStyle = Styled.div`

`;

export {
	PageHeaderStyle,
	FormTableStyle,
	TitleBoxStyle,
	CreatePopupStyle,
	WelcomeBoxStyleWrap,
	CreateFormStyleWrap,
	SingleFormHeaderStyle,
};
