import React from "react";
import {Link} from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (posts.length) {
    return (
      <div>
        <h3>{title}</h3>
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <p className="card-header">
                Posted by {' '}
                <Link
                  to={`/profile/${post.username}`}
                  style={{ fontWeight: 700}}
                  className="text-light"
                  >
                    {post.username}
                  </Link>{' '}
                  at {post.createdAt}
              </p>
              <div className="card-body">
                <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <p className="mb-0">
                  Replies: {post.replyCount} || Click to{" "}
                  {post.replyCount ? "find out" : "ask"} who saw what!
                </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return <h3>No Posts Available</h3>;
};

export default PostList;