import type {NextPage} from 'next'
import BuildingSearchBar from "../../building-components/BuildingSearchBar";
import React from "react";
import {Box} from "@chakra-ui/react"
import NavBar from "../../shared-components/NavBar";

const Building: NextPage = () => {
    return (
        <Box w={"full"}>
            <NavBar/>
            <BuildingSearchBar/>
        </Box>
    )
}

export default Building
