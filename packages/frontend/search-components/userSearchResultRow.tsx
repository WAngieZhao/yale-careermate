import {Text, Box,Image as ChakraImage} from "@chakra-ui/react"
import {Link, Flex, Spacer} from "@chakra-ui/react"
import React from 'react';


type UserBasicProps = {
    id: string,
    email: string
    name: string
    contact_email: string
    status: string
    company: string
    picture: string
}

export default function UserSearchResultRow(props: UserBasicProps) {

    let {id, email, name, contact_email, status, company, picture} = props;
    return (
        <Box p={2} borderWidth={'3px'} borderRadius={6} m={4} _hover={{bg: "gray.50"}}>
                <Box p={2}>
                <Flex>
                <Box ml='3'>
                    <Text fontSize='l'> <Text as='b'><Link href={`/user/${id}`} isExternal> {name}</Link></Text></Text>

                    {/*<Text fontWeight='bold'> {name}</Text>*/}
                    {/*<Text fontSize='sm'>{company}</Text>*/}
                    {/*<Badge ml='1' colorScheme='green'>*/}
                        {/*validateStatus(status)*/}
                    {/*</Badge>*/}
                </Box>
                <Spacer />
                <Box ml='3'>
                    <Text fontSize='l'> {company}</Text>
                </Box>
                </Flex>
                </Box>
        </Box>
    );
}
