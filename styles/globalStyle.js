import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Mulish", sans-serif;
    color:${(props) => props.theme.colors.bodyText};
    font-size: 16px
  }
`;
