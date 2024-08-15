const gqlTools = require("@graphql-tools/merge");

const userTypeDef = require('./User.typeDefs')

const mergedTypeDefs = gqlTools.mergeTypeDefs([userTypeDef]);

module.exports = mergedTypeDefs;