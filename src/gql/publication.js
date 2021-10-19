import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;

export const GET_PUBLICATION = gql`
  query Query($userName: String!) {
    getPublications(userName: $userName) {
      id
      idUser
      file
      typeFile      
    }
  }
`;
