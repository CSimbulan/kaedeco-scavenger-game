const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    description: String,
    participants: { type: Array, default: [] },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Default profile pic
    },
    startDate: Date,
    endDate: Date,
    sequential: Boolean, // If the scavenger hunt needs to find items in a specific order,
    stickers: Array,
    test: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;