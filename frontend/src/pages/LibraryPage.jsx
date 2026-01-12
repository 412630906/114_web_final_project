import React, { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";
import { formatTWD } from "../utils/money.js";

export default function LibraryPage(props) {
  const [loading, setLoading] = useState(true);
  const [library, setLibrary] = useState({ games: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    var alive = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await storeApi.getLibrary();
        if (!alive) return;
        setLibrary(res.library);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "載入遊戲庫失敗");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

  if (loading) return <Loading text="載入遊戲庫中..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  var games = library.games || [];
  var empty = false;
  if (games.length === 0) empty = true;

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="page-title">我的遊戲庫</div>
          <div className="page-sub">你已擁有 {games.length} 個項目</div>
        </div>
        <a className="btn btn-outline-light" href="#/">
          回到商店
        </a>
      </div>

      {empty ? (
        <div className="panel">
          <div className="muted">目前沒有已購買遊戲，去商店購買吧。</div>
        </div>
      ) : (
        <div className="grid-tiles">
          {games.map((g) => (
            <div className="tile" key={g.gameId + "_" + g.editionId}>
              <img className="tile-img" src={g.coverSnapshot} alt={g.titleSnapshot} />
              <div className="tile-body">
                <div className="tile-title">{g.titleSnapshot}</div>
                <div className="tile-sub">{g.editionSnapshot}</div>
                <div className="tile-price">{formatTWD(g.priceSnapshot)}</div>
                <div className="tile-time">購買時間：{new Date(g.purchasedAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
