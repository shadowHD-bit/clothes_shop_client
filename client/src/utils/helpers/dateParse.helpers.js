export const dateParse = (date) => {
  function zeroPad(elem) {
    return ("0" + elem).slice(-2);
  }
  var parsed = new Date(date);

  return [
    zeroPad(parsed.getDate()),
    ".",
    zeroPad(parsed.getMonth() + 1),
    ".",
    parsed.getUTCFullYear(),
    " ",
    zeroPad(parsed.getHours()),
    ":",
    zeroPad(parsed.getMinutes()),
    ":",
    zeroPad(parsed.getSeconds()),
  ].join("");
};
