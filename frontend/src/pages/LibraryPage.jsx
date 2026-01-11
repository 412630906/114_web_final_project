import React, { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";
import { formatTWD } from "../utils/money.js";

export default function LibraryPage(props) {
  const [loading, setLoading] = useState(true);
  const [library, setLibrary] = useState({ games: [] });
  const [error, setError] = useState("");

  const count = useMemo(() => {
    var g = library.games || [];
    return g.length;
  }, [library]);

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

    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return <Loading text="載入遊戲庫中..." />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  var games = library.games || [];
  var empty = false;
  if (games.length === 0) empty = true;

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h3 className="mb-1">我的遊戲庫</h3>
          <div className="text-muted">已擁有 {count} 款遊戲</div>
        </div>
        <a className="btn btn-outline-secondary" href="#/">
          回到商店
        </a>
      </div>

      {empty ? (
        <div className="alert alert-secondary">
          目前沒有已購買遊戲，去商店加入購物車並結帳吧！
        </div>
      ) : (
        <div className="row g-3">
          {games.map((g) => (
            <div className="col-12 col-sm-6 col-lg-3" key={g.gameId}>
              <div className="card h-100 shadow-sm">
                <img src={g.coverSnapshot} alt={g.titleSnapshot} className="card-img-top game-cover" />
                <div className="card-body">
                  <div className="fw-semibold">{g.titleSnapshot}</div>
                  <div className="text-muted">{formatTWD(g.priceSnapshot)}</div>
                  <div className="small text-muted mt-2">
                    購買時間：{new Date(g.purchasedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
