import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      id
      name
      email
      userName
      password
      createAt
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID, $userName: String) {
    getUser(id: $id, userName: $userName) {
      id
      name
      userName
      email
      avatar
      siteWeb
      description
      createAt
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdatedInput) {
    updateUser(input: $input)
  }
`;

export const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      userName
      email
      siteWeb
      avatar
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($input: verifyToken) {
    verifyToken(input: $input)
  }
`;
