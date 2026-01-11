import React, { useEffect, useMemo, useState } from "react";
import AppNavbar from "./components/AppNavbar.jsx";
import StorePage from "./pages/StorePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import ToastMessage from "./components/ToastMessage.jsx";
import { ensureGuestId } from "./utils/guest.js";

function getRouteFromHash() {
  var hash = window.location.hash;
  if (!hash) return "/";
  if (hash === "#/") return "/";
  if (hash === "#/cart") return "/cart";
  if (hash === "#/library") return "/library";
  return "/";
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash());
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    ensureGuestId();

    function onHashChange() {
      setRoute(getRouteFromHash());
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const onToast = useMemo(() => {
    return function showToast(message, type) {
      var nextType = type;
      if (!nextType) nextType = "success";
      setToast({ show: true, message: message, type: nextType });
    };
  }, []);

  function closeToast() {
    setToast({ show: false, message: "", type: "success" });
  }

  var page = null;
  if (route === "/") {
    page = <StorePage onToast={onToast} />;
  } else if (route === "/cart") {
    page = <CartPage onToast={onToast} />;
  } else if (route === "/library") {
    page = <LibraryPage onToast={onToast} />;
  } else {
    page = <StorePage onToast={onToast} />;
  }

  return (
    <div>
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
