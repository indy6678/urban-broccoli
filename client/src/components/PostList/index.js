import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
    if (posts.length) {
      return (
        <div>
          <h3>{title}</h3>
          {posts &&
            posts.map((post) => (
              <div key={post._id} className="card mb-3">
                <p className="card-header">
                  Posted by{' '}
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
                  Click to{" "}
                    {post.replyCount ? "see more!" : "reply!"}
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

//   if (!posts.length) {
//     return <h3>No Posts Available</h3>;
//   }
//   return (
//     <div>
//       <h3>{title}</h3>
//       {posts &&
//         posts.map((post) => (
//           <div key={post._id} className="card mb-3">
//             <p className="card-header">
//               Posted by{" "}
//               <Link
//                 to={`/profile/${post.username}`}
//                 style={{ fontWeight: 700 }}
//                 className=""
//               >
//                 {post.username}
//               </Link>{" "}
//               at {post.createdAt}
//             </p>
//             <div className="card-body">
//               <Link to={`/post/${post._id}`}>
//                 <p>{post.postText}</p>
//                 <p className="mb-0">
//                   Click to{" "}
//                   {post.replyCount ? "find out who saw what!" : "reply!"}
//                 </p>
//               </Link>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

export default PostList;
