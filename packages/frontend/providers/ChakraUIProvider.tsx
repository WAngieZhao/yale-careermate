import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {Global, css} from "@emotion/react";
import React from "react";

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */

  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const theme = extendTheme({
    // fonts: {
    // 	heading: "Hind, sans-serif",
    // 	body: "Hind, sans-serif"
    // },
    colors: {
        brand: {
            50: "#addbe8",
            100: "#8ec7e7",
            200: "#75bce1",
            300: "#59aeda",
            400: "#44a1d3",
            500: "#2389c2",
            600: "#1471a4",
            700: "#0a6091",
            800: "#065079",
            900: "#01314b",
        },
    },
    components: {
        Link: {
            baseStyle: {
                "&:hover": {
                    textDecoration: "none"
                }
            }
        }
    }
});

export interface IChakraUIProviderProps {
    children: React.ReactChild
}

export default function ChakraUIProvider(props: IChakraUIProviderProps) {
    return <>
        <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles}/>
            {props.children}
        </ChakraProvider>
    </>
}
