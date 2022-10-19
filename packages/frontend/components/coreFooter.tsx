import {Box, Container, HStack, Link, Text, VStack} from "@chakra-ui/react";
import NextLink from "next/link";
import CareermateLogo from "./careermateLogo";

export interface ICoreFooterProps {

}

export default function CoreFooter(props: ICoreFooterProps) {

    return <>
        <Box bg={"gray.100"} py={10}>
            <Container maxW={"container.lg"}>
                <VStack alignItems={"center"} spacing={5}>
                    <HStack>
                        <Box>
                            <CareermateLogo fill={"gray.400"}/>
                        </Box>
                    </HStack>
                    {/*<HStack spacing={5}>*/}
                    {/*	<NextLink href={"/about"}>*/}
                    {/*		<Link>*/}
                    {/*			<Text textColor={"gray.400"}>*/}
                    {/*				About*/}
                    {/*			</Text>*/}
                    {/*		</Link>*/}
                    {/*	</NextLink>*/}
                    {/*	<NextLink href={"/about"}>*/}
                    {/*		<Link>*/}
                    {/*			<Text textColor={"gray.400"}>*/}
                    {/*				Privacy*/}
                    {/*			</Text>*/}
                    {/*		</Link>*/}
                    {/*	</NextLink>*/}
                    {/*	<NextLink href={"/about"}>*/}
                    {/*		<Link>*/}
                    {/*			<Text textColor={"gray.400"}>*/}
                    {/*				FAQ*/}
                    {/*			</Text>*/}
                    {/*		</Link>*/}
                    {/*	</NextLink>*/}
                    {/*</HStack>*/}
                    <Text textColor={"gray.400"} fontSize={"xs"}>Copyright 2022, Yale CareerMate Team</Text>
                </VStack>

            </Container>

        </Box>
    </>
}
