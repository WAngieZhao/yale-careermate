/**
 * Created by brandon-lai (Brandon Lai) on 2/19/22.
 */

import {CloseIcon} from "@chakra-ui/icons";
import React, {useRef, useState} from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import {
    Button,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel,
    FormControl,
    Textarea,
    VisuallyHiddenInput,
    VStack,
    Image,
    Heading,
    HStack, Box, IconButton, Flex,
    Grid, GridItem, Checkbox,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';

// author: string: ID
// building: string: ID
// comment?: string
// bedNum?: number
// bathNum?: number
// leaseLength?: number
// rent?: number
// leaseType?: string

export default function ReviewPage1({ props } : {props:any}) {

    const [images, setImages] = useState<File[]>([]);

    const hiddenFileInput = useRef(null);

    console.log(props);

    return (
        <div>
            <Heading>Page 1: The Basics</Heading><br/>
            <FormControl isRequired>
                <FormLabel>Author: </FormLabel>
                <Input
                    isReadOnly={true}
                    name="author"
                    value={props.formState.authorEmail}
                />
                <br/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Building: </FormLabel>
                <Input
                    isReadOnly={true}
                    name="building"
                    value={props.formState.buildingName}
                />
                <br/>
            </FormControl>

            <FormLabel>Number of Beds: </FormLabel>
            <NumberInput
                name="bedNum"
                onChange={(value) => props.updateData('bedNum', value)}
                colorScheme="brand"
                min={1}
                max={4}
                value={props.formState.bedNum}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <br/>

            <FormLabel>Number of Baths: </FormLabel>
            <NumberInput
                name="bathNum"
                onChange={(value) => props.updateData('bathNum', value)}
                colorScheme="brand"
                min={0}
                max={4}
                value={props.formState.bathNum}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <br/>

            <FormLabel>Lease Length (Months): </FormLabel>
            <Flex>
                <NumberInput
                    name="leaseLength"
                    value={props.formState.leaseLength}
                    onChange={(value) => props.updateData('leaseLength', value)}
                    colorScheme="brand"
                    min={1}
                    max={36}
                    maxW='100px'
                    mr='2rem'
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Slider
                    flex='1'
                    focusThumbOnChange={false}
                    value={props.formState.leaseLength}
                    max={36}
                    onChange={(e) => props.updateData('leaseLength', e)}
                    colorScheme="brand"
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb 
                        fontSize='sm' 
                        boxSize='32px' 
                    >
                        {props.formState.leaseLength}
                    </SliderThumb>
                </Slider>
            </Flex>
            
                
            <br/>
            
            <FormLabel>Rent (USD): </FormLabel>
            <Flex>
            <NumberInput
                name="rent"
                onChange={(value) => props.updateData('rent', value)}
                colorScheme="brand"
                min={0}
                value={props.formState.rent}
                maxW='100px'
                mr='2rem'
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Slider
                    flex='1'
                    focusThumbOnChange={false}
                    value={props.formState.rent}
                    max={10000}
                    min={0}
                    onChange={(e) => props.updateData('rent', e)}
                    colorScheme="brand"
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb 
                        fontSize='sm' 
                        boxSize='32px' 
                    >
                        {props.formState.rent}
                    </SliderThumb>
                </Slider>
            </Flex>
            <br/>

            <FormLabel>Lease Type: </FormLabel>
            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox 
                        isChecked={props.formState.colease}
                        onChange={(e) => props.updateData('colease', e.target.checked)}
                        colorScheme='brand'
                    >
                        Colease?
                    </Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox 
                        isChecked={props.formState.sublease}
                        onChange={(e) => props.updateData('sublease', e.target.checked)}
                        colorScheme='brand'
                    >
                        Sublease?
                    </Checkbox>
                </GridItem>
            </Grid>

            <FormLabel>Comments: </FormLabel>
            <Textarea
                placeholder="Comments" 
                name="comments"
                onChange={(e) => props.updateData('comment', e.target.value)}
            />
            <br/>

            <FormLabel>Images: </FormLabel>

            <VStack alignItems={"flex-start"}>

                <Button onClick={(e) => {
                    // @ts-ignore
                    hiddenFileInput?.current?.click();
                }}
                    // isLoading={thumbnailLoading}
                >
                    Add Images
                </Button>
                <VisuallyHiddenInput
                    type="file"
                    accept={"image/png, image/jpeg"}
                    multiple
                    ref={hiddenFileInput}
                    onChange={(e) => {
                        // @ts-ignore
                        const files = Array.from(e.target?.files);
                        props.updateData('photos', [...props.formState.photos].concat(files));
                    }}
                    style={{display: 'none'}}
                />
            </VStack>
            <Box maxW={"100%"} overflow={"scroll"}>
                <HStack
                    display={"inline-flex"}
                    overflow={"scroll"}
                    alignItems={"flex-start"}
                >
                    {props.formState.photos.map((i: File, index: number) => <>
                        <Flex
                            position={"relative"}
                            maxW={200}
                            h={100}
                            alignItems={"center"}
                            sx={{
                                "& > button": {
                                    opacity: 0
                                },
                                "&:hover > button": {
                                    opacity: 1
                                }
                            }}
                        >
                            <Image src={URL.createObjectURL(i)} maxW={200} maxH={"100%"} />
                            <IconButton
                                position={"absolute"}
                                left={0}
                                top={0}
                                aria-label={"remove_image"}
                                icon={<CloseIcon/>}
                                // variant={"block"}
                                size={"xs"}
                                borderRadius={"100%"}
                                onClick={() => {
                                    const array = props.formState.photos;
                                    array.splice(index, 1)
                                    props.updateData('photos', array);
                                }}
                            />
                        </Flex>
                    </>)}
                </HStack>
            </Box>
            <br/>

            <Button mb='4' colorScheme='brand' onClick={props.nextButton}>Next</Button>
        </div>
    );
}
