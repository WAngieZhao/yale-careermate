import {gql, useMutation, useQuery} from "@apollo/client";

export interface IUser {
    id: string
    email: string
    name: string
    picture: string
    // thumbnail?: string
    // reviews: string[] // TODO
}

export default function useUser() {

    const {data, loading, error, refetch} = useQuery(gql`
        query GetCurrentUser {
            currentUser {
				id
                email
	            name
	            picture
            }
        }
	`, {
        fetchPolicy: "network-only"
    });

    const user: IUser | undefined = (data && data.currentUser) && (<IUser>data.currentUser);

    const [logout] = useMutation(gql`
        mutation Logout {
            googleLogout {
                email
            }
        }
	`);

    function doLogout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            logout().then(() => {
                resolve();
            }).catch(reject);
        });
    }

    return {
        userLoading: loading,
        userError: error,
        user: user,
        logout: doLogout,
        refetchUser: async () => await refetch()
    }
}
