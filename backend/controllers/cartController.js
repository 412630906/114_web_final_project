import Cart from "../models/Cart.js";
import Game from "../models/Game.js";

function toCartResponse(cart) {
  const items = cart.items.map((it) => ({
    itemId: String(it._id),
    gameId: String(it.gameId),
    editionId: it.editionId,
    titleSnapshot: it.titleSnapshot,
    editionSnapshot: it.editionSnapshot,
    priceSnapshot: it.priceSnapshot,
    coverSnapshot: it.coverSnapshot,
    addedAt: it.addedAt
  }));

  return { items };
}

export async function getCart(req, res, next) {
  try {
    const guestId = req.guestId;

    let cart = await Cart.findOne({ guestId });
    if (!cart) cart = await Cart.create({ guestId, items: [] });

    res.json({ success: true, message: "OK", data: { cart: toCartResponse(cart) } });
  } catch (err) {
    next(err);
  }
}

export async function addCartItem(req, res, next) {
  try {
    const guestId = req.guestId;
    const { gameId, editionId } = req.body;

    if (!gameId || !editionId) {
      return res.status(400).json({
        success: false,
        message: "gameId and editionId are required",
        error: { code: "VALIDATION_ERROR", details: [] }
      });
    }

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
        error: { code: "GAME_NOT_FOUND", details: [] }
      });
    }

    const edition = (game.editions || []).find((e) => e.id === editionId);
    if (!edition) {
      return res.status(404).json({
        success: false,
        message: "Edition not found",
        error: { code: "EDITION_NOT_FOUND", details: [] }
      });
    }

    let cart = await Cart.findOne({ guestId });
    if (!cart) cart = await Cart.create({ guestId, items: [] });

    cart.items.push({
      gameId: game._id,
      editionId,
      titleSnapshot: game.title,
      editionSnapshot: edition.name,
      priceSnapshot: edition.price,
      coverSnapshot: game.coverImage || game.capsuleImage || ""
    });

    await cart.save();

    res.status(201).json({
      success: true,
      message: "Added",
      data: { cart: toCartResponse(cart) }
    });
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const guestId = req.guestId;
    const itemId = req.params.itemId;

    const cart = await Cart.findOne({ guestId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
        error: { code: "CART_NOT_FOUND", details: [] }
      });
    }

    const before = cart.items.length;
    cart.items = cart.items.filter((it) => String(it._id) !== String(itemId));
    const after = cart.items.length;

    if (before === after) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
        error: { code: "CART_ITEM_NOT_FOUND", details: [] }
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Removed",
      data: { cart: toCartResponse(cart) }
    });
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    const guestId = req.guestId;

    let cart = await Cart.findOne({ guestId });
    if (!cart) cart = await Cart.create({ guestId, items: [] });

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Cleared",
      data: { cart: toCartResponse(cart) }
    });
  } catch (err) {
    next(err);
  }
}
