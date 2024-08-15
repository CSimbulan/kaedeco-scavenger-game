const gqlTools = require("@graphql-tools/merge");

const userResolver = require('./User.resolver')
const gameResolver = require('./Game.resolver')
const stickerResolver = require('./Sticker.resolver')

const mergedResolvers = gqlTools.mergeResolvers([userResolver, gameResolver, stickerResolver]);

module.exports = mergedResolvers;
