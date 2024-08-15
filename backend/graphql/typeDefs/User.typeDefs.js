const userTypeDef = `#graphql
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String!
    profilePic: String
    admin: Boolean
    resetPasswordToken: String
    resetPasswordExpire: String
  }

  type Query {
    users: [User]
    user(userId:ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): User
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

module.exports = userTypeDef;