import React from "react";

export default function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#/">
          Mini Steam
        </a>

        <div className="navbar-nav ms-auto">
          <a className="nav-link" href="#/">
            商店
          </a>
          <a className="nav-link" href="#/cart">
            購物車
          </a>
          <a className="nav-link" href="#/library">
            我的遊戲庫
          </a>
        </div>
      </div>
    </nav>
  );
}
