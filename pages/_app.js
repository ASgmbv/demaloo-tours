import "../styles/globals.css";
import theme from "../theme";
// import { Provider } from "next-auth/client";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { ChakraProvider } from "@chakra-ui/core";

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    // <Provider session={pageProps.session}>

    <ReactQueryCacheProvider queryCache={queryCache}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </ReactQueryCacheProvider>
    // </Provider>
  );
}

export default MyApp;
