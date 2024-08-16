import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StickerSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    description: String,
    hints: [String],
    linkedGames: { type: [{
      type: String,
      ref: "Game"
    }], default: [] },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Default profile pic
    },
    owners: { type: [{
      type: String,
      ref: "User"
    }], default: [] },
    anime: {type: [String], default: []},
    artist: {
        name: String,
        socials: {
            twitter: String,
            instagram: String,
            tiktok: String,
            youtube: String,
            twitch: String,
        }
    }
  },
  { timestamps: true }
);

export const Sticker = mongoose.model("Sticker", StickerSchema);