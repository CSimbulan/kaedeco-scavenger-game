const Sticker = require("../models/Sticker");

const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"

const getAllStickers = (req, res) => {
    Sticker.find()
        .then((stickers) => res.json(stickers))
        .catch((err) => res.status(400).json("Error: " + err));
}

const getStickerById = (req, res) => {
    Sticker.findById(req.params.id)
        .then((sticker) => res.json(sticker))
        .catch((err) => res.status(400).json("Error: " + err));
}

// const getMultipleStickersById = (req, res) => {
//     Sticker.find(req.params.id)
//         .then((sticker) => res.json(sticker))
//         .catch((err) => res.status(400).json("Error: " + err));
// }

const createSticker = (req, res) => {

    stickerFields = {};
    stickerFields.name = req.body.name;
    stickerFields.image = req.body.image;
    if (req.body.description) { stickerFields.description = req.body.description; }
    if (req.body.hints) { stickerFields.hints = req.body.hints; }
    if (req.body.anime) { stickerFields.anime = req.body.anime; }
    if (req.body.artist) { stickerFields.artist = req.body.artist; }

    const newSticker = new Sticker(stickerFields);

    newSticker
        .save()
        .then(() => {
            return sendSticker(newSticker, 201, res)
        })
        .catch((err) => res.status(400).json("Error: " + err));
}

const updateStickerById = (req, res) => {
    Sticker.findById(req.params.id)
        .then((sticker) => {

            sticker.name = req.body.name || sticker.name;
            sticker.image = req.body.image || sticker.image;
            if (req.body.description) { sticker.description = req.body.description; }
            if (req.body.hints) { sticker.hints = req.body.hints; }
            if (req.body.anime) { sticker.anime = req.body.anime; }
            if (req.body.artist) { sticker.artist = req.body.artist; }

            if (req.body.linkedGames) { sticker.linkedGames = req.body.linkedGames; }
            if (req.body.owners) { sticker.owners = req.body.owners; }
            if (req.body.artist) { sticker.artist = req.body.artist; }

            if (req.body.owner) {
                sticker.owners.push(req.body.owner)
            }
            sticker
                .save()
                .then(() => res.json("Sticker updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
}

const deleteStickerById = (req, res) => {
    Sticker.findByIdAndDelete(req.params.id)
        .then(() => res.json("Sticker deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
}

const sendSticker = (sticker, statusCode, res) => {
  
    return res.status(statusCode).json({
      id: sticker._id,
      success: true,
      name: sticker.name,
      image: sticker.image,
    });
  };
  

module.exports = { getAllStickers, getStickerById, createSticker, updateStickerById, deleteStickerById };
