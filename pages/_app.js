import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import Layout from "../components/layout";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { infinite } from "../styles/themes/infinite";
import Toast from "../components/Toast/Toast";

function MyApp({ Component, pageProps }) {
  const connectors = [new InjectedConnector()];
  console.log(connectors);
  return (
    <>
      <Toast.Provider>
        <ThemeProvider theme={infinite}>
          <GlobalStyle />
          <StarknetProvider autoConnect connectors={connectors}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StarknetProvider>
        </ThemeProvider>
      </Toast.Provider>
    </>
  );
}

export default MyApp;
