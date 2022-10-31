import React from "react";
import { useParams, Navigate } from "react-router-dom";
import PostList from "../components/PostList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import NeighborList from "../components/NeighborList";
import Auth from "../utils/auth";
import { ADD_NEIGHBOR } from "../utils/mutations";
import PostForm from "../components/PostForm";
import ReplyForm from "../components/ReplyForm";

const Profile = () => {
  // destructure mutation function to be used in click function
  const [addNeighbor] = useMutation(ADD_NEIGHBOR);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // optional chaining; if data exists, then store in the user constant, otherwise save an empty object into user constant
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return <h4 className="text-center">You haven't signed in yet!</h4>;
  // }
  // console.log({ data });

  const handleClick = async () => {
    try {
      await addNeighbor({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-column align-center">
      <div>
        <h2 className="p-3 text-center">
          Checking out {userParam ? `${user.username}'s` : "your own"} profile.
        </h2>
        {userParam && (
          <button className="btn" onClick={handleClick}>
            Add a neighbor
          </button>
        )}
      </div>

      <div>
        <div>
          {/* <PostList posts={user.posts} /> */}
        </div>
        <div>
          <NeighborList
            username={user.username}
            neighborCount={user.neighborCount}
            neighbors={user.neighbors}
          />
        </div>
      </div>
      <div className="w-50  mb-3">{!userParam && <PostForm />}</div>
    </div>
  );
};

export default Profile;
