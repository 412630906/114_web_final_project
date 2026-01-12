import Cart from "../models/Cart.js";
import Library from "../models/Library.js";
import Order from "../models/Order.js";

function hasInLibrary(lib, gameId, editionId) {
  const arr = lib.games || [];
  return arr.some((g) => String(g.gameId) === String(gameId) && g.editionId === editionId);
}

export async function checkout(req, res, next) {
  try {
    const guestId = req.guestId;

    const cart = await Cart.findOne({ guestId });
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
        error: { code: "CART_EMPTY", details: [] }
      });
    }

    let totalPrice = 0;
    const items = cart.items.map((it) => {
      totalPrice += it.priceSnapshot;
      return {
        gameId: it.gameId,
        editionId: it.editionId,
        titleSnapshot: it.titleSnapshot,
        editionSnapshot: it.editionSnapshot,
        priceSnapshot: it.priceSnapshot,
        coverSnapshot: it.coverSnapshot
      };
    });

    const order = await Order.create({
      guestId,
      items,
      totalPrice,
      status: "paid"
    });

    let library = await Library.findOne({ guestId });
    if (!library) library = await Library.create({ guestId, games: [] });

    let purchasedCount = 0;

    for (const it of cart.items) {
      if (!hasInLibrary(library, it.gameId, it.editionId)) {
        library.games.push({
          gameId: it.gameId,
          editionId: it.editionId,
          titleSnapshot: it.titleSnapshot,
          editionSnapshot: it.editionSnapshot,
          priceSnapshot: it.priceSnapshot,
          coverSnapshot: it.coverSnapshot
        });
        purchasedCount += 1;
      }
    }

    await library.save();

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Checkout success",
      data: {
        orderId: String(order._id),
        totalPrice,
        purchasedCount
      }
    });
  } catch (err) {
    next(err);
  }
}
