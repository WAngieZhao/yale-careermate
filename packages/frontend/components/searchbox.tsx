import React from 'react';
import { useQuery, gql } from '@apollo/client';

export default function SearchBox() {
    const BASIC_FETCH_QUERY = gql`
        query GetReviews {
            reviews {
                id
                content
                upVotes
                downVotes
                author {
                    userName
                }
            }
        }
    `;
    
    const { data, loading, error, refetch } = useQuery<any>(BASIC_FETCH_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( ${error.message}</p>;

    return (
        <div>
            {/* demonstrate query */}
            <button onClick={() => refetch()}>Refresh</button>
            {data && data.reviews.map((review:any) => (
                <p key={review.id}>
                    Review by: {review.author.userName} <br />
                    Content: {review.content} <br />
                    Up votes: {review.upVotes} <br />
                    Down votes: {review.downVotes} <br />
                </p>
            ))}
        </div>
    );
}