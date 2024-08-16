export const stickerTypeDefs = `#graphql
  type Sticker {
    _id: ID!
    name: String!
    description: String
    hints: [String]
    linkedGames: [String]
    image: String
    owners: [String]
    anime: [String]
    artist: Artist
  }

  type Artist {
        name: String
        socials: Socials
    }

    type Socials {
            twitter: String
            instagram: String
            tiktok: String
            youtube: String
            twitch: String
        }

  type Query {
    stickers: [Sticker]
    sticker(stickerId:ID!): Sticker
  }
`;