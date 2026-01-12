const KEY = "theme";

export function getTheme() {
  var t = localStorage.getItem(KEY);
  if (t === "light") return "light";
  return "dark";
}

export function setTheme(theme) {
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}

export function toggleTheme() {
  var current = getTheme();
  if (current === "dark") {
    setTheme("light");
    return "light";
  }
  setTheme("dark");
  return "dark";
}

export function applyTheme(theme) {
  var html = document.documentElement;
  html.setAttribute("data-theme", theme);
}
