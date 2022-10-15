import '../styles/globals.css'
import '@fontsource/hind/400.css'
import type { AppProps } from 'next/app';
import ApolloGraphQLProvider from "../providers/ApolloGraphQLProvider";
import ChakraUIProvider from "../providers/ChakraUIProvider";
import 'focus-visible/dist/focus-visible';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <ApolloGraphQLProvider>
      <ChakraUIProvider>
        <Component {...pageProps} />
      </ChakraUIProvider>
    </ApolloGraphQLProvider>
  </>
}

export default MyApp
