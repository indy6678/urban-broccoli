import React from "react";

const SinglePost = () => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontweight: 700 }} className="text-light">
            Username
          </span>{" "}
          post at createdAt
        </p>
        <div className="card-body">
          <p>Pet Posts</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;