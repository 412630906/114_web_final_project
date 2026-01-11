const KEY = "guestId";

function randomStringFallback() {
  var s = "";
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 24; i++) {
    var idx = Math.floor(Math.random() * chars.length);
    s += chars.charAt(idx);
  }
  return s;
}

export function ensureGuestId() {
  var id = localStorage.getItem(KEY);
  if (id && id.length > 0) return id;

  var next = "";
  if (window.crypto && window.crypto.randomUUID) {
    next = window.crypto.randomUUID();
  } else {
    next = randomStringFallback();
  }

  localStorage.setItem(KEY, next);
  return next;
}

export function getGuestId() {
  return ensureGuestId();
}
