const userTypeDefs = `#graphql
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String!
    profilePic: String
    admin: Boolean
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
    signUp(input: SignUpInput!): User
    logIn(input: LoginInput!): FrontEndAuth
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

module.exports = userTypeDefs;