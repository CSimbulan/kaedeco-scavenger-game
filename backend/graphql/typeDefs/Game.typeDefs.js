export const gameTypeDefs = `#graphql
  type Game {
    _id: ID!
    name: String!
    description: String
    image: String
    participants: [String]
  }

  type Assets {
    background: BackgroundAssets
    assets: DecorationAssets
  }

  type BackgroundAssets {
    color: String
    image: String
  }

  type DecorationAssets {
    image: String
    verticalPosition: String
    horizontalPosition: String
  }

  type Query {
    games: [Game]
    gamesByUser(userId: ID!): [Game]
    game(gameId: ID!): Game
  }

  type Mutation {
    createGame(createGameInput: GameInput!): Game 
  }

  input GameInput {
    name: String!
    description: String
    organization: String
    image: String
    startDate: String
    endDate: String
    sequential: Boolean
    stickers: [String]
    test: Boolean
    assets: AssetsInput
  }

  input AssetsInput {
    background: BackgroundAssetsInput
    assets: DecorationAssetsInput
  }

  input BackgroundAssetsInput {
    color: String
    image: String
  }

  input DecorationAssetsInput {
    image: String
    verticalPosition: String
    horizontalPosition: String
  }
`;
