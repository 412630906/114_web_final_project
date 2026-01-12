import { getGuestId } from "../utils/guest.js";

const GAMES_SEEDED_KEY = "mock_games_seeded_v3";
const GAMES_KEY = "mock_games_v3";
const CART_KEY_PREFIX = "mock_cart_v3_";
const LIB_KEY_PREFIX = "mock_library_v3_";

function nowISO() {
  return new Date().toISOString();
}

function seedGamesIfNeeded() {
  var seeded = localStorage.getItem(GAMES_SEEDED_KEY);
  if (seeded === "true") return;

  var games = [
    {
      _id: "g1",
      title: "Gears 5",
      shortDescription:
        "做為遊戲史上倍受讚譽的長篇劇情史詩之一， Gears 這次將帶來比以往更廣闊的世界。全面戰爭迫在眉睫，凱特迪亞茲脫離小隊，調查她與敵人之間晦暗不明的關係，並發現錫拉星的真正危機竟是，她自身的存在。",
      description:
        "體驗震撼戰役與多人模式。",
      heroImage: "https://picsum.photos/seed/gears_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/gears_capsule/900/420",
      coverImage: "https://picsum.photos/seed/gears_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/gears_ss1/1600/900",
        "https://picsum.photos/seed/gears_ss2/1600/900",
        "https://picsum.photos/seed/gears_ss3/1600/900",
        "https://picsum.photos/seed/gears_ss4/1600/900",
        "https://picsum.photos/seed/gears_ss5/1600/900",
        "https://picsum.photos/seed/gears_ss6/1600/900"
      ],

      releaseDate: "2019 年 9 月 10 日",
      developer: "The Coalition",
      publisher: "Xbox Game Studios",
      tags: ["動作", "冒險", "第三人稱射擊", "多人", "合作", "單人", "射擊"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 788, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 988, note: "含額外造型與加成" },
        { id: "ultimate", name: "Ultimate Edition", price: 1288, note: "含季票與完整內容" }
      ]
    },

    {
      _id: "g2",
      title: "Cyber Drift",
      shortDescription:
        "霓虹賽道與高速漂移，沉浸式賽車體驗。選擇版本後加入購物車。",
      description:
        "高速競速與漂移機制。此為示範資料，可自由替換成你想要的遊戲與圖片。",
      heroImage: "https://picsum.photos/seed/drift_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/drift_capsule/900/420",
      coverImage: "https://picsum.photos/seed/drift_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/drift_ss1/1600/900",
        "https://picsum.photos/seed/drift_ss2/1600/900",
        "https://picsum.photos/seed/drift_ss3/1600/900",
        "https://picsum.photos/seed/drift_ss4/1600/900",
        "https://picsum.photos/seed/drift_ss5/1600/900"
      ],

      releaseDate: "2023 年 7 月 21 日",
      developer: "Neon Garage Studio",
      publisher: "Arcade Works",
      tags: ["競速", "街機", "漂移", "單人", "動作"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 690, note: "本體遊戲" },
        { id: "ultimate", name: "Ultimate Edition", price: 990, note: "含 DLC 與造型包" }
      ]
    },

    {
      _id: "g3",
      title: "Dungeon Atlas",
      shortDescription:
        "地城探險與角色養成，收集裝備、組建隊伍、挑戰史詩首領。",
      description:
        "RPG 探索與養成玩法。此為示範資料，可自行增加更多屬性（職業、技能、世界觀等）。",
      heroImage: "https://picsum.photos/seed/atlas_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/atlas_capsule/900/420",
      coverImage: "https://picsum.photos/seed/atlas_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/atlas_ss1/1600/900",
        "https://picsum.photos/seed/atlas_ss2/1600/900",
        "https://picsum.photos/seed/atlas_ss3/1600/900",
        "https://picsum.photos/seed/atlas_ss4/1600/900",
        "https://picsum.photos/seed/atlas_ss5/1600/900"
      ],

      releaseDate: "2022 年 11 月 3 日",
      developer: "Atlas Forge",
      publisher: "Indie Realm",
      tags: ["RPG", "地城", "冒險", "單人", "策略"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 399, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 599, note: "含美術設定集 + OST" }
      ]
    },

    {
      _id: "g4",
      title: "Forest Whisper",
      shortDescription:
        "療癒系冒險與探索。踏入森林、解開謎題、尋找失落的回聲。",
      description:
        "偏休閒、探索向的作品。適合拿來做漂亮的商店版面展示。",
      heroImage: "https://picsum.photos/seed/forest_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/forest_capsule/900/420",
      coverImage: "https://picsum.photos/seed/forest_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/forest_ss1/1600/900",
        "https://picsum.photos/seed/forest_ss2/1600/900",
        "https://picsum.photos/seed/forest_ss3/1600/900",
        "https://picsum.photos/seed/forest_ss4/1600/900",
        "https://picsum.photos/seed/forest_ss5/1600/900"
      ],

      releaseDate: "2021 年 5 月 14 日",
      developer: "Whisper Studio",
      publisher: "Calm Leaves",
      tags: ["冒險", "探索", "休閒", "單人", "劇情"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 299, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 429, note: "含數位美術集 + OST" }
      ]
    },

    {
      _id: "g5",
      title: "WW2 Rebuilder",
      shortDescription:
        "重建戰後城市，從廢墟中重塑秩序與希望。偏模擬/建造玩法。",
      description:
        "以重建為核心的模擬作品。示範資料，可自行改成你想要的內容。",
      heroImage: "https://picsum.photos/seed/ww2_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/ww2_capsule/900/420",
      coverImage: "https://picsum.photos/seed/ww2_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/ww2_ss1/1600/900",
        "https://picsum.photos/seed/ww2_ss2/1600/900",
        "https://picsum.photos/seed/ww2_ss3/1600/900",
        "https://picsum.photos/seed/ww2_ss4/1600/900",
        "https://picsum.photos/seed/ww2_ss5/1600/900"
      ],

      releaseDate: "2020 年 8 月 18 日",
      developer: "Rebuild Team",
      publisher: "Sim Works",
      tags: ["模擬", "建造", "管理", "單人"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 326, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 486, note: "含額外內容包" }
      ]
    },

    {
      _id: "g6",
      title: "Hooded Horse",
      shortDescription:
        "出版社特賣示範卡。可替換成策略/城建等主題。",
      description:
        "此為示範資料。你可以把它改成任何你想要的遊戲。",
      heroImage: "https://picsum.photos/seed/hood_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/hood_capsule/900/420",
      coverImage: "https://picsum.photos/seed/hood_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/hood_ss1/1600/900",
        "https://picsum.photos/seed/hood_ss2/1600/900",
        "https://picsum.photos/seed/hood_ss3/1600/900",
        "https://picsum.photos/seed/hood_ss4/1600/900"
      ],

      releaseDate: "2021 年 2 月 2 日",
      developer: "Hooded Devs",
      publisher: "Hooded Horse",
      tags: ["策略", "模擬", "管理", "獨立"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 298, note: "本體遊戲" },
        { id: "ultimate", name: "Ultimate Edition", price: 498, note: "含 DLC + OST" }
      ]
    },

    {
      _id: "g7",
      title: "Dome Keeper",
      shortDescription:
        "免費週末示範卡。挖掘資源、升級圓頂、防守怪物。",
      description:
        "挖掘/防守玩法。示範資料，可自由替換。",
      heroImage: "https://picsum.photos/seed/dome_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/dome_capsule/900/420",
      coverImage: "https://picsum.photos/seed/dome_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/dome_ss1/1600/900",
        "https://picsum.photos/seed/dome_ss2/1600/900",
        "https://picsum.photos/seed/dome_ss3/1600/900",
        "https://picsum.photos/seed/dome_ss4/1600/900",
        "https://picsum.photos/seed/dome_ss5/1600/900"
      ],

      releaseDate: "2022 年 9 月 27 日",
      developer: "Dome Team",
      publisher: "Raw Fury",
      tags: ["動作", "採集", "防守", "單人"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 298, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 398, note: "含美術集 + OST" }
      ]
    },

    {
      _id: "g8",
      title: "Undertow",
      shortDescription:
        "今日特惠示範卡。偏動作/冒險向的作品。",
      description:
        "此為示範資料。你可以改成任何遊戲與圖片。",
      heroImage: "https://picsum.photos/seed/undertow_hero/1600/700",
      capsuleImage: "https://picsum.photos/seed/undertow_capsule/900/420",
      coverImage: "https://picsum.photos/seed/undertow_cover/600/800",

      screenshots: [
        "https://picsum.photos/seed/undertow_ss1/1600/900",
        "https://picsum.photos/seed/undertow_ss2/1600/900",
        "https://picsum.photos/seed/undertow_ss3/1600/900",
        "https://picsum.photos/seed/undertow_ss4/1600/900"
      ],

      releaseDate: "2024 年 3 月 15 日",
      developer: "Tide Studio",
      publisher: "Blue Current",
      tags: ["動作", "冒險", "單人"],

      editions: [
        { id: "standard", name: "Standard Edition", price: 488, note: "本體遊戲" },
        { id: "ultimate", name: "Ultimate Edition", price: 688, note: "含額外內容包" }
      ]
    }
  ];

  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
  localStorage.setItem(GAMES_SEEDED_KEY, "true");
}

