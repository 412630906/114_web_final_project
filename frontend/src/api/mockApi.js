import { getGuestId } from "../utils/guest.js";

const GAMES_KEY = "mock_games_seeded_v1";
const CART_KEY_PREFIX = "mock_cart_";
const LIB_KEY_PREFIX = "mock_library_";

function nowISO() {
  return new Date().toISOString();
}

function getGamesSeed() {
  var seeded = localStorage.getItem(GAMES_KEY);
  if (seeded === "true") {
    return null;
  }

  var games = [
    { _id: "g1", title: "Nebula Raiders", price: 499, coverImage: "https://picsum.photos/seed/nebula/600/800" },
    { _id: "g2", title: "Dungeon Atlas", price: 399, coverImage: "https://picsum.photos/seed/atlas/600/800" },
    { _id: "g3", title: "Cyber Drift", price: 690, coverImage: "https://picsum.photos/seed/drift/600/800" },
    { _id: "g4", title: "Forest Whisper", price: 299, coverImage: "https://picsum.photos/seed/forest/600/800" },
    { _id: "g5", title: "Skyforge Arena", price: 790, coverImage: "https://picsum.photos/seed/skyforge/600/800" },
    { _id: "g6", title: "Star Courier", price: 350, coverImage: "https://picsum.photos/seed/courier/600/800" },
    { _id: "g7", title: "Mecha Harbor", price: 880, coverImage: "https://picsum.photos/seed/mecha/600/800" },
    { _id: "g8", title: "Pixel Kingdom", price: 199, coverImage: "https://picsum.photos/seed/pixel/600/800" }
  ];

  localStorage.setItem("mock_games", JSON.stringify(games));
  localStorage.setItem(GAMES_KEY, "true");
  return games;
}

function readGames() {
  var first = getGamesSeed();
  if (first) return first;

  var raw = localStorage.getItem("mock_games");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function readCart() {
  var key = CART_KEY_PREFIX + getGuestId();
  var raw = localStorage.getItem(key);
  if (!raw) return { items: [] };
  try {
    return JSON.parse(raw);
  } catch (e) {
    return { items: [] };
  }
}

function writeCart(cart) {
  var key = CART_KEY_PREFIX + getGuestId();
  localStorage.setItem(key, JSON.stringify(cart));
}

function readLibrary() {
  var key = LIB_KEY_PREFIX + getGuestId();
  var raw = localStorage.getItem(key);
  if (!raw) return { games: [] };
  try {
    return JSON.parse(raw);
  } catch (e) {
    return { games: [] };
  }
}

function writeLibrary(lib) {
  var key = LIB_KEY_PREFIX + getGuestId();
  localStorage.setItem(key, JSON.stringify(lib));
}

function findGameById(id) {
  var games = readGames();
  for (var i = 0; i < games.length; i++) {
    if (games[i]._id === id) return games[i];
  }
  return null;
}

function cartHasGame(cart, id) {
  var items = cart.items || [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].gameId === id) return true;
  }
  return false;
}

function libraryHasGame(lib, id) {
  var games = lib.games || [];
  for (var i = 0; i < games.length; i++) {
    if (games[i].gameId === id) return true;
  }
  return false;
}

export const mockApi = {
  async getGames() {
    var games = readGames();
    return { games: games };
  },

  async getCart() {
    var cart = readCart();
    return { cart: cart };
  },

  async addToCart(gameId) {
    var game = findGameById(gameId);
    if (!game) {
      throw new Error("找不到遊戲");
    }

    var cart = readCart();
    if (cartHasGame(cart, gameId)) {
      return { cart: cart };
    }

    var next = {
      gameId: game._id,
      titleSnapshot: game.title,
      priceSnapshot: game.price,
      coverSnapshot: game.coverImage,
      addedAt: nowISO()
    };

    if (!cart.items) cart.items = [];
    cart.items.push(next);
    writeCart(cart);
    return { cart: cart };
  },

  async removeFromCart(gameId) {
    var cart = readCart();
    var items = cart.items || [];
    var kept = [];

    for (var i = 0; i < items.length; i++) {
      if (items[i].gameId !== gameId) {
        kept.push(items[i]);
      }
    }

    cart.items = kept;
    writeCart(cart);
    return { cart: cart };
  },

  async clearCart() {
    writeCart({ items: [] });
    return { cart: { items: [] } };
  },

  async checkout() {
    var cart = readCart();
    var items = cart.items || [];
    if (items.length === 0) {
      throw new Error("購物車是空的，無法結帳");
    }

    var lib = readLibrary();
    if (!lib.games) lib.games = [];

    var purchasedCount = 0;
    var total = 0;

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      total += it.priceSnapshot;

      if (!libraryHasGame(lib, it.gameId)) {
        lib.games.push({
          gameId: it.gameId,
          titleSnapshot: it.titleSnapshot,
          priceSnapshot: it.priceSnapshot,
          coverSnapshot: it.coverSnapshot,
          purchasedAt: nowISO()
        });
        purchasedCount += 1;
      }
    }

    writeLibrary(lib);
    writeCart({ items: [] });

    return {
      orderId: "mock_" + Date.now(),
      totalPrice: total,
      purchasedCount: purchasedCount
    };
  },

  async getLibrary() {
    var lib = readLibrary();
    return { library: lib };
  }
};
