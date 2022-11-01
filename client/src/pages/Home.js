import React from "react";
// import useQuery hook
import { useQuery } from "@apollo/client";
// import query post
import { QUERY_POSTS, QUERY_ME_BASIC } from "../utils/queries";
import PostList from "../components/PostList";
import corgi from "../assets/images/corgi.jpg";
import lab from "../assets/images/lab.jpg";
import rho from "../assets/images/rr-portrait.jpg";
import dog from "../assets/images/dog-photo.jpg";
// import authservice to checked for logged in user
import Auth from "../utils/auth";
// import neighbor list
import NeighborList from "../components/NeighborList";
import PostForm from "../components/PostForm";


const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  // destructure 'data' from useQuery hook response and rename it 'userData'
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // optional chaining; if data exists, store it in the posts constant, otherwise save empty array [] to posts
  const posts = data?.posts || [];
  // console.log(posts);

  // if logged in, this will be set to true
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>
        <div className="flex-row justify-space-around align-center">
        <img src={rho} width="25%" alt="Rhodesian Ridgeback" />
        <img src={rho} width="25%" alt="Rhodesian Ridgeback" />
          <span className="flex-row justify-space-around">
            <img src={corgi} width="30%" alt="Tri-color Corgi" />
            <img src={lab} width="30%" alt="Golden Retriever facing left" />
          </span>
          <div className="w-50 text-center">
            {!loggedIn && (
              
              <h2>Has your pet gotten loose? Check below to see more.
              Or if you have seen one roaming around the
            neighborhood, sign in or sign up to let us know!
              </h2>
            )}
            {loggedIn && (
            <div>
              <h3>
              Let us know or check below to see what your neighbors have said.
              </h3>
              <PostForm />
            </div>
          )}
          </div>
          
        </div>

        <div className="flex-row justify-center">          
          <div className={`col-10 mb-3 ${loggedIn && "col-lg-10"}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PostList title="Posts from your neighbors" posts={posts} />
            )}
          </div>
          {loggedIn && userData ? (
            <div className="col-4 col-lg-3 mb-3">
              <NeighborList
                username={userData.me.username}
                neighborCount={userData.me.neighborCount}
                neighbors={userData.me.neighbors}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
