const gameTypeDefs = `#graphql
  type Game {
    _id: ID!
    name: String!
    description: String
    participants: [String]
  }

  type Query {
    games: [Game]
    game(gameId:ID!): Game
  }
`;

module.exports = gameTypeDefs;