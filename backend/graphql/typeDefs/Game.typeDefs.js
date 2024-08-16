const gameTypeDefs = `#graphql
  type Game {
    _id: ID!
    name: String!
    description: String
    image: String
    participants: [String]
  }

  type Query {
    games: [Game]
    gamesByUser(userId: ID!): [Game]
    game(gameId: ID!): Game
  }
`;

module.exports = gameTypeDefs;
