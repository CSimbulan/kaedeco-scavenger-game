import { Game } from "../../models/Game.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

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
  Mutation: {
	createGame: async (_, { createGameInput }) => {
		try {
			const {name, image, description, sequential, startDate, endDate, stickers, test, organization} = createGameInput
			let gameFields = {};
			gameFields.name = name;
			gameFields.image = image;
			gameFields.sequential = sequential;
			gameFields.startDate = startDate;
			gameFields.endDate = endDate;
			gameFields.stickers = stickers;
			gameFields.test = test;
			gameFields.organization = organization;
			if (description) {
			  gameFields.description = description;
			}
		  
			const newGame = await Game.create(gameFields);
		  
			return newGame
		} catch (error) {
        console.log(error);
        return new ErrorResponse("Internal server error", 400);
      }
	}
  }
};
