/**
 * Created by jovialis (Dylan Hanson) on 4/13/22.
 */

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
    // const {data, loading, error, refetch} = useQuery(gql`
    //     query GetMe {
    //         me {
	// 			id
    //             email
	//             thumbnail
	// 			reviews {
	// 				building {
	// 				  buildingName
	// 				}
	// 				comment
	// 				upVotes
	// 				downVotes
	// 				bedNum
	// 				bathNum
	// 				leaseLen
	// 				rent
	// 				totalScore
	// 				envScore
	// 				secScore
	// 			  }
    //         }
    //     }
	// `, {
	// 	fetchPolicy: "network-only"
	// });

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
	// console.log(data)
	// console.log(data.currentUser)
	// console.log(error)
	// const user: IUser | undefined = (data && data.currentUser) && (<IUser> data.me);
	const user: IUser | undefined = (data && data.currentUser) && (<IUser> data.currentUser);
	// console.log(user)

    const [logout] = useMutation(gql`
        mutation Logout {
            logout {
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
