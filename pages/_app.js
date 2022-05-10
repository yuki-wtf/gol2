import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import Layout from "../components/layout";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { infinite } from "../styles/themes/infinite";
import Toast from "../components/Toast/Toast";
import { Provider } from "react-redux";
import { store } from "../app/store";
import NextHead from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const connectors = [new InjectedConnector()];

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={infinite}>
          <GlobalStyle />
          <StarknetProvider autoConnect connectors={connectors}>
            <NextHead>
              <title>GoL2 CREATE GAMES - GIVE LIFE - EVOLVE</title>
            </NextHead>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StarknetProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
