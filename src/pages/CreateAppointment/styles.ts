import styled from 'styled-components';
import signUpBackgroundImg from '../../assets/sign-up.jpg';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;

export const Header = styled.div`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
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
    width: 350px;
    margin-top: 10px;
    margin-bottom: 10px;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
      margin-top: 0.8rem;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
