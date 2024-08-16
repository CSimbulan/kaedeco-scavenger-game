
import { mergeTypeDefs } from '@graphql-tools/merge'

import {userTypeDefs} from "./User.typeDefs.js";
import {gameTypeDefs} from "./Game.typeDefs.js";
import {stickerTypeDefs} from "./Sticker.typeDefs.js";

export const mergedTypeDefs = mergeTypeDefs([
  userTypeDefs,
  gameTypeDefs,
  stickerTypeDefs,
]);
