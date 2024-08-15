
const Game = require("../../models/Game");

const gameResolver = {
	Query: {
        games: async (_) => {
            const games = await Game.find();
            return games
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

module.exports = gameResolver;