export function formatTWD(n) {
  var num = n;
  if (typeof num !== "number") num = 0;
  return "NT$ " + num.toLocaleString("zh-TW");
}
