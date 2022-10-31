import React from "react";
import { useParams } from "react-router-dom";
import {useQuery} from '@apollo/client';
import { QUERY_POST } from "../utils/queries";
import ReplyList from "../components/ReplyList";
import ReplyForm from "../components/ReplyForm";
import Auth from '../utils/auth';

const SinglePost = () => {
  const { id: postId } = useParams();
  const {loading, data} = useQuery(QUERY_POST,{
    variables: { id: postId}
  });
  // optional chaining; if data exists, store it in the post constant, otherwise save empty object {} to post
  const post = data?.post || {};

  // console.log(postId);
if (loading){
  return <div>Loading...</div>
}
  return (
    <div className='flex-column align-center'>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontweight: 700 }} className="text-light">
            Posted by {post.username}
          </span>{" "}
          at {post.createdAt}
        </p>
        <div className="card-body">
          <p>{post.postText}</p>
        </div>
      </div>
      <div className="w-50">
      {/* pass reply array as prop and renders only if the reply array is */}
      {post.replyCount > 0 && <ReplyList replies={post.replies}/>}
      </div>
      {Auth.loggedIn() && <ReplyForm postId={post._id} />}
    </div>
  );
};

export default SinglePost;