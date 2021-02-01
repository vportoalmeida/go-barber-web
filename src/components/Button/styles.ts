import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #dd9f3c;
  height: 56px;
  width: 100%;
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
