import React, { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading.jsx";
import { storeApi } from "../api/index.js";
import { formatTWD } from "../utils/money.js";

export default function CartPage(props) {
  const onToast = props.onToast;

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [] });
  const [error, setError] = useState("");

  const total = useMemo(() => {
    var sum = 0;
    var items = cart.items || [];
    for (var i = 0; i < items.length; i++) {
      sum += items[i].priceSnapshot;
    }
    return sum;
  }, [cart]);

  async function refresh() {
    setLoading(true);
    setError("");

    try {
      const res = await storeApi.getCart();
      setCart(res.cart);
    } catch (e) {
      setError(e.message || "載入購物車失敗");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function removeItem(gameId) {
    try {
      await storeApi.removeFromCart(gameId);
      await refresh();
      if (onToast) onToast("已移除購物車");
    } catch (e) {
      if (onToast) onToast(e.message || "移除失敗", "danger");
    }
  }

  async function clearCart() {
    try {
      await storeApi.clearCart();
      await refresh();
      if (onToast) onToast("已清空購物車");
    } catch (e) {
      if (onToast) onToast(e.message || "清空失敗", "danger");
    }
  }

  async function checkout() {
    try {
      const res = await storeApi.checkout();
      if (onToast) onToast("結帳成功！已加入遊戲庫");
      window.location.hash = "#/library";
    } catch (e) {
      if (onToast) onToast(e.message || "結帳失敗", "danger");
    }
  }

  if (loading) {
    return <Loading text="載入購物車中..." />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  var items = cart.items || [];
  var empty = false;
  if (items.length === 0) empty = true;

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h3 className="mb-1">購物車</h3>
          <div className="text-muted">目前共 {items.length} 款遊戲</div>
        </div>
        <a className="btn btn-outline-secondary" href="#/">
          回到商店
        </a>
      </div>

      {empty ? (
        <div className="alert alert-secondary">
          購物車是空的，回商店把遊戲加入購物車吧！
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="list-group">
              {items.map((it) => (
                <div className="list-group-item d-flex align-items-center justify-content-between gap-3" key={it.gameId}>
                  <div className="d-flex align-items-center gap-3">
                    <img src={it.coverSnapshot} alt={it.titleSnapshot} className="cart-thumb" />
                    <div>
                      <div className="fw-semibold">{it.titleSnapshot}</div>
                      <div className="text-muted">{formatTWD(it.priceSnapshot)}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(it.gameId)}>
                    移除
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="fs-5 fw-semibold">總金額：{formatTWD(total)}</div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={clearCart}>
                  清空
                </button>
                <button className="btn btn-success" onClick={checkout}>
                  結帳
                </button>
              </div>
            </div>

            <div className="text-muted small mt-2">
              註：此版本不含金流，結帳代表建立訂單並加入遊戲庫。
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
