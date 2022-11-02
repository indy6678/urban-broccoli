import React, { useState } from "react";
import { ADD_REPLY } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

const ReplyForm = ({ postId }) => {
    const [replyBody, setBody] = useState('');
    const [addReply, { error }] = useMutation(ADD_REPLY, {
        update(cache, {data: {addReply}}) {
          try {
            const {me} = cache.readQuery({ query: QUERY_ME});
            cache.writeQuery({
              query: QUERY_ME,
              data: {me: { ...me, replies: [...me.replies, addReply]}},
            });
          } catch (e) {
            console.warn("First reply insertion by user!")
          }
    
    
          // read what is currently in cache
          const {replies} = cache.readQuery({ query: QUERY_POSTS});
    
          cache.writeQuery({
            query: QUERY_POSTS,
            data: {replies: [addReply, ...replies]}
          });
        }
      });
    

    const handleChange = (event) => {
        if (event.target.value.length <= 255) {
          setBody(event.target.value);
        //   setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await addReply({
            variables: { replyBody, postId },
          });
    
          setBody('');
        //   setCharacterCount(0);
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
              placeholder="Leave a reply!"
              value={replyBody}
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
    
    export default ReplyForm;