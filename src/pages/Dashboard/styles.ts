import styled from 'styled-components';
import { shade } from 'polished';
import 'px2vw';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 2.2rem;
  background: #28262e;
  align-items: center;
  display: flex;
  margin-left: 0 auto;
`;

export const HeaderContent = styled.div`
  max-width: 1900px;
  width: 1500px;
  width: ${px2vw(32)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    height: 100px;
  }

  > h1 {
    margin-left: 50px;
  }

  button {
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
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
  margin-right: 0 auto;
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
    margin-left: 1.6rem;
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

export const Content = styled.main`
  max-width: 1200px;
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  justify-content: space-between;
`;

export const Schedule = styled.div`
  max-width: 500px;
  margin-top: 15px;
  margin-left: 10px;
  position: relative;
  flex: 1;
  margin-right: 10rem;

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
export const BtnAgendar = styled.section`
  background: #dd9f3c;
  height: 56px;
  width: 120px;
  border-radius: 10px;
  border: 0;
  padding: 0 1.6rem;
  color: #312e38;
  font-weight: 500;
  margin-top: 1.6rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#dd9f3c')};
  }
`;

export const Appointment = styled.div`
  display: block;
  align-items: center;

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
    margin-left: 2.4rem;

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

export const Calendar = styled.aside`
  width: 380px;
  margin-left: 10px;
  padding: 0px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
