const User = require("../../models/User");
const Game = require("../../models/Game");
const ErrorResponse = require("../../utils/errorResponse");

const userResolver = {
  Query: {
    users: async (_, _input, context) => {
      const users = await User.find();
      console.log(context);
      return users;
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
  Mutation: {
    logIn: async (_, { input }) => {
      try {
        const { email, password } = input;
        if (!email || !password) {
          return new ErrorResponse("Please provide email and password", 400);
        }

        const user = await User.findOne({ email }).select("+password"); // Explicitly adding password

        if (!user) {
          return new ErrorResponse("Invalid credentials", 401);
        }

        // Using our own custom method to compare passwords
        const isMatched = await user.matchPasswords(password);

        if (!isMatched) {
          return new ErrorResponse("Invalid credentials", 401);
        }
        return {
			id: user._id,
			success: true,
			name: user.name,
			email: user.email,
			admin: user.admin,
			profilePic: user.profilePic,
			token: user.getSignedToken(),
			expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
		  };
      } catch (err) {
        console.error("Error in login:", err);
        return new ErrorResponse("Internal server error", 400);
      }
    },
  },
  User: {
    games: async (parent) => {
      try {
        const games = await Game.find({ participants: parent._id });
        return games;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
};

module.exports = userResolver;
