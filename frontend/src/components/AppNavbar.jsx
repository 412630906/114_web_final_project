import React, { useEffect, useState } from "react";
import { getTheme, toggleTheme } from "../utils/theme.js";

export default function AppNavbar() {
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  function onToggle() {
    var t = toggleTheme();
    setThemeState(t);
  }

  var btnText = "深色";
  if (theme === "dark") btnText = "深色";
  if (theme === "light") btnText = "淺色";

  return (
    <nav className="navbar navbar-expand-lg nav-steam">
      <div className="container">
        <a className="navbar-brand brand-steam" href="#/">
          Mini Steam
        </a>

        <div className="navbar-nav ms-auto align-items-center gap-2">
          <a className="nav-link nav-link-steam" href="#/">
            商店
          </a>
          <a className="nav-link nav-link-steam" href="#/cart">
            購物車
          </a>
          <a className="nav-link nav-link-steam" href="#/library">
            我的遊戲庫
          </a>

          <button className="btn btn-sm btn-outline-light ms-2" onClick={onToggle}>
            主題：{btnText}
          </button>
        </div>
      </div>
    </nav>
  );
}
