import React from "react";
// import useQuery hook
import { useQuery } from '@apollo/client';
// import query post
import { QUERY_POSTS } from "../utils/queries";
import PostList from "../components/PostList";

const Home = () => {

    const { loading, data } = useQuery(QUERY_POSTS);
    // optional chaining; if data exists, store it in the posts constant, otherwise save empty array [] to posts
    const posts = data?.posts || [];
    // console.log(posts);

    return (
        <main>
            <div>
                <div className='flex-row justify-space-between'>
                    <div className='col-12 mb-3'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (<PostList posts={posts} title="Have you seen my pet?" />
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;