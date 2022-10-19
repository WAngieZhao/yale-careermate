import {gql, useLazyQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

export interface IAutocompleteResult {
    id: string;
    name: string;
    company: string;
}

export default function useUserAutocomplete(results: number) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState<IAutocompleteResult[]>([]);

    // Load an existing query from the search bar
    useEffect(() => {
        if (router.isReady) {
            let name = router.query.searchTerm ? router.query.searchTerm.toString() : "";
            // console.log(name)
            setSearchTerm(name);
        }
    }, [router])

    // Query to look for autocomplete options
    const [getUserName] = useLazyQuery(gql`
        query advancedUserSearch ($searchTerm : String!) {
            advancedUserSearch(searchTerm: $searchTerm) {
                id
                name
                company
            }
        }
	`);


    // Update the autocomplete results
    useEffect(() => {
        // Ignore null results
        if (searchTerm.trim().length === 0) {
            setAutocompleteResults([]);
            return;
        }

        getUserName({
            variables: {
                searchTerm: searchTerm,
            }
        })
            .then((result) => {
                console.log("creating options")
                setAutocompleteResults(result.data.advancedUserSearch.slice(0, results));
            })
            .catch(e => {
                console.log(e.message)
            })
    }, [searchTerm]);

    return {
        users: autocompleteResults,
        searchTerm,
        setSearchTerm
    };
}

// export default function BuildingSearchBar() {
// 	const router = useRouter();
//
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [autocompleteResults, setAutocompleteResults] = useState<IAutocompleteResult[]>([]);
//
//     // Load an existing query from the search bar
// 	useEffect(() => {
// 		if (router.isReady) {
// 			let name = router.query.searchTerm ? router.query.searchTerm.toString() : "";
// 			setSearchTerm(name);
// 		}
// 	}, [router.isReady])
//
//     // Query to look for autocomplete options
//     const [getBuildingName] = useLazyQuery(gql`
//         query SearchBuilding ($buildingName : String!) {
//             buildingSearch(buildingName: $buildingName) {
//                 buildingName
//                 buildingAddress
//             }
//         }
// 	`);
//
//     // Handle submitting the form
// 	function doSearch() {
// 		if (searchTerm.trim().length === 0) {
// 			// TODO: Show error
// 			return;
// 		}
//
// 		// Push to the Search results page
// 		router.push({
// 			pathname: '/search',
// 			query: {
// 				searchTerm
// 			}
// 		});
// 	}
//
//     // Update the autocomplete results
// 	useEffect(() => {
// 		// Ignore null results
// 		if (searchTerm.trim().length === 0) {
// 			setAutocompleteResults([]);
// 			return;
// 		}
//
// 		getBuildingName({
// 			variables: {
// 				buildingName: searchTerm,
// 			}
// 		})
// 			.then((result) => {
// 				console.log("creating options")
// 				const NUM_SUGGESTION = 3;
// 				setAutocompleteResults(result.data.buildingSearch.slice(0, NUM_SUGGESTION));
// 			})
// 			.catch(e => {
// 				console.log(e.message)
// 			})
// 	}, [searchTerm]);
//
// 	return (
// 		<Box w={"full"}>
// 				<HStack>
// 						{/*<FormLabel fontSize={"xl"}>Building</FormLabel>*/}
// 						<Input list={"namesOption"}
// 						       id={"search_bar"}
// 						       type={"text"}
// 						       placeholder="Enter building name or address"
// 						       name="building name"
// 						       value={searchTerm}
// 						       onChange={e => setSearchTerm(e.target.value)}/>
// 						<datalist id={"namesOption"}>
// 							{/*autocompletion options will be added here*/}
// 							{autocompleteResults.length !== 0 ? autocompleteResults.map((option, index) =>
// 								<option key={index} value={option.buildingName}>{option.buildingAddress}</option>
// 							) : null}
// 						</datalist>
// 					<Button colorScheme="brand" type="submit" w={"20%"}>Search</Button>
// 				</HStack>
// 			<Text fontSize={"sm"} pt='1'>{"Didn't find the building you are looking for?"} <b><Link
// 				href="/building/add"><a> Add a building
// 				here! </a></Link></b></Text>
// 			{/*</Box>*/}
// 		</Box>
// 	);
// }
