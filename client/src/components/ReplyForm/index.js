import React, { useState } from "react";
import { ADD_REPLY } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const ReplyForm = ({ postId }) => {
  
  const [addReply, { error }] = useMutation(ADD_REPLY);

  const [replyText, setText] = useState("");

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      await addReply({
        variables: { replyText, postId },
      });
      setText("");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reply..."
          value={replyText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      {/* <p className={`m-2 ${error ? 'text-error' : ''}`}>{error && <span className="ml-2 error">Oops. Nothing was entered!</span>}
      </p> */}
    </div>
  );
};

export default ReplyForm;
