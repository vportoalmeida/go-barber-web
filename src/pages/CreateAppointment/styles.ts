import styled, { css } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  /* width: 100%; */
  @media (max-width: 200px) {
    width: 100px;
    height: 100px;
    flex-direction: row;
  }
`;

export const Header = styled.div`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 900px;
  width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 190vh;
  max-height: 1200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
`;
export const Provider = styled.div``;

export const Select = styled.div`
  select {
    align-items: center;
    background: #232129;
    flex: 1;
    padding: 1.6rem;
    border-radius: 10px;
    text-align: left;
    width: 340px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 56px;
    font-size: 1.6rem;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
      margin-top: 0.8rem;
    }
  }
`;

export const AgendaSelect = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
