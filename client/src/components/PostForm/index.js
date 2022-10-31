import React, { useState } from "react";
import {useMutation} from '@apollo/client';
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

const PostForm = () => {
  const [postText, setText] = useState("");
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, {data: {addPost}}) {
      try {
        const {me} = cache.readQuery({ query: QUERY_ME});
        cache.writeQuery({
          query: QUERY_ME,
          data: {me: { ...me, posts: [...me.posts, addPost]}},
        });
      } catch (e) {
        console.warn("First post insertion by user!")
      }


      // read what is currently in cache
      const {posts} = cache.readQuery({ query: QUERY_POSTS});

      // prepend the newest post to the front of the array
      cache.writeQuery({
        query: QUERY_POSTS,
        data: {posts: [addPost, ...posts]}
      });
    }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 255) {
      setText(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add the post to the db
      await addPost({
          variables: {postText}
      });

      // clear the form value
      setText("");
  } catch (e) {
      console.error(e);
  }
  };

  return (
    <div>
      <p className="m-0"></p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Tell us what you saw and where you saw it!"
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      <p className={`m-2 ${error ? 'text-error' : ''}`}>{error && <span className="ml-2 error">Oops. Nothing was entered!</span>}
      </p>
    </div>
  );
};

export default PostForm;
