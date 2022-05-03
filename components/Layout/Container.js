import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.colors.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default Container;
