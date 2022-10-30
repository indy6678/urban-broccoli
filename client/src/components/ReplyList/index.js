import React from "react";
import { Link } from "react-router-dom";

const ReplyList = ({ replies }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span>Replies</span>
      </div>
      <div className="card-body">
        {replies &&
          replies.map((reply) => (
            <p className="mb-3" key={reply._id}>
              {reply.replyBody} {"---- "}
              <Link
                to={`/profile/${reply.username}`}
                style={{ fontWeight: 700 }}
              >
                {reply.username} replied at {reply.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReplyList;