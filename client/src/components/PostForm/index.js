import React, { useState } from "react";

const PostForm = () => {
  const [postText, setText] = useState("");

  const handleChange = (event) => {
    if (event.target.value.length <= 255) {
      setText(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setText("");
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
    </div>
  );
};

export default PostForm;
