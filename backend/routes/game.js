const express = require("express");

const {
    getAllGames, getGameById, createGame, updateGameById, deleteGameById
} = require("../controllers/game");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getAllGames);
router.route("/:id").get(protect, getGameById);
router.route("/add").post(protect, createGame);
router.route("/update/:id").post(protect, updateGameById);
router.route("/:id").delete(protect, deleteGameById);

module.exports = router;
