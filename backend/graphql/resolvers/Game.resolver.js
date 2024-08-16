import { Game } from "../../models/Game.js";

export const gameResolver = {
  Query: {
    games: async (_) => {
      const games = await Game.find();
      return games;
    },
    gamesByUser: async (_, { userId }) => {
      try {
        const games = await Game.find({ participants: userId });
        return games;
      } catch (err) {
        console.error("Error in game query:", err);
        throw new Error(err.message || "Error getting games");
      }
    },
    game: async (_, { gameId }) => {
      try {
        const game = await Game.findById(gameId);
        return game;
      } catch (err) {
        console.error("Error in game query:", err);
        throw new Error(err.message || "Error getting game");
      }
    },
  },
};
