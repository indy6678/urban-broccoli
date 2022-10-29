import React from "react";

const PostList = ({ posts, title }) => {

    if (posts.length) {
        return (
            <div>
                <h3>{title}</h3>
                {posts &&
                    posts.map(post => (
                        <div key={post._id} className='card mb-3'>
                            <p className='card-header'>
                                {post.username}
                                's post at {post.createdAt}
                            </p>
                            <div className='card-body'>
                                <p>{post.postText}</p>
                                <p className='mb-0'>
                                    Replies: {post.replyCount} || Click to {' '}
                                    {post.replyCount ? 'find out' : 'ask'} who saw what!
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }

    return <h3>No Posts Available</h3>;
}

export default PostList;