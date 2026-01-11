import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard.jsx";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";

export default function StorePage(props) {
  const onToast = props.onToast;

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    var alive = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await storeApi.getGames();
        if (!alive) return;
        setGames(res.games);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "載入遊戲失敗");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  async function addToCart(game) {
    try {
      await storeApi.addToCart(game._id);
      if (onToast) onToast("已加入購物車");
    } catch (e) {
      if (onToast) onToast(e.message || "加入購物車失敗", "danger");
    }
  }

  if (loading) {
    return <Loading text="載入商店遊戲中..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h3 className="mb-1">遊戲商店</h3>
          <div className="text-muted">訪客模式（無登入 / 無評論 / 無詳細頁）</div>
        </div>
        <a className="btn btn-outline-secondary" href="#/cart">
          前往購物車
        </a>
      </div>

      <div className="row g-3">
        {games.map((g) => (
          <div className="col-12 col-sm-6 col-lg-3" key={g._id}>
            <GameCard game={g} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
