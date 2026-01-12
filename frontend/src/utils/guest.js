const KEY = "guestId";

function randomStringFallback() {
  var s = "";
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var n = chars.length;

  for (var i = 0; i < 24; i++) {
    // 不用 Math.floor：用 parseInt 截斷小數
    var raw = String(Math.random() * n);
    var idx = parseInt(raw, 10);

    if (idx < 0) idx = 0;
    if (idx >= n) idx = n - 1;

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
