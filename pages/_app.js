import "../styles/globals.css";
import theme from "../theme";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
