
const User = require("../../models/User");
const Game = require("../../models/Game");

const userResolver = {
	Query: {
        users: async (_, _input, context) => {
            const users = await User.find();
            console.log(context)
            return users
        },
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
		},
	},
    User: {
        games: async (parent) => {
            try {
				const games = await Game.find({participants: parent._id});
				return games;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
        }
    }
};

module.exports = userResolver;