function readGames() {
  seedGamesIfNeeded();
  var raw = localStorage.getItem(GAMES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function findGameById(gameId) {
  var games = readGames();
  for (var i = 0; i < games.length; i++) {
    if (games[i]._id === gameId) return games[i];
  }
  return null;
}

function findEdition(game, editionId) {
  if (!game) return null;
  var eds = game.editions || [];
  for (var i = 0; i < eds.length; i++) {
    if (eds[i].id === editionId) return eds[i];
  }
  return null;
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

function makeItemId() {
  return "it_" + String(Date.now()) + "_" + String(Math.random()).replace(".", "");
}

function libraryHas(lib, gameId, editionId) {
  var arr = lib.games || [];
  for (var i = 0; i < arr.length; i++) {
    var g = arr[i];
    if (g.gameId === gameId && g.editionId === editionId) return true;
  }
  return false;
}

export const mockApi = {
  async getGames() {
    // 商店頁：回傳全部遊戲
    var games = readGames();
    return { games: games };
  },

  async getGameById(id) {
    var g = findGameById(id);
    if (!g) throw new Error("找不到遊戲");
    return { game: g };
  },

  async getCart() {
    var cart = readCart();
    return { cart: cart };
  },

  async addToCart(gameId, editionId) {
    var game = findGameById(gameId);
    if (!game) throw new Error("找不到遊戲");

    var ed = findEdition(game, editionId);
    if (!ed) throw new Error("找不到版本");

    var cart = readCart();
    if (!cart.items) cart.items = [];

    cart.items.push({
      itemId: makeItemId(),
      gameId: game._id,
      editionId: ed.id,

      titleSnapshot: game.title,
      editionSnapshot: ed.name,
      priceSnapshot: ed.price,
      coverSnapshot: game.coverImage,

      addedAt: nowISO()
    });

    writeCart(cart);
    return { cart: cart };
  },

  async removeFromCart(itemId) {
    var cart = readCart();
    var src = cart.items || [];
    var kept = [];

    for (var i = 0; i < src.length; i++) {
      if (src[i].itemId !== itemId) kept.push(src[i]);
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
    if (items.length === 0) throw new Error("購物車是空的，無法結帳");

    var lib = readLibrary();
    if (!lib.games) lib.games = [];

    var total = 0;
    var purchasedCount = 0;

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      total += it.priceSnapshot;

      if (!libraryHas(lib, it.gameId, it.editionId)) {
        lib.games.push({
          gameId: it.gameId,
          editionId: it.editionId,

          titleSnapshot: it.titleSnapshot,
          editionSnapshot: it.editionSnapshot,
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
      orderId: "mock_" + String(Date.now()),
      totalPrice: total,
      purchasedCount: purchasedCount
    };
  },

  async getLibrary() {
    var lib = readLibrary();
    return { library: lib };
  }
};
