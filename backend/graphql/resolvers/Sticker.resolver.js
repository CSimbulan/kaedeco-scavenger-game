
const Sticker = require("../../models/Sticker");

const stickerResolver = {
	Query: {
        stickers: async (_) => {
            const stickers = await Sticker.find();
            return stickers
        },
		sticker: async (_, { stickerId }) => {
			try {
				const sticker = await Sticker.findById(stickerId);
				return sticker;
			} catch (err) {
				console.error("Error in sticker query:", err);
				throw new Error(err.message || "Error getting sticker");
			}
		},
	},
};

module.exports = stickerResolver;