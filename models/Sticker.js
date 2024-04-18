const mongoose = require("mongoose");

const StickerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    description: String,
    hints: Array,
    linkedGames: { type: Array, default: [] },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Default profile pic
    },
    owners: { type: Array, default: [] },
    anime: {type: Array, default: []},
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

const Sticker = mongoose.model("Sticker", StickerSchema);
module.exports = Sticker;