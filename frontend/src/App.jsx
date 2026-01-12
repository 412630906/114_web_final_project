import React, { useEffect, useMemo, useState } from "react";
import AppNavbar from "./components/AppNavbar.jsx";
import StorePage from "./pages/StorePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import GameDetailPage from "./pages/GameDetailPage.jsx";
import ToastMessage from "./components/ToastMessage.jsx";
import { ensureGuestId } from "./utils/guest.js";
import { applyTheme, getTheme } from "./utils/theme.js";

function parseHash() {
  var hash = window.location.hash;
  if (!hash || hash === "#/" || hash === "#") {
    return { path: "/", params: {} };
  }

  if (hash === "#/cart") return { path: "/cart", params: {} };
  if (hash === "#/library") return { path: "/library", params: {} };

  // #/game/<id>
  if (hash.startsWith("#/game/")) {
    var id = hash.replace("#/game/", "");
    return { path: "/game", params: { id: id } };
  }

  return { path: "/", params: {} };
}

export default function App() {
  const [route, setRoute] = useState(parseHash());
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    ensureGuestId();
    applyTheme(getTheme());

    function onHashChange() {
      setRoute(parseHash());
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const onToast = useMemo(() => {
    return function showToast(message, type) {
      var t = type;
      if (!t) t = "success";
      setToast({ show: true, message: message, type: t });
    };
  }, []);

  function closeToast() {
    setToast({ show: false, message: "", type: "success" });
  }

  var page = null;

  if (route.path === "/") page = <StorePage onToast={onToast} />;
  if (route.path === "/cart") page = <CartPage onToast={onToast} />;
  if (route.path === "/library") page = <LibraryPage onToast={onToast} />;
  if (route.path === "/game") page = <GameDetailPage gameId={route.params.id} onToast={onToast} />;

  if (!page) page = <StorePage onToast={onToast} />;

  return (
    <div className="app-shell">
      <AppNavbar />

      <main className="container py-4">
        {page}
      </main>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
}
