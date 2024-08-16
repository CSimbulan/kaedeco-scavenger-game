import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./User.resolver.js";
import { gameResolver } from "./Game.resolver.js";
import { stickerResolver } from "./Sticker.resolver.js";

export const mergedResolvers = mergeResolvers([
  userResolver,
  gameResolver,
  stickerResolver,
]);
