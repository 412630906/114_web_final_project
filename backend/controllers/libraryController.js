import Library from "../models/Library.js";

export async function getLibrary(req, res, next) {
  try {
    const guestId = req.guestId;

    let library = await Library.findOne({ guestId });
    if (!library) library = await Library.create({ guestId, games: [] });

    const games = library.games.map((g) => ({
      gameId: String(g.gameId),
      editionId: g.editionId,
      titleSnapshot: g.titleSnapshot,
      editionSnapshot: g.editionSnapshot,
      priceSnapshot: g.priceSnapshot,
      coverSnapshot: g.coverSnapshot,
      purchasedAt: g.purchasedAt
    }));

    res.json({
      success: true,
      message: "OK",
      data: { library: { games } }
    });
  } catch (err) {
    next(err);
  }
}
