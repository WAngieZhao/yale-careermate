/**
 * Created by jovialis (Dylan Hanson) on 2/4/22.
 */

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link: createUploadLink({
        uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
        credentials: "include"
    })
});

export interface IApolloProviderProps {
    children: JSX.Element
}

export default function ApolloGraphQLProvider(props: IApolloProviderProps) {
    return <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
}
