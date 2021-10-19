import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      idUser{
        name
        userName
        avatar
      }
      comment
      createAt
    }
  }
`;

export const GET_COMMENT = gql`
  query getComment($idPublication: ID!) {
    getComment(idPublication: $idPublication) {
      idPublication
      idUser {
        name
        userName
        avatar
      }
      comment
      createAt
    }
  }
`;
