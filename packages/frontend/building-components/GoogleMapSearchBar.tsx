/**
 * Created by yuzheww (Yuzhe Wang) on 03/08/22.
 */

import React from 'react';
import Autocomplete from "react-google-autocomplete";
import {usePlacesWidget} from "react-google-autocomplete";
import {Box, Input, Text, FormErrorMessage} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type changeAddress = {
    setAddress: Function
    setAddressComponents: Function
    width: string
}

type FormData = {
    buildingAddress: string;
}

export default function GoogleMapSearchBar(props: changeAddress) {
    const {ref, autocompleteRef} = usePlacesWidget<HTMLInputElement>({
        apiKey: "AIzaSyCzABcfMCPKX1rEH8BI7D-GP2NABXIcliI",
        onPlaceSelected: (place) => {
            console.log(place);
            // props.setAddress(place.formatted_address);
            props.setAddressComponents(place.address_components);
        },
        options: {
            types: ["address"], // autocomplete address
            componentRestrictions: {country: "us"}, // restricted to united states
        }

    });
    // onChange={(e) => props.setAddress("")}

    const { register, formState: { errors } } = useForm<FormData>();

    const validateAddress = (address: string) => {
        if (address.length === 0) {
            return "Building address is required";
        }
    }

    return (
        <Box width={"100%"}>
            <FormErrorMessage>
                {errors.buildingAddress && <Text color="red.500">{errors.buildingAddress.message}</Text>}
            </FormErrorMessage>
            <Input
                w={props.width}
                placeholder="Enter the building location"
                {...register("buildingAddress", { 
                    required: "Building address is required",
                    onChange: (e) => props.setAddress(""),
                })}
                ref={ref}
            />
        </Box>
    );
}
