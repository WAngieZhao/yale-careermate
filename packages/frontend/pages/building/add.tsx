import type {NextPage} from 'next'
import AddBuilding from "../../building-components/AddBuilding";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/apartmate_full_logo.png";
import React from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "../../shared-components/NavBar";
import CoreLayout from '../../components/coreLayout';

const AddBuildingPage: NextPage = () => {
    return (     
        <CoreLayout>
            <AddBuilding/>
        </CoreLayout>
    )
}

export default AddBuildingPage
