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
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const Feed_Photo = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${Photo_Fragment}
`;

export const Room_Fragment = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;
