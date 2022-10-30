import { gql } from "@apollo/client";

// query for all posts
export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

// query for a single post
export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

// query for a single user
export const QUERY_USER = gql`
query user($username: String!) {
    user(username:$username){
        _id
        username
        email
        friendCount
        friends{
            _id
            username
        }
        posts{
            _id
            postText
            createdAt
            replyCount
        }
    }
}`