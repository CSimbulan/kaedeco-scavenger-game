const gqlTools = require("@graphql-tools/merge");

const userResolver = require('./User.resolver')

const mergedResolvers = gqlTools.mergeResolvers([userResolver]);

module.exports = mergedResolvers;
