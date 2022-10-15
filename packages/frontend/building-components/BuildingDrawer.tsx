import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import {
    Container,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure, Box, Text,
    Grid,
    GridItem,
    Checkbox, Spacer, HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Divider, Input,
    Select
} from "@chakra-ui/react";
import {ParsedUrlQueryInput} from "querystring";


interface Query {
    totalScore?: number;
    envScore?: number;
    secScore?: number;
    searchTerm?: string;
    city?: string;
    state?: string;
    required?: Array<string>;
}

export default function BuildingDrawer() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [show, setShow] = useState(false);
    const [checkedItems, setCheckedItems] = useState([false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false])

    const [overallScore, setOverall] = useState(2);
    const [secScore, setSec] = useState(2);
    const [envScore, setEnv] = useState(2);

    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [numAvailable, setAvailable] = useState(-1);


    const router = useRouter();
    const map: Array<string> = ["gym", "pool", "elevator", "lounge", "mailRoom", "dogPark", "gatedCommunity",
        "microwave", "stove", "dishwasher", "fridge", "washer", "dryer", "AC", "cableInstalled", "wifiInstalled", "walkInCloset", "balcony",
        "hasParking", "EVCharging", "guestParking", "coveredParking", "reservedSpot", "freeParking",
        "concierge", "frontdesk", "isDisFrd", "cleaningService", "quietHours", "trashPickUp", "staffOnDuty", "maintenanceTeam", "onlyCatDog"]


    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        let requiredList: Array<string> = [];
        checkedItems.forEach((needOrNot, index) => {
            if (needOrNot) {
                requiredList.push(map[index]);
            }
        })
        advancedSearch({
            variables: {
                buildingName: searchQuery,
                buildingCity: city,
                buildingState: state,
                fields: requiredList,
                totalScore: overallScore,
                envScore: envScore,
                secScore: secScore
            }
        }).then((result) => {
            // console.log("in THEN")
            // console.log(result.data)
            setAvailable(result.data.advancedBuildingSearch.length);

        })
            .catch(e => {
                console.log("there is an error")
                console.log(e.message)
            });
    }, [checkedItems, overallScore, secScore, envScore, city, state, searchQuery])

    const ADVANCED_BUILDING_QUERY = gql`
        query advancedBuildingSearch($totalScore : Int!, $envScore : Int!, $secScore : Int!, $buildingName : String!, $buildingCity: String!, $buildingState : String!, $fields : [String!]!)  {
            advancedBuildingSearch(totalScore : $totalScore, envScore : $envScore, secScore : $secScore, buildingName: $buildingName, buildingCity: $buildingCity, buildingState: $buildingState, fields: $fields) {
                id
            }
        }
    `;

    const [advancedSearch] = useLazyQuery(ADVANCED_BUILDING_QUERY);

    if (!show) {
        // You can show some kind of placeholder UI here
        return <></>;
    }

    const setCheckStatus = (index: number, checked: boolean) => {
        const newChecked = [...checkedItems];
        newChecked[index] = checked;
        setCheckedItems(newChecked);
    }




    const filterSearch = () => {
        // console.log(checkedItems);
        // console.log(checkedItems.length)

        let requiredList: Array<string> = [];
        checkedItems.forEach((needOrNot, index) => {
            if (needOrNot) {
                requiredList.push(map[index]);
            }
        })

        // console.log(requiredList);
        let curQuery: Query = {};
        curQuery["totalScore"] = overallScore;
        curQuery["envScore"] = envScore;
        curQuery["secScore"] = secScore;
        if (searchQuery) {
            curQuery["searchTerm"] = searchQuery;
        }
        if (state) {
            curQuery["state"] = state;
        }
        if (city) {
            curQuery["city"] = city;
        }
        if (requiredList.length > 0) {
            curQuery["required"] = requiredList;
        }
        // console.log("query is ")
        // console.log(curQuery)
        onClose();
        router.push(
            {
                pathname: '/search',
                query: curQuery as ParsedUrlQueryInput,
            }
        );
    }

    const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const updateCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }

    const updateState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // setSearchQuery(e.target.value);
        setState(e.target.value);
    }

    return (
        <>
            <Button mt={2} onClick={onOpen}>
                filters
            </Button>
            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size={"sm"}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        <HStack>
                            <Text>Filters</Text> <Spacer/>
                            <Box><Button onClick={onClose}>Close</Button></Box>
                            <Box><Button colorScheme="brand" onClick={filterSearch}>Search</Button></Box>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody mb={5}>
                        {/*section 1-------------------------------------------------------------------------------*/}
                        <HStack>
                            <Text fontSize={"xl"}>SEARCH: </Text>
                            <Spacer/>
                            {numAvailable !== -1 ? <Text>{numAvailable} available</Text> : null}
                        </HStack>

                        <Box mx={"5%"}>
                            <Input id={"drawer_search_bar"}
                                   type={"text"}
                                   name="building filter name"
                                   value={searchQuery}
                                   onChange={(e) => updateQuery(e)}/>
                        </Box>

                        {/*section 2-------------------------------------------------------------------------------*/}

                        <Text fontSize={"xl"} mt={5}>LOCATION: </Text>
                        <Divider/>
                        <HStack mx={"5%"} p={2}>
                            <Input id={"city_search_bar"}
                                   type={"text"}
                                   placeholder={"City"}
                                   w={"70%"}
                                   name="building filter city"
                                   value={city}
                                   onChange={(e) => updateCity(e)}/>
                            <Select placeholder='Select' w={"30%"} value={state} onChange={(e) => updateState(e)}>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AZ">AZ</option>
                                <option value="AR">AR</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="DC">DC</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="IA">IA</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="ME">ME</option>
                                <option value="MD">MD</option>
                                <option value="MA">MA</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MS">MS</option>
                                <option value="MO">MO</option>
                                <option value="MT">MT</option>
                                <option value="NE">NE</option>
                                <option value="NV">NV</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NY">NY</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VT">VT</option>
                                <option value="VA">VA</option>
                                <option value="WA">WA</option>
                                <option value="WV">WV</option>
                                <option value="WI">WI</option>
                                <option value="WY">WY</option>
                            </Select>
                        </HStack>

                        {/*section 3-------------------------------------------------------------------------------*/}
                        <Text fontSize={"xl"} mt={5}>SCORES: </Text>
                        <Divider/>
                        <Text ml={2}>Overall: </Text>
                        <Slider colorScheme="brand" ml={"10%"} w={"80%"} defaultValue={overallScore} min={0} max={4}
                                step={1}
                                onChange={(val) => setOverall(val)}>
                            <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                                0
                            </SliderMark>
                            <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                                1
                            </SliderMark>
                            <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                                2
                            </SliderMark>
                            <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                                3
                            </SliderMark>
                            <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                                4
                            </SliderMark>
                            <SliderTrack>
                                {/*<Box position='relative' right={10} />*/}
                                <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb boxSize={3}/>
                        </Slider>
                        <Text ml={2} mt={5}>Environment: </Text>
                        <Slider colorScheme="brand" ml={"10%"} w={"80%"} defaultValue={envScore} min={0} max={4}
                                step={1}
                                onChange={(val) => setEnv(val)}>
                            <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                                0
                            </SliderMark>
                            <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                                1
                            </SliderMark>
                            <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                                2
                            </SliderMark>
                            <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                                3
                            </SliderMark>
                            <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                                4
                            </SliderMark>
                            <SliderTrack>
                                {/*<Box position='relative' right={10} />*/}
                                <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb boxSize={3}/>
                        </Slider>
                        <Text ml={2} mt={5}>Security: </Text>
                        <Slider colorScheme="brand" ml={"10%"} w={"80%"} defaultValue={secScore} min={0} max={4}
                                step={1}
                                onChange={(val) => setSec(val)}>
                            <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                                0
                            </SliderMark>
                            <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                                1
                            </SliderMark>
                            <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                                2
                            </SliderMark>
                            <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                                3
                            </SliderMark>
                            <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                                4
                            </SliderMark>
                            <SliderTrack>
                                {/*<Box position='relative' right={10} />*/}
                                <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb boxSize={3}/>
                        </Slider>


                        {/*section 4-------------------------------------------------------------------------------*/}
                        {/*features checkboxes*/}
                        <Text mt={7} fontSize={"xl"}>FEATURES: </Text>
                        <Divider/>
                        <Text ml={2} fontSize={"lg"}>Community Amenities: </Text>
                        {/*gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity*/}
                        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[0]}
                                          onChange={(e) => setCheckStatus(0, e.target.checked)}>gym</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[1]}
                                          onChange={(e) => setCheckStatus(1, e.target.checked)}>pool</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[2]}
                                          onChange={(e) => setCheckStatus(2, e.target.checked)}>elevator</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[3]}
                                          onChange={(e) => setCheckStatus(3, e.target.checked)}>lounge</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[4]}
                                          onChange={(e) => setCheckStatus(4, e.target.checked)}>mailroom</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[5]}
                                          onChange={(e) => setCheckStatus(5, e.target.checked)}>dog park</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[6]}
                                          onChange={(e) => setCheckStatus(6, e.target.checked)}>gated
                                    community</Checkbox>
                            </GridItem>
                        </Grid>
                        <Text mt={3} ml={2} fontSize={"lg"}>Indoor Features: </Text>
                        {/*microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony*/}
                        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[7]}
                                          onChange={(e) => setCheckStatus(7, e.target.checked)}>microwave</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[8]}
                                          onChange={(e) => setCheckStatus(8, e.target.checked)}>stove</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[9]}
                                          onChange={(e) => setCheckStatus(9, e.target.checked)}>dishwasher</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[10]}
                                          onChange={(e) => setCheckStatus(10, e.target.checked)}>fridge</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[11]}
                                          onChange={(e) => setCheckStatus(11, e.target.checked)}>washer</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[12]}
                                          onChange={(e) => setCheckStatus(12, e.target.checked)}>dryer</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[13]}
                                          onChange={(e) => setCheckStatus(13, e.target.checked)}>AC</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[14]}
                                          onChange={(e) => setCheckStatus(14, e.target.checked)}>cable</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[15]}
                                          onChange={(e) => setCheckStatus(15, e.target.checked)}>wifi</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[16]}
                                          onChange={(e) => setCheckStatus(16, e.target.checked)}>walk-in
                                    closet</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[17]}
                                          onChange={(e) => setCheckStatus(17, e.target.checked)}>balcony</Checkbox>
                            </GridItem>
                        </Grid>
                        <Text mt={3} ml={2} fontSize={"lg"}>Parking: </Text>
                        {/*hasParking, EVCharging, guestParking, coveredParking, reservedSpot, freeParking*/}
                        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[18]}
                                          onChange={(e) => setCheckStatus(18, e.target.checked)}>parking</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[19]}
                                          onChange={(e) => setCheckStatus(19, e.target.checked)}>EV
                                    charging</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[20]}
                                          onChange={(e) => setCheckStatus(20, e.target.checked)}>guest
                                    parking</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[21]}
                                          onChange={(e) => setCheckStatus(21, e.target.checked)}>covered
                                    parking</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[22]}
                                          onChange={(e) => setCheckStatus(22, e.target.checked)}>reserved
                                    spot</Checkbox>
                            </GridItem>
                            <GridItem mx={3} my={1} w='100%'>
                                <Checkbox isChecked={checkedItems[23]}
                                          onChange={(e) => setCheckStatus(23, e.target.checked)}>free
                                    parking</Checkbox>
                            </GridItem>
                        </Grid>
                        <Text mt={3} ml={2} fontSize={"lg"}>Policies & Services: </Text>
                        {/*concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,*/}
                        {/*petNumMax, onlyCatDog*/}
                        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[24]}
                                                                       onChange={(e) => setCheckStatus(24, e.target.checked)}>concierge</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[25]}
                                                                       onChange={(e) => setCheckStatus(25, e.target.checked)}>front-desk</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[26]}
                                                                       onChange={(e) => setCheckStatus(26, e.target.checked)}>disability
                                friendly</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[27]}
                                                                       onChange={(e) => setCheckStatus(27, e.target.checked)}>cleaning
                                service</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[28]}
                                                                       onChange={(e) => setCheckStatus(28, e.target.checked)}>quiet
                                hours</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[29]}
                                                                       onChange={(e) => setCheckStatus(29, e.target.checked)}>trash
                                pick-up</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[30]}
                                                                       onChange={(e) => setCheckStatus(30, e.target.checked)}>staff
                                on
                                duty</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[31]}
                                                                       onChange={(e) => setCheckStatus(31, e.target.checked)}>maintenance
                                team</Checkbox></GridItem>
                            <GridItem mx={3} my={1} w='100%'><Checkbox isChecked={checkedItems[32]}
                                                                       onChange={(e) => setCheckStatus(32, e.target.checked)}>only
                                cat/dog</Checkbox></GridItem>
                        </Grid>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
