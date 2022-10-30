import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import NeighborList from "../components/NeighborList";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  // optional chaining; if data exists, then store in the user constant, otherwise save an empty object into user constant
  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{user.username}'s profile.</h2>
      </div>

      <div>
        <div>
          {/* <PostList posts={user.posts} title={`${user.username}'s posts...`} /> */}
        </div>
        <div>
          <NeighborList
            username={user.username}
            neighborCount={user.neighborCount}
            neighbors={user.neighbors}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
