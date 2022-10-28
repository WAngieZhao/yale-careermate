import {Box, Container, Heading, HStack, Image} from "@chakra-ui/react";

export default function Index2() {

    return <>
        <Box
            w={"100%"}
            h={"100vh"}
            bg={"whitesmoke"}
            position={"relative"}
        >
            {/*Background image*/}
            <Image
                position={"absolute"}
                w={"100%"}
                h={"100vh"}
                src={"/assets/apartments.webp"}
                objectFit={"cover"}
                objectPosition={"center"}
                alt={"apartments"}
            />
            <HStack
                pos={"relative"}
                w={"100%"}
                h={"100vh"}
                alignItems={"flex-end"}
            >
                <Box bg={"white"} w={["100%", "60%", "30%"]} h={"100%"}>
                    <Container maxW={"container.lg"}>
                        <Heading size={"lg"}>
                            Text
                        </Heading>
                    </Container>
                </Box>
            </HStack>
        </Box>
    </>
}
