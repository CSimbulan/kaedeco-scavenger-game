import { gql } from '@apollo/client';

export const GET_GAMES_BY_USER = gql`
  query GetGamesByUser($input: ID!) {
    gamesByUser(userId: $input) {
      _id
      name
      image
    }
  }
`;