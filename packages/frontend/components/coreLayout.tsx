/**
 * Created by jovialis (Dylan Hanson) on 4/8/22.
 */

import {Box, Flex, VStack} from "@chakra-ui/react";
import React from "react";
import CoreFooter from "./coreFooter";
import CoreHeader from "./coreHeader";

export interface ICoreLayoutProps {
	children: React.ReactChild | React.ReactChild[]
}

export default function CoreLayout(props: ICoreLayoutProps) {
	return <>
		<Flex
			flexDir={"column"}
			minH={"100vh"}
			w={"100%"}
			alignItems={"stretch"}
			justifyContent={"stretch"}
		>
			<CoreHeader/>
			<Box
				bg={"gray.50"}
				flex={1}
			>
				{props.children}
			</Box>
			<CoreFooter/>
		</Flex>
	</>
}
