import React from "react";
// import useQuery hook
import { useQuery } from "@apollo/client";
// import query post
import { QUERY_POSTS } from "../utils/queries";
import PostList from "../components/PostList";
import corgi from "../assets/images/corgi.jpg";
import lab from '../assets/images/lab.jpg'

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  // optional chaining; if data exists, store it in the posts constant, otherwise save empty array [] to posts
  const posts = data?.posts || [];
  // console.log(posts);

  return (
    <main>
      <div>
        <p className="flex-row justify-space-around">
          <img src={corgi} width="20%" alt="corgi" />
          <img src={lab} width="20%" alt="lab" />
        </p>
        <p>
        
        </p>
        <div className="flex-row justify-center">
          <div className="col-9 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PostList posts={posts} title="Has your pet gotten loose? Or have you seen one roaming around the neighborhood? Check below to see more. Or sign up and leave a message to let us know!" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
