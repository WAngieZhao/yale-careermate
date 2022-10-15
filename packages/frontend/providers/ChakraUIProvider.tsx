/**
 * Created by jovialis (Dylan Hanson) on 2/11/22.
 */

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
	fonts: {
		heading: "Hind, sans-serif",
		body: "Hind, sans-serif"
	},
	colors: {
		brand: {
			50: "#c7e6ef",
			100: "#b6dcf1",
			200: "#9ed3ef",
			300: "#79c3ea",
			400: "#5cb7e8",
			500: "#44ace5",
			600: "#2795d2",
			700: "#127ebb",
			800: "#096598",
			900: "#023d5e",
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
			<Global styles={GlobalStyles} />
			{props.children}
		</ChakraProvider>
	</>
}
