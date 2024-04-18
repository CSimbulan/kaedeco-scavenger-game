const express = require("express");

const {
    getAllGames, getGameById, createGame, updateGameById, deleteGameById
} = require("../controllers/game");

const router = express.Router();

router.route("/").get(getAllGames);
router.route("/:id").get(getGameById);
router.route("/add").post(createGame);
router.route("/update/:id").post(updateGameById);
router.route("/:id").delete(deleteGameById);

module.exports = router;
