import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 3rem;
  overflow: hidden;
  @media (max-width: 700px) {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-top: 90%;
  }
`;
