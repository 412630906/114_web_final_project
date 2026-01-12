import Game from "../models/Game.js";

export async function getGames(req, res, next) {
  try {
    const games = await Game.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "OK",
      data: { games }
    });
  } catch (err) {
    next(err);
  }
}

export async function getGameById(req, res, next) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
        error: { code: "GAME_NOT_FOUND", details: [] }
      });
    }

    res.json({
      success: true,
      message: "OK",
      data: { game }
    });
  } catch (err) {
    err.statusCode = 400;
    err.code = "INVALID_ID";
    err.message = "Invalid game id";
    next(err);
  }
}
