import styled, { css } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImg from '../../assets/sign-in-background.png';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
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

export const Content = styled.div``;

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

export const Calendar = styled.aside`
  padding: 0px;
  max-width: 350px;
  width: 560px;
  height: 500px;
  margin-top: 50px;

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

export const OpenDatePickerButton = styled.div`
  height: 46px;
  background: #ff9000;
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

export const Schedule = styled.div``;
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
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;
export const HourText = styled.div<HourTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;
