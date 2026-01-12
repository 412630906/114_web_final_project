import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/Game.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await Game.deleteMany({});

  const games = [
    {
      title: "Gears 5",
      shortDescription: "做為遊戲史上倍受讚譽的長篇劇情史詩之一， Gears 這次將帶來比以往更廣闊的世界。全面戰爭迫在眉睫，凱特迪亞茲脫離小隊，調查她與敵人之間晦暗不明的關係，並發現錫拉星的真正危機竟是，她自身的存在。",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/spotlights/a6ab1d34d5c05b96be40f590/spotlight_image_english.png?t=1767893773",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/header.jpg?t=1684425784",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/ss_7f5ef63810c77809b65c19734ba66ea56cf15ee2.1920x1080.jpg?t=1684425784",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/ss_9429a77bad31287dc7c68a6925eb893eeee65f5e.1920x1080.jpg?t=1684425784",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/ss_4869da09b43f0a38ee69e36c76e9a88d5641f03a.1920x1080.jpg?t=1684425784",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/ss_fedf48da899ad212d37b0ff7c908d9e93328b13a.1920x1080.jpg?t=1684425784"
      ],
      releaseDate: "2019 年 9 月 10 日",
      developer: "The Coalition",
      publisher: "Xbox Game Studios",
      tags: ["動作", "冒險", "第三人稱射擊", "多人", "合作", "單人"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 788, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 988, note: "含額外造型" },
        { id: "ultimate", name: "Ultimate Edition", price: 1288, note: "含季票內容" }
      ]
    },
    {
      title: "Cozy Caravan",
      shortDescription: "收拾好你的行囊，跳上車，我們要出發囉！駕著你那台熟悉又可靠的大篷車，展開一趟悠閒的旅程。沿路製作暖心的美食，擺設市集攤位，並與當地居民分享你的好物。記得散播善意、分享快樂，並幫忙籌備一年一度的「炫彩嘉年華」吧！",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/ca675edc5114be56c5737dce46211a786a5cc68c/header.jpg?t=1767858782",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/ca675edc5114be56c5737dce46211a786a5cc68c/header.jpg?t=1767858782",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/ebe5d34bb75eb19059cd7aac693c25a4b21b508d/ss_ebe5d34bb75eb19059cd7aac693c25a4b21b508d.1920x1080.jpg?t=1767858782",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/9da69f94f0e4172f8563ba94fde1b618bc595cf7/ss_9da69f94f0e4172f8563ba94fde1b618bc595cf7.1920x1080.jpg?t=1767858782",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/8dfbcb2a2615b3b2d65cffa0a185f9acee46496b/ss_8dfbcb2a2615b3b2d65cffa0a185f9acee46496b.1920x1080.jpg?t=1767858782",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2788520/aa01a6287548f6872f9a786ed7d6152934ba674b/ss_aa01a6287548f6872f9a786ed7d6152934ba674b.1920x1080.jpg?t=1767858782"
      ],
      releaseDate: "2026 年 1 月 8 日",
      developer: "5 Lives Studios",
      publisher: "5 Lives Studios",
      tags: ["探索", "可愛", "公藝", "開放世界", "獨立", "貿易"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 328, note: "本體遊戲" }
      ]
    },
    {
      title: "Warhammer 40,000: Space Marine 2",
      shortDescription: "展現超凡技能和蠻橫武力，成為星際戰士。憑藉致命能力和毀滅性武器，消滅頑強的泰倫蟲群。在這款壯闊的第三人稱動作遊戲中單兵上陣，或是在多人模式中聯手抗敵，守護人類帝國。",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/header.jpg?t=1764091362",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/header.jpg?t=1764091362",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/ss_ee88e4cc463b7b25b0ec03930a9e58e5fba2afdf.1920x1080.jpg?t=1764091362",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/ss_66a8bc13bf868d0e2a76e4d797e6408c271065d7.1920x1080.jpg?t=1764091362",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/ss_20a753725a34225553c5873fbc079626451ebcf9.1920x1080.jpg?t=1764091362",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/ss_712fe9d84a853d1d2fc1faee8cd8efb36e2278d0.1920x1080.jpg?t=1764091362"
      ],
      releaseDate: "2024 年 9 月 10 日",
      developer: "Saber Interactive",
      publisher: "Focus Entertainment",
      tags: ["戰鎚 40K", "動作", "多人", "合作", "第三人稱射擊"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 1590, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 2390, note: "含週年禮包" }
      ]
    },
    {
      title: "Resident Evil Village",
      shortDescription: "在《Resident Evil》主系列的第8部作品中展開一場令人毛骨悚然的絕命拚搏。 伊森一家的平靜生活又再一次被捲進了混亂之中，而打破這種平靜日常的不是別人，正是克里斯·雷德菲爾。伊森又再一次陷入那無法醒來的噩夢。 經過多年開發，日趨成熟的RE Engine為大家打造了全新的生存「動作」恐怖體驗。",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/header.jpg?t=1741142800",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/header.jpg?t=1741142800",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/ss_d25704b01be292d1337df4fea0fba2aab322b58a.1920x1080.jpg?t=1741142800",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/ss_50283e6df9d2f3f24ff4a1a36a94ae307e21cee8.1920x1080.jpg?t=1741142800",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/ss_d296efbc9a5d87bf20b2ea19134f35ba203ae813.1920x1080.jpg?t=1741142800",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/ss_b790b617004b92423a855d5526a1eb29e05b6c78.1920x1080.jpg?t=1741142800"
      ],
      releaseDate: "2021 年 5 月 7 日",
      developer: "CAPCOM Co., Ltd.",
      publisher: "CAPCOM Co., Ltd.",
      tags: ["生存恐怖", "第一人稱視角", "單人", "動作"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 1190, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 1450, note: "含擴充包" }
      ]
    },
    {
      title: "Golf With Your Friends",
      shortDescription: "不玩高爾夫，要朋友何用... 快呼朋喚友一起來吧！最多可有 12 名玩家同時於球場上遊玩精彩刺激的快節奏迷你高爾夫，在這裡一切皆有可能！",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/header.jpg?t=1766049604",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/header.jpg?t=1766049604",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/ss_db651179701c4c78f89448506f6fe177585d28a7.1920x1080.jpg?t=1766049604",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/ss_ca58d6c760d172df3875d9634ca35703d73a4d05.1920x1080.jpg?t=1766049604",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/ss_91d45c28c463c2fc5d4d28f15f900e2456ccf73c.1920x1080.jpg?t=1766049604",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431240/ss_af779fcd049a35140f47ff8781eec8d0e5d7d7bd.1920x1080.jpg?t=1766049604"
      ],
      releaseDate: "2020 年 5 月 20 日",
      developer: "Blacklight Interactive, Team17",
      publisher: "Team17",
      tags: ["休閒", "迷你高爾夫", "多人", "運動", "獨立", "搞笑"],
      editions: [{ id: "standard", name: "Standard Edition", price: 449, note: "本體遊戲" }]
    },
    {
      title: "Atomic Heart",
      shortDescription: "歡迎進入美妙瘋狂的烏托邦世界。生死之戰，一觸即發。針對獨特敵人制定最佳戰術，升級裝備，利用環境條件完成任務。想要揭開真相？那就做好流血的準備吧！",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/header.jpg?t=1764675129",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/header.jpg?t=1764675129",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/ss_1dc8661cde295efc2d1ff8612e079f5c74803748.1920x1080.jpg?t=1764675129",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/ss_9dedae959672ac7d7f2db16638a5b65f80bfe125.1920x1080.jpg?t=1764675129",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/ss_2fce9ef441a18361b9ab8f1b1ac70160c8226577.1920x1080.jpg?t=1764675129",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/ss_91b040e19e14baa32684a588c20246a305ae336e.1920x1080.jpg?t=1764675129"
      ],
      releaseDate: "2023 年 2 月 21 日",
      developer: "Mundfish",
      publisher: "Focus Entertainment, 4Divinity",
      tags: ["冒險", "動作", "第一人稱射擊", "開放世界", "單人"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 1590, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 2290, note: "含DLC" },
        { id: "ultimate", name: "Ultimate Edition", price: 2690, note: "含DLC，以及皮膚" }
      ]
    },
    {
      title: "Dome Keeper",
      shortDescription: "走進獨樹一格的類Rogue採礦動作遊戲，抵禦一波接一波外星怪物的攻擊。挖掘資源，收集實用裝置並升級裝備，不斷提高你存活下來的可能性。切記，要在穹頂被摧毀前及時趕回來！",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/spotlights/fd9961634410625a73916f6f/spotlight_image_english.png?t=1767811235",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/2a1d143606c3077209136f1bfe088336a094d16e/header_tchinese.jpg?t=1767634565",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/ss_f2a52537a6dc3458eadd0cfc40b3916b4eb70bae.1920x1080.jpg?t=1767634565",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/ss_b3718daa8a5e9bc8deddf5057a4723f36d73c83f.1920x1080.jpg?t=1767634565",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/ss_6aa7c5976efa5adfa0c9e36832f2a767a5415641.1920x1080.jpg?t=1767634565",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/ss_12c9e2deda5e147f07caf4868c385d8f6d9a224d.1920x1080.jpg?t=1767634565"
      ],
      releaseDate: "2022 年 9 月 27 日",
      developer: "Bippinbits",
      publisher: "Raw Fury",
      tags: ["末日之後", "類 Rogue", "單人", "動作", "科幻", "戰鬥"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 298, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 511, note: "含額外內容" }
      ]
    },
    {
      title: "Stray",
      shortDescription: "一隻迷失、孤獨且與家人失散的流浪貓必須解開古老的謎團，才能逃出一座久遭遺忘的城市。",
      heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/header.jpg?t=1733260906",
      coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/header.jpg?t=1733260906",
      screenshots: [
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/ss_88e209a90c2039fa76bca6fa08c641365be38d50.1920x1080.jpg?t=1733260906",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/ss_e8f0cbd5efdba352e89c4cfcee3fe991a1e1be8a.1920x1080.jpg?t=1733260906",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/ss_2221af260c64362fdc835a9dca65f6f1d1192b25.1920x1080.jpg?t=1733260906",
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/ss_f6f6ba009971ff21867d5d8f96a3feb503f787b8.1920x1080.jpg?t=1733260906"
      ],
      releaseDate: "2022 年 7 月 19 日",
      developer: "BlueTwelve Studio",
      publisher: "Annapurna Interactive",
      tags: ["貓", "冒險", "單人", "氛圍", "可愛", "機器人"],
      editions: [
        { id: "standard", name: "Standard Edition", price: 539, note: "本體遊戲" },
        { id: "deluxe", name: "Deluxe Edition", price: 727, note: "含 OST" }
      ]
    }
  ];

  await Game.insertMany(games);
  console.log("Seed done:", games.length, "games");

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
