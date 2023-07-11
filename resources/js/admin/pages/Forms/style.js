import Styled from 'styled-components';

const ScreenWrapStyle = Styled.div`
    
`;

const SingleFormStyle = Styled.div`
    /* margin: 20px 20px 0 0; */
    .helpgent-page-initial{
        position: relative;
        height: 50vh;
        border-radius: 14px;
        background-color: var(--helpgent-color-white);
    }
    .helpgent-message-error{
        font-size: 1rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .components-spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
`;

export { ScreenWrapStyle, SingleFormStyle };
