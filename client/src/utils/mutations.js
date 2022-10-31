import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NEIGHBOR = gql`
  mutation addNeighbor($id: ID!) {
    addNeighbor(neighborId: $id) {
      _id
      username
      neighborCount
      neighbors {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation addPost($postText: String!) {
  addPost(postText: $postText) {
    _id
    postText
    createdAt
    username
    replyCount
    replies {
      _id
    }
  }
}
`;

export const ADD_REPLY = gql`
mutation addReply($postId: ID!, replyText: $replyText) {
  _id
  replyCount
  replies {
    _id
    replyText
    createdAt
    username
  }
}`