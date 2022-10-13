import styled from 'styled-components'

export const OtpInputWrapper = styled.div`
   height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 100;
    top: 0;
    background-size: cover;
    right: 0;
    left: 0;
    margin:0;
    /* border:2px solid red; */
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    & .otp-input{
        background-color: #fff;
        padding: 2rem 3rem;
    }

    & .input-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    } 

    & .closeIcon{
            position: relative;
            left: 92%;
            /* top: 1rem; */
            cursor: pointer;
        }
`