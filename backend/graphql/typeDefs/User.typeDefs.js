export const userTypeDefs = `#graphql
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String!
    profilePic: String
    admin: Boolean
    organizations: [String]
    resetPasswordToken: String
    resetPasswordExpire: String
    games: [Game]
  }

  type Query {
    users: [User]
    user(userId:ID!): User
  }

  type FrontEndAuth {
      id: String
			success: Boolean,
			name: String,
			email: String,
			admin: Boolean,
			profilePic: String,
			token: String,
			expires_at: String,
  }

  type Mutation {
    register(input: RegisterInput!): FrontEndAuth
    logIn(input: LoginInput!): FrontEndAuth
  }

  input RegisterInput {
    email: String!
    name: String!
    password: String!
    profilePic: String
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
