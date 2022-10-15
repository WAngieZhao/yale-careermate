/**
 * Created by jovialis (Dylan Hanson) on 4/8/22.
 */

import {Box, Container, HStack, Link, Text, VStack} from "@chakra-ui/react";
import ApartmateLogo from "./apartmateLogo";
import NextLink from "next/link";

export interface ICoreFooterProps {

}

export default function CoreFooter(props: ICoreFooterProps) {

	return <>
		<Box bg={"gray.100"} py={10}>
			<Container maxW={"container.lg"}>
				<VStack alignItems={"center"} spacing={5}>
					<HStack>
						<Box>
							<ApartmateLogo fill={"gray.400"}/>
						</Box>
					</HStack>
					<HStack spacing={5}>
						<NextLink href={"/about"}>
							<Link>
								<Text textColor={"gray.400"}>
									About
								</Text>
							</Link>
						</NextLink>
						<NextLink href={"/about"}>
							<Link>
								<Text textColor={"gray.400"}>
									Privacy
								</Text>
							</Link>
						</NextLink>
						<NextLink href={"/about"}>
							<Link>
								<Text textColor={"gray.400"}>
									FAQ
								</Text>
							</Link>
						</NextLink>
					</HStack>
					<Text textColor={"gray.400"} fontSize={"xs"}>Copyright 2022, Apartmate LLC</Text>
				</VStack>

			</Container>

		</Box>
	</>
}
