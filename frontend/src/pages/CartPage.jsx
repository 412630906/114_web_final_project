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
    for (var i = 0; i < items.length; i++) sum += items[i].priceSnapshot;
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

  async function removeItem(itemId) {
    try {
      await storeApi.removeFromCart(itemId);
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
      await storeApi.checkout();
      if (onToast) onToast("結帳成功！已加入遊戲庫");
      window.location.hash = "#/library";
    } catch (e) {
      if (onToast) onToast(e.message || "結帳失敗", "danger");
    }
  }

  if (loading) return <Loading text="載入購物車中..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  var items = cart.items || [];
  var empty = false;
  if (items.length === 0) empty = true;

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="page-title">購物車</div>
          <div className="page-sub">版本會一起加入遊戲庫</div>
        </div>
        <a className="btn btn-outline-light" href="#/">
          回到商店
        </a>
      </div>

      {empty ? (
        <div className="panel">
          <div className="muted">購物車是空的，去商店挑遊戲吧。</div>
        </div>
      ) : (
        <div className="panel">
          <div className="list-group list-group-flush">
            {items.map((it) => (
              <div className="list-group-item cart-row" key={it.itemId}>
                <div className="cart-left">
                  <img className="cart-thumb" src={it.coverSnapshot} alt={it.titleSnapshot} />
                  <div>
                    <div className="cart-title">{it.titleSnapshot}</div>
                    <div className="cart-sub">{it.editionSnapshot}</div>
                  </div>
                </div>

                <div className="cart-right">
                  <div className="cart-price">{formatTWD(it.priceSnapshot)}</div>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(it.itemId)}>
                    移除
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">總金額：{formatTWD(total)}</div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                清空
              </button>
              <button className="btn btn-green btn-green-lg" onClick={checkout}>
                結帳
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
