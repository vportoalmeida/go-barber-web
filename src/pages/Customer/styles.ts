import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const Header = styled.header`
  padding: 2.2rem;
  background: #28262e;
  align-items: center;
  display: flex;
  @media (max-width: 650px) {
    width: 105%;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1900px;
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0 auto;
  @media (max-width: 650px) {
    width: 100%;
    margin: 0 auto;
    max-height: 50px;
    > h1 {
      display: none;
    }
  }
  > img {
    height: 100px;
  }

  > h1 {
    margin-left: 20px;
  }

  button {
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      margin-left: 10px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#999591')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-left: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1.8rem;
    line-height: 2.4rem;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #dd9f3c;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Body = styled.div`
  margin-top: 8rem;
`;

export const BodyContent = styled.div`
  max-width: 1900px;
  display: column;
  align-items: center;
  margin-left: 0 auto;

  @media (max-width: 600px) {
    margin-bottom: 0px;
    width: 100%;
    justify-content: center;
    margin-top: -60px;
    padding-right: 3%;
  }
  @media (min-width: 500px) {
    margin-bottom: 0px;
    margin-left: 8%;
    width: 100%;
    justify-content: space-around;
    margin-top: 60px;
  }
`;

export const Agendamentos = styled.div`
  margin-top: 6.4rem;
  width: 1000px;
  margin-left: 0 auto;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    text-align: center;
  }

  > strong {
    color: #999591;
    font-size: 3rem;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1.6rem 2.4rem;
    border-radius: 1rem;
    margin-top: 2.4rem;
    position: relative;
    justify-content: space-between;
    max-width: 700px;

    @media (max-width: 600px) {
      width: 100%;
      margin-left: 0;
    }

    &::before {
      position: absolute;
      height: 100%;
      width: 5px;
      left: 0;
      content: '';
      background: #dd9f3c;
      @media (max-width: 600px) {
      }
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      justify-content: space-between;
      width: 200px;
      @media (max-width: 600px) {
        width: 300px;
      }
      svg {
        color: #dd9f3c;
        margin-right: 0;
        margin-left: 0.4rem;
      }
    }

    button {
      margin-left: 0 auto;
      display: flex;
      background: #3e3b47;
      border: none;
      margin-left: 5%;
      svg {
        color: #b03600;
        margin-right: 0.8rem;
        &:hover {
          color: ${shade(0.2, '#999591')};
        }
        @media (max-width: 600px) {
          margin-left: 0;
          width: 25px;
          height: 25px;
        }
      }
      @media (max-width: 600px) {
        margin-left: 0;
      }
    }
  }
`;

export const Schedule = styled.div`
  max-width: 900px;
  margin-left: 0 auto;
  position: relative;
  flex: 1;

  @media (max-width: 600px) {
    margin-bottom: 10px;
    justify-content: center;
    width: 100%;
    margin: 5%;
  }

  h1 {
    font-size: 3.6rem;
  }

  p {
    margin-top: 0.8rem;
    color: #dd9f3c;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #dd9f3c;
      margin: 0 0.9rem;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 6.4rem;
  width: 500px;
  margin-left: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
  }

  > strong {
    color: #999591;
    font-size: 2rem;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1.6rem 2.4rem;
    border-radius: 1rem;
    margin-top: 2.4rem;
    position: relative;

    &::before {
      position: absolute;
      height: 90%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #dd9f3c;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 2.4rem;
      color: #fff;
    }

    span {
      margin-left: 0 auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #dd9f3c;
        margin-right: 0.8rem;
      }
    }
  }
`;

export const ButtonApointment = styled.section`
  width: 34rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Section = styled.section`
  margin-top: 5.8rem;

  > strong {
    color: #999591;
    font-size: 2rem;
    line-height: 2.6rem;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    width: 300px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  margin-left: 0 auto;

  & + div {
    margin-top: 1.6rem;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 0.8rem;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1.6rem 2.4rem;
    border-radius: 1rem;
    margin-left: 1.4rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 2.4rem;
      color: #fff;
      font-size: 2rem;
    }
  }
`;
