import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/core";
import theme from "../theme";
// import { Provider } from "next-auth/client";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    // <Provider session={pageProps.session}>

    <ReactQueryCacheProvider queryCache={queryCache}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </ReactQueryCacheProvider>
    // </Provider>
  );
}

export default MyApp;
