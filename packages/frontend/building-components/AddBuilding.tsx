/**
 * Created by yuzheww (Yuzhe Wang) on 2/28/22.
 */

import React, {useState} from 'react';
import {useMutation, gql} from '@apollo/client';
import GoogleMapSearchBar from "./GoogleMapSearchBar";
import {useRouter} from "next/router";
import {Box, VStack, Heading, FormLabel, FormControl, FormErrorMessage} from "@chakra-ui/react"

import {Button, Input, Text} from '@chakra-ui/react';


import {useForm} from "react-hook-form";
import PopoverSearchOptions from "./PopoverSearchOptions";

type FormData = {
    buildingName: string;
    buildingAddress: string;
    buildingCity: string;
    buildingState: string;

}

export default function AddBuilding() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit = handleSubmit((data) => {
        console.log("submit Pressed" + buildingName, buildingAddress, buildingCity, buildingState);
        console.log(buildingAddress);
        console.log(data);
        addBuilding({
            variables: {
                buildingName: buildingName,
                buildingAddress: buildingAddress,
                buildingCity: buildingCity,
                buildingState: buildingState
            }
        }).then((data) => {
            console.log(data)
            const name = data.data.createBuilding.id
            router.push({
                pathname: `/buildings/${name}`,
            })
        }).catch((e) => {
            console.log(e.message)
            setErrorMsg(findError(e.message));
        })
    });


    const [buildingAddress, setBuildingAddress] = useState('');
    const [buildingCity, setBuildingCity] = useState('');
    const [buildingState, setBuildingState] = useState('');
    const [buildingName, setBuildingName] = useState('');


    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter()

    const CREATE_BUILDING_QUERY = gql`
         mutation createBuilding($buildingName: String!, $buildingAddress: String!, $buildingCity: String!, $buildingState: String!) { 
             createBuilding(buildingName: $buildingName, buildingAddress: $buildingAddress, buildingCity: $buildingCity, buildingState: $buildingState) {
                 id
                 buildingName
                 buildingAddress
                 buildingCity
                 buildingState
             }
         }
     `;

    const addressSelected = (buildingAddressComponentsProp: any) => {
        var cityIndex = 0;
        var stateIndex = 0;
        var streetIndex = 0;

        console.log(JSON.stringify(buildingAddressComponentsProp));
        for (let i = 0; i < buildingAddressComponentsProp.length; ++i) {
            if (buildingAddressComponentsProp[i].types[0] === 'locality') {
                cityIndex = i;
                // console.log(i);
            } else if (buildingAddressComponentsProp[i].types[0] === 'administrative_area_level_1') {
                stateIndex = i;
                // console.log(i);
            } else if (buildingAddressComponentsProp[i].types[0] === 'route') {
                streetIndex = i;
            }
        }

        setBuildingCity(buildingAddressComponentsProp[cityIndex]["long_name"]);
        setBuildingState(buildingAddressComponentsProp[stateIndex]["short_name"]);
        setBuildingAddress(buildingAddressComponentsProp[streetIndex]["long_name"])
    }

    const [addBuilding, {data, loading, error}] = useMutation(CREATE_BUILDING_QUERY);

    // if (loading) return <p>Loading...</p>;

    const findError = (msg: string) => {
        if (msg.indexOf("duplicate key") != -1) {
            return "Building already exists."
        } else if (msg.indexOf("buildingAddress") != -1) {
            return "Please enter a valid building address (please select from autocompletion)."
        } else if (msg.indexOf("buildingName") != -1) {
            return "Please enter a building name."
        }
        return msg
    }

    return (
        <Box>
            <Box padding={"5%"}>
                <Heading ml={"15%"}>Add a building</Heading>
                <form onSubmit={onSubmit}>
                    <VStack mx={"15%"} p={5}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="buildingAddress">Building Address</FormLabel>
                            <GoogleMapSearchBar
                                width={'100%'}
                                setAddress={setBuildingAddress}
                                setAddressComponents={addressSelected}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="buildingName">Building Name</FormLabel>
                            <FormErrorMessage>
                                {errors.buildingName && <Text color="red.500">{errors.buildingName.message}</Text>}
                            </FormErrorMessage>

                            <PopoverSearchOptions setBuildingName={setBuildingName}/>

                            {/* <Input
                                 type="text"
                                 value={buildingName}
                                 onChange={handleBuildingNameChange}
                                 placeholder="Building name"
                                 // {...register("buildingName", {
                                 //     required: "Please enter a building name.",
                                 //     pattern: /^[A-Za-z]+$/i
                                 // })}
                             /> */}
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="buildingCity">City</FormLabel>
                            <FormErrorMessage>
                                {errors.buildingCity && <Text color="red.500">{errors.buildingCity.message}</Text>}
                            </FormErrorMessage>
                            <Input
                                type="text"
                                placeholder="Building City"
                                value={buildingCity}
                                readOnly
                                // {...register("buildingCity", {
                                //     required: "Please enter a building city.",
                                //     pattern: /^[A-Za-z]+$/i
                                // })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="buildingState">State</FormLabel>
                            <FormErrorMessage>
                                {errors.buildingState && <Text color="red.500">{errors.buildingState.message}</Text>}
                            </FormErrorMessage>
                            <Input
                                type="text"
                                value={buildingState}
                                placeholder="Building State"
                                readOnly
                                // {...register("buildingState", {
                                //     required: "Please enter a building state.",
                                //     pattern: /^[A-Za-z]+$/i
                                // })}
                            />
                        </FormControl>


                        <Button
                            colorScheme='brand'
                            type="submit"
                        >
                            Add apartment
                        </Button>


                    </VStack>
                </form>
                {errorMsg ? <Text pl={5}>{errorMsg}</Text> : null}

            </Box>
        </Box>
    )
        ;
}
