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
