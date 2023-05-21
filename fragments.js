import { gql } from "@apollo/client";

export const Photo_Fragment = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const Comment_Fragment = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const User_Fragment = gql`
  fragment UserFragment on User {
    username
    avatar
    isFollowing
    isMe
  }
`;
