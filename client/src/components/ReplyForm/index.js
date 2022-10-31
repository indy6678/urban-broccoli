import React, { useState } from "react";

const ReplyForm = ({ postId }) => {
    const [replyBody, setBody] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
          setBody(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        setBody('');
        setCharacterCount(0);
    };

  return (
    <div>
        
      <form className="flex-row justify-center justify-space-between-md align-stretch"
      onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reply..."
        //   value={replyBody}
          className="form-input col-12 col-md-9"
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;