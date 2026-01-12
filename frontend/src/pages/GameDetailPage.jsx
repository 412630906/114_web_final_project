import React, { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";
import { formatTWD } from "../utils/money.js";

function pickFirstEditionId(game) {
  var eds = game.editions || [];
  if (eds.length === 0) return "";
  return eds[0].id;
}

function findEdition(game, editionId) {
  var eds = game.editions || [];
  for (var i = 0; i < eds.length; i++) {
    if (eds[i].id === editionId) return eds[i];
  }
  return null;
}

function TagChip(props) {
  return <span className="tag-chip">{props.text}</span>;
}

export default function GameDetailPage(props) {
  var gameId = props.gameId;
  var onToast = props.onToast;

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");

  const [selectedEditionId, setSelectedEditionId] = useState("");
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  useEffect(() => {
    var alive = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await storeApi.getGameById(gameId);
        if (!alive) return;

        var g = res.game;
        setGame(g);

        var first = pickFirstEditionId(g);
        setSelectedEditionId(first);

        // 預設第一張截圖
        setActiveShotIndex(0);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "載入遊戲失敗");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [gameId]);

  function setShotIndexSafe(idx) {
    if (!game) return;

    var shots = game.screenshots || [];
    if (shots.length === 0) return;

    var next = idx;

    if (next < 0) next = 0;
    if (next > shots.length - 1) next = shots.length - 1;

    setActiveShotIndex(next);
  }

  function nextShot() {
    setShotIndexSafe(activeShotIndex + 1);
  }

  function prevShot() {
    setShotIndexSafe(activeShotIndex - 1);
  }

  async function addToCart() {
    try {
      await storeApi.addToCart(gameId, selectedEditionId);
      if (onToast) onToast("已加入購物車");
      window.location.hash = "#/cart";
    } catch (e) {
      if (onToast) onToast(e.message || "加入購物車失敗", "danger");
    }
  }

  if (loading) return <Loading text="載入遊戲頁面中..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!game) return <div className="alert alert-danger">找不到遊戲</div>;

  var shots = game.screenshots || [];
  var mainMediaUrl = "";
  if (shots.length > 0) {
    if (activeShotIndex < 0) mainMediaUrl = shots[0];
    else if (activeShotIndex > shots.length - 1) mainMediaUrl = shots[shots.length - 1];
    else mainMediaUrl = shots[activeShotIndex];
  } else {
    mainMediaUrl = game.heroImage;
  }

  var selectedEd = findEdition(game, selectedEditionId);
  if (!selectedEd) selectedEd = findEdition(game, pickFirstEditionId(game));

  var tags = game.tags || [];

  return (
    <div className="detail-steam">
      <div className="detail-topbar">
        <a className="btn btn-outline-light btn-sm" href="#/">
          ← 回到商店
        </a>
        <div className="detail-top-title">{game.title}</div>
        <div className="detail-top-actions">
          <a className="btn btn-outline-light btn-sm" href="#/cart">購物車</a>
          <a className="btn btn-outline-light btn-sm" href="#/library">我的遊戲庫</a>
        </div>
      </div>

      <div className="detail-grid">
        {/* 左：媒體輪播 */}
        <div className="media-panel">
          <div className="media-stage">
            <img className="media-main" src={mainMediaUrl} alt="screenshot" />

            <button className="media-nav media-prev" onClick={prevShot} aria-label="prev">
              ‹
            </button>
            <button className="media-nav media-next" onClick={nextShot} aria-label="next">
              ›
            </button>
          </div>

          <div className="thumb-strip">
            {shots.map((url, idx) => {
              var cls = "thumb";
              if (idx === activeShotIndex) cls = "thumb thumb-active";

              return (
                <button
                  key={url}
                  className={cls}
                  onClick={() => setShotIndexSafe(idx)}
                  aria-label={"shot " + String(idx + 1)}
                >
                  <img className="thumb-img" src={url} alt={"thumb " + String(idx + 1)} />
                </button>
              );
            })}
          </div>
        </div>

        {/* 右：資訊欄 + 購買 */}
        <div className="side-panel">
          <div className="side-capsule">
            <img className="capsule-img" src={game.capsuleImage || game.coverImage} alt={game.title} />
          </div>

          <div className="side-desc">
            {game.shortDescription || game.description}
          </div>

          <div className="side-meta">
            <div className="meta-row">
              <div className="meta-label">發行日期：</div>
              <div className="meta-value">{game.releaseDate || "—"}</div>
            </div>
            <div className="meta-row">
              <div className="meta-label">開發人員：</div>
              <div className="meta-value linklike">{game.developer || "—"}</div>
            </div>
            <div className="meta-row">
              <div className="meta-label">發行商：</div>
              <div className="meta-value linklike">{game.publisher || "—"}</div>
            </div>
          </div>

          <div className="side-tags">
            <div className="tags-title">使用者為此產品所選用的熱門標籤：</div>
            <div className="tags-wrap">
              {tags.map((t) => <TagChip key={t} text={t} />)}
            </div>
          </div>

          <div className="buy-panel">
            <div className="buy-title">購買 {game.title}</div>

            <div className="edition-select">
              <div className="edition-select-title">選擇版本</div>
              <div className="edition-list">
                {(game.editions || []).map((ed) => {
                  var active = false;
                  if (ed.id === selectedEditionId) active = true;

                  var cls = "edition-item";
                  if (active) cls = "edition-item edition-item-active";

                  return (
                    <button
                      key={ed.id}
                      className={cls}
                      onClick={() => setSelectedEditionId(ed.id)}
                    >
                      <div className="edition-item-name">{ed.name}</div>
                      <div className="edition-item-note">{ed.note}</div>
                      <div className="edition-item-price">{formatTWD(ed.price)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="buy-row">
              <div className="buy-price">
                {selectedEd ? formatTWD(selectedEd.price) : ""}
              </div>
              <button className="btn btn-green btn-green-lg" onClick={addToCart}>
                加入購物車
              </button>
            </div>

            <div className="buy-tip">
              註：此版本無金流串接；結帳代表建立訂單並加入遊戲庫。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
