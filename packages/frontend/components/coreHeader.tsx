import {SearchIcon} from "@chakra-ui/icons";
import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    LinkBox,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    Menu,
    PopoverTrigger,
    Text,
    VStack,
    MenuButton,
    MenuList,
    MenuItem,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    MenuGroup, useToast
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {List, Map, Search, User} from "react-feather";
import NextLink from "next/link";
import useUser, {IUser} from "./useUser";
import CareermateLogo from "./careermateLogo";
import useUserAutocomplete from "./useUserAutocomplete";

export interface ICoreHeaderProps {

}

export default function CoreHeader(props: ICoreHeaderProps) {
    const router = useRouter();
    const toaster = useToast();

    // Autocomplete for the search bar
    const {searchTerm, setSearchTerm, users} = useUserAutocomplete(3);
    const [searchFocused, setSearchFocused] = useState(false);

    // User for the header
    const {user, userError, userLoading, logout} = useUser();

    // Handle search
    function doSearch() {
        if (searchTerm.trim().length === 0) {
            return;
        }

        router.push({
            pathname: '/search',
            query: {
                searchTerm,
            },
        })
    }

    // user = (<IUser> user)
    // const usere: IUser | undefined = user && ((IUser) user);
    // user  = (IUser) user
    // console.log('in the header')
    // console.log(user)
    // if (user) {
    // 	const ni: IUser = (user as IUser)
    // 	console.log(`user is HERE ${ni.email}`)
    // }

    return <>
        <Box
            bg={"brand.500"}
            py={5}
        >
            <Container maxW={"container.xl"}>
                <HStack
                    alignItems={"center"}
                    spacing={10}
                    justifyContent={"stretch"}
                >
                    <NextLink href={'/'}>
                        <Link>
                            <CareermateLogo fill={"brand.50"}/>
                        </Link>
                    </NextLink>
                    <HStack
                        flexGrow={1}
                        spacing={0}
                    >
                        <Popover
                            isOpen={searchFocused && users.length > 0}
                            autoFocus={false}
                            closeDelay={1000}
                            matchWidth
                        >
                            <PopoverTrigger>
                                <InputGroup size={"md"}>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        // children={<Icon as={Search}/>}
                                    ><Icon as={Search}/></InputLeftElement>
                                    <Input
                                        size={"md"}
                                        variant={"flushed"}
                                        bg={"gray.50"}
                                        placeholder={"Yale University"}
                                        color={"black"}
                                        value={searchTerm}
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        onKeyUp={e => {
                                            e.preventDefault();
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                doSearch();
                                            }
                                        }}
                                        sx={{
                                            "&:focus": {
                                                borderColor: "brand.800",
                                                boxShadow: "none"
                                            }
                                        }}
                                    >

                                    </Input>
                                    {/*<InputRightElement children={*/}
                                    {/*	<Icon as={Map}/>*/}
                                    {/*} />*/}
                                </InputGroup>
                            </PopoverTrigger>
                            <PopoverContent
                                w={"100%"}
                                bg={"gray.50"}
                                boxShadow={"md"}
                                borderRadius={0}
                                onFocus={() => setSearchFocused(true)}
                            >
                                <PopoverHeader>
                                    <Text fontWeight={"bold"}>
                                        Search Suggestions
                                    </Text>
                                </PopoverHeader>
                                <PopoverBody p={0}>
                                    <VStack
                                        spacing={0}
                                        divider={<Divider/>}
                                        justifyContent={"flex-start"} alignItems={"flex-start"}
                                    >
                                        {users.map((b, index) =>
                                            <NextLink
                                                key={index}
                                                href={`/user/${b.id}`}
                                            >
                                                <LinkBox
                                                    w={"100%"}
                                                    py={2}
                                                    px={4}
                                                    sx={{
                                                        "&:hover": {
                                                            cursor: "pointer",
                                                            bg: "gray.100"
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        router.push(`/user/${b.id}`);
                                                    }}
                                                >
                                                    <HStack spacing={5} w={"100%"} justifyItems={"stretch"}>
                                                        <Avatar size={"xs"} name={b.name}/>
                                                        <Text fontWeight={"bold"}>
                                                            {b.name}
                                                        </Text>
                                                        <Text textAlign={"right"} flexGrow={1}>
                                                            {b.company}
                                                        </Text>
                                                    </HStack>
                                                </LinkBox>
                                            </NextLink>
                                        )}
                                    </VStack>

                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        <Button
                            size={"md"}
                            variant={"solid"}
                            borderRadius={0}
                            bg={"brand.700"}
                            textColor={"white"}
                            px={10}
                            onClick={() => doSearch()}
                            sx={{
                                "&:hover": {
                                    bg: "brand.600"
                                }
                            }}
                        >
                            Search
                        </Button>
                    </HStack>
                    <HStack>

                        {(userLoading || userError) && <>
                            <CircularProgress
                                size={5}
                                color={"brand.800"}
                                isIndeterminate
                            />
                        </>}
                        {(!userLoading && !userError && !user) && <>
                            <NextLink href={'/'}>
                                <Link>
                                    <Button
                                        aria-label={"login"}
                                        leftIcon={<User/>}
                                        color={"white"}
                                        colorScheme={"brand"}
                                        size={"md"}
                                        borderRadius={0}
                                        borderWidth={1}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </NextLink>
                        </>}
                        {user && <>
                            <Menu
                                placement={"bottom"}
                            >
                                <MenuButton
                                    as={Button}
                                    aria-label={"user"}
                                    icon={<User/>}
                                    variant={"unstyled"}
                                    color={"brand.50"}
                                >
                                    <Avatar size={"sm"} name={user.name} src={user.picture}/>
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title={user?.email}>
                                        <Link href={`/user/${user.id}`}>
                                            <MenuItem icon={<Icon as={User} height={5} width={"auto"}/>}>
                                                Account
                                            </MenuItem>
                                        </Link>
                                        {/* TODO: edit profile*/}
                                        <Link href={`/edit/${user.id}`}>
                                            <MenuItem icon={<Icon as={User} height={5} width={"auto"}/>}>
                                                Edit
                                            </MenuItem>
                                        </Link>
                                    </MenuGroup>
                                    <MenuDivider/>
                                    <Box px={2}>
                                        <Button
                                            size={"sm"}
                                            colorScheme={"red"}
                                            onClick={() => {
                                                logout().then(() => {
                                                    router.reload()
                                                }).catch(err => {
                                                    console.log(err);
                                                    toaster({
                                                        title: "Error logging out",
                                                        description: "Something went wrong when logging you out.",
                                                    })
                                                })
                                            }}
                                            isFullWidth
                                        >
                                            Logout
                                        </Button>
                                    </Box>
                                </MenuList>
                            </Menu>
                        </>}
                    </HStack>
                </HStack>
            </Container>
        </Box>
    </>
}
