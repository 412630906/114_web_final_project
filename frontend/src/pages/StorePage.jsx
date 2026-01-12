import React, { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";
import { formatTWD } from "../utils/money.js";

function openGame(id) {
  window.location.hash = "#/game/" + id;
}

function safeCeilDiv(n, d) {
  // ceil(n/d) 但不用 Math.ceil / Math.floor
  // 例如 n=9, d=4 -> (9+3)/4=3
  var raw = String((n + (d - 1)) / d);
  var v = parseInt(raw, 10);
  if (!v) return 0;
  return v;
}

function getAtWrap(arr, idx) {
  if (!arr) return null;

  var len = arr.length;
  if (len < 1) return null;

  var m = idx % len;
  if (m < 0) m += len;

  return arr[m];
}

function FeaturedTile(props) {
  var game = props.game;
  var size = props.size; // "lg" or "sm"
  var badgeText = props.badgeText;

  if (!game) return null;

  var cls = "ftile";
  if (size === "lg") cls = "ftile ftile-lg";
  if (size === "sm") cls = "ftile ftile-sm";

  var price = 0;
  if (game.editions && game.editions.length > 0) {
    price = game.editions[0].price; // 起價
  }

  return (
    <div className={cls} onClick={() => openGame(game._id)} role="button" tabIndex={0}>
      <img className="ftile-img" src={game.heroImage || game.coverImage} alt={game.title} />

      <div className="ftile-grad" />

      <div className="ftile-bar">
        <div className="ftile-left">
          <div className="ftile-title">{game.title}</div>
          {badgeText ? <div className="ftile-badge">{badgeText}</div> : null}
        </div>

        <div className="ftile-price">
          <div className="ftile-price-label">起</div>
          <div className="ftile-price-val">{formatTWD(price)}</div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage(props) {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    var alive = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await storeApi.getGames();
        if (!alive) return;

        var list = res.games || [];
        setGames(list);
        setSlide(0);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "載入商店失敗");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

  function slideCount() {
    // 1 個 slide 放 4 款：左大、中大、右上、右下
    var n = games.length;
    var c = safeCeilDiv(n, 4);
    if (c < 1) c = 1;
    return c;
  }

  function goPrev() {
    var c = slideCount();
    var next = slide - 1;
    if (next < 0) next = c - 1;
    setSlide(next);
  }

  function goNext() {
    var c = slideCount();
    var next = slide + 1;
    if (next > c - 1) next = 0;
    setSlide(next);
  }

  function setSlideSafe(i) {
    var c = slideCount();
    var next = i;
    if (next < 0) next = 0;
    if (next > c - 1) next = c - 1;
    setSlide(next);
  }

  if (loading) return <Loading text="載入商店中..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  var base = slide * 4;

  var g0 = getAtWrap(games, base + 0);
  var g1 = getAtWrap(games, base + 1);
  var g2 = getAtWrap(games, base + 2);
  var g3 = getAtWrap(games, base + 3);

  var dots = [];
  var count = slideCount();
  for (var i = 0; i < count; i++) dots.push(i);

  return (
    <div>
      <div className="home-head">
        <div className="home-title">精選與推薦</div>
        <div className="home-sub">點擊遊戲進入詳細頁後選版本加入購物車</div>
      </div>

      <div className="featured-wrap">
        <button className="featured-arrow featured-left" onClick={goPrev} aria-label="prev">
          ‹
        </button>

        <div className="featured-grid">
          <FeaturedTile game={g0} size="lg" badgeText="週末精選" />
          <FeaturedTile game={g1} size="lg" badgeText="週末精選" />

          <div className="featured-right">
            <FeaturedTile game={g2} size="sm" badgeText="今日推薦" />
            <FeaturedTile game={g3} size="sm" badgeText="今日推薦" />
          </div>
        </div>

        <button className="featured-arrow featured-right" onClick={goNext} aria-label="next">
          ›
        </button>

        <div className="featured-dots">
          {dots.map((d) => {
            var cls = "dot";
            if (d === slide) cls = "dot dot-active";
            return (
              <button
                key={d}
                className={cls}
                onClick={() => setSlideSafe(d)}
                aria-label={"slide " + String(d + 1)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
