import styled, { css } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImg from '../../assets/sign-in-background.png';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface SelectProps {
  isFocused: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
  enabled: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.div`
  /* width: 100%; */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Header = styled.header`
  padding: 2.2rem;
  background: #28262e;
  align-items: center;
  display: flex;
  margin-left: 0 auto;
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  margin-right: 10px;

  form {
    margin: 4rem 0;

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
  @media (max-width: 600px) {
    margin-bottom: 0px;
    width: 100%;
    justify-content: center;
    margin-top: -60px;
  }
  @media (min-width: 600px) {
    margin-bottom: 0px;
    margin-left: 8%;
    justify-content: space-around;
    margin-top: 60px;
  }
`;

export const Provider = styled.div`
  @media (max-width: 768px) {
    margin-top: -25%;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    margin-top: -150px;
    margin-bottom: 10px;
    align-items: center;
  }
`;

export const Content = styled.div``;

export const Select = styled.div`
  select {
    align-items: center;
    background: #232129;
    flex: 1;
    padding: 1.6rem;
    border-radius: 10px;
    text-align: left;
    width: 350px;
    margin-bottom: 30px;
    height: 56px;
    font-size: 1.8rem;

    border: 2px solid #232129;
    color: whitesmoke;

    /* & + div {
      margin-top: 5.8rem;
    } */
    @media (min-width: 768px) {
      margin-top: 120px;
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
  select .option {
    background-color: red;
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

export const Calendar = styled.aside`
  padding: 0px;
  max-width: 390px;
  width: 400px;
  height: 500px;
  text-align: left;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
    margin: 5%;
  }

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
    background: #dd9f3c !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const OpenDatePickerButton = styled.div`
  height: 46px;
  background: #dd9f3c;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.div`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.div`
  text-align: left;
  margin-top: 5%;
  @media (max-width: 600px) {
    margin-bottom: 10px;
    margin-left: 0 auto;
    justify-content: center;
    width: 100%;
  }
`;
export const Section = styled.div`
  margin-bottom: 24px;
`;
export const Title = styled.div`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;
export const SectionTitle = styled.div`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
  margin: 0 24px 12px;
`;
export const SectionContent = styled.div``;
export const Hour = styled.div<HourProps>`
  padding: 12px;
  background: ${({ selected }) => (selected ? '#dd9f3c' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;
export const HourText = styled.div<HourTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;
