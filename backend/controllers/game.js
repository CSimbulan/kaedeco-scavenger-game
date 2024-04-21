const Game = require("../models/Game");

const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"

const getAllGames = (req, res) => {
  Game.find(req.query.admin ? {} : {test: false})
    .then((games) => res.json(games))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getGameById = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json("Error: " + err));
};

const createGame = (req, res) => {
  gameFields = {};
  gameFields.name = req.body.name;
  gameFields.image = req.body.image;
  gameFields.sequential = req.body.sequential;
  gameFields.startDate = req.body.startDate;
  gameFields.endDate = req.body.endDate;
  gameFields.stickers = req.body.stickers;
  gameFields.test = req.body.test;
  if (req.body.description) {
    gameFields.description = req.body.description;
  }

  const newGame = new Game(gameFields);

  newGame
    .save()
    .then(() => {
      return sendGame(newGame, 201, res);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateGameById = (req, res) => {
  Game.findByIdAndUpdate(req.params.id)
    .then((game) => {
      game.name = req.body.name || game.name;
      game.image = req.body.image || game.image;
      game.sequential = req.body.sequential;
      game.startDate = req.body.startDate;
      game.endDate = req.body.endDate;
      game.stickers = req.body.stickers;
      game.test = req.body.test;
      if (req.body.description) {
        game.description = req.body.description;
      }
      if (req.body.participants) {
        game.participants = req.body.participants;
      }

      game
        .save()
        .then(() => res.status(200).json({
            success:true,
            message: 'Game updated!'
        }))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const addParticipantToGame = (req, res) => {
  Game.findOneAndUpdate(
    { _id: req.params.id, participants: { $ne: req.body.owner } },
    { $push: { participants: req.body.user } },
    { safe: true, upsert: true }
  ).catch((err) => res.status(400).json("Error: " + err));
};

const deleteGameById = (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.json("Game deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

const sendGame = (game, statusCode, res) => {
  return res.status(statusCode).json({
    id: game._id,
    success: true,
    name: game.name,
    image: game.image,
    startDate: game.startDate,
    endDate: game.endDate,
    stickers: game.stickers,
    sequential: game.sequential,
    test: game.test,
    participants: game.participants
  });
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById,
  addParticipantToGame,
};
