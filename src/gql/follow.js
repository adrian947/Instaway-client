import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation follow($userName: String!) {
    follow(userName: $userName)
  }
`;
export const GET_FOLLOW = gql`
  query isFollow($userName: String!) {
    isFollow(userName: $userName)
  }
`;
export const UNFOLLOW = gql`
  mutation unfollow($userName: String!) {
    unFollow(userName: $userName)
  }
`;
export const GET_ALL_FOLLOW = gql`
  query getAllFollow($userName: String!) {
    getAllFollow(userName: $userName) {
      name
      userName
      avatar
    }
  }
`;
export const GET_ALL_FOLLOWING = gql`
  query getAllFollowing($userName: String!) {
    getAllFollowing(userName: $userName) {
      name
      userName
      avatar
    }
  }
`;
export const GET_NOT_FOLLOWERS = gql`
  query getNotFollowers {
    getNotFollowers {
      name
      userName
      avatar
    }
  }
`;
