const express = require("express");

const {
    getAllStickers, getStickerById, createSticker, updateStickerById, deleteStickerById
} = require("../controllers/sticker");

const router = express.Router();

router.route("/").get(getAllStickers);
router.route("/:id").get(getStickerById);
router.route("/add").post(createSticker);
router.route("/update/:id").post(updateStickerById);
router.route("/:id").delete(deleteStickerById);

module.exports = router;
