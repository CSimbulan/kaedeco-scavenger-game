import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    description: String,
    participants: { type: [{
      type: String,
      ref: "User"
    }], default: [] },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Default profile pic
    },
    startDate: Date,
    endDate: Date,
    sequential: Boolean, // If the scavenger hunt needs to find items in a specific order,
    stickers: [{
      type: Schema.Types.ObjectId,
      ref: "Sticker"
    }],
    test: {type: Boolean, default: false},
    assets: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const Game = mongoose.model("Game", GameSchema);