const gqlTools = require("@graphql-tools/merge");

const userTypeDefs = require('./User.typeDefs')
const gameTypeDefs = require('./Game.typeDefs')
const stickerTypeDefs = require('./Sticker.typeDefs')

const mergedTypeDefs = gqlTools.mergeTypeDefs([userTypeDefs, gameTypeDefs, stickerTypeDefs]);

module.exports = mergedTypeDefs;