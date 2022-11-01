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
        neighborCount
        neighbors{
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
}
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      neighborCount
      posts {
        _id
        postText
        createdAt
        replyCount
        replies {
          _id
          createdAt
          replyBody
          username
        }
      }
      neighbors {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      neighborCount
      neighbors {
        _id
        username
      }
    }
  }
`;