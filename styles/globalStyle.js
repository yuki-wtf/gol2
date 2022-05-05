import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --infinite-primary: #dbf267;
  --creator-primary: #8aed9b;
  --snapshots-primary: #f06b97;
  --howitworks-primary: #83e8fe;
  --about-primary: #ffceaa;
  --about-secondary: #ffceaa;
}
* {
  box-sizing: border-box;
}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Mulish", sans-serif;
    color:${(props) => props.theme.colors.bodyText};
    background-color:#000; 
    font-size: 16px
  }

  .alink {
  opacity: 1;
}
  .link {
  font-size: 36px;
  text-decoration: none;
  text-transform: uppercase;
  height: 139px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 26px;
  /* background: aqua; */
  margin: 0;
  padding-left: 144px;
}

@media only screen and (max-height: 900px) {
  .link {
    height: 110px;
    font-size: 32px;
  }
}
@media only screen and (max-width: 1000px) {
  .menuCont {
    width: 50% !important;
  }
  .link {
    padding-left: 64px;
  }
}

.descP {
  font-size: 15px;
  line-height: 26px;
  position: relative;
}
.descHeading {
  font-size: 24px;
  font-weight: 800;
  position: relative;
}
.descImg {
  margin-top: 20px;
  position: relative;
}
a {
  text-decoration:none;
}
`;
