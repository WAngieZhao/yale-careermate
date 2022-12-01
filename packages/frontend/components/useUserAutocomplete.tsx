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
