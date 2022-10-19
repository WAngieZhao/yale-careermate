import {Box, Heading, HStack, Icon} from "@chakra-ui/react";
import Logo from "../assets/cm_icon.svg";

export interface IApartmateLogoProps {
    fill: string
}

export default function CareermateLogo(props: IApartmateLogoProps) {
    return <>
        <HStack
            flexDir={"row"}
            alignItems={"flex-end"}
            mb={2}
        >
            <Icon
                as={Logo}
                w={10}
                h={"auto"}
                fill={props.fill}
            />
            <Box>
                <Heading
                    size={"md"}
                    color={props.fill}
                >
                    careermate
                </Heading>
            </Box>
        </HStack>
    </>
}