import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 4rem 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 2.4rem;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #dd9f3c;
    display: block;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#dd9f3c')};
    }

    svg {
      margin-right: 1.6rem;
    }
  }
`;
export const CreateAccount = styled.div`
  display: flex;
  animation: ${appearFromLeft} 1s;

  > a {
    color: #dd9f3c;
    display: block;
    margin-top: 1.4rem;
    text-decoration: none;
    transition: color 0.2s;
    margin-right: 15px;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#dd9f3c')};
    }
  }
`;

export const ForgotPassword = styled.div`
  a {
    color: whitesmoke;
    display: block;
    margin-top: 1.4rem;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#dd9f3c')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
