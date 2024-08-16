import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    logIn(input: $input) {
      id
      success
      name
      email
      admin
      profilePic
      token
      expires_at
    }
  }
`;