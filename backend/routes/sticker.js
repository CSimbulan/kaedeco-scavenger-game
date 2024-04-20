const express = require("express");

const {
    getAllStickers, getStickerById, createSticker, updateStickerById, deleteStickerById, addStickerOwner
} = require("../controllers/sticker");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getAllStickers);
router.route("/:id").get(protect, getStickerById);
router.route("/add").post(protect, createSticker);
router.route("/update/:id").post(protect, updateStickerById);
router.route("/addowner/:id").post(protect, addStickerOwner);
router.route("/:id").delete(protect, deleteStickerById);

module.exports = router;
