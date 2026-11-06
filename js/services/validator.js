/* Compares answers without touching the DOM. Returns "ok", "error" or "empty". */
(function (OVA) {
  "use strict";

  /* Accepts "1.500", "1500", "+6", "−25", "$ 4.000" and "2,5". */
  function toNumber(text) {
    var clean = String(text).trim().replace(/[\s$]/g, "").replace(/[−–]/g, "-").replace(/^\+/, "");
    if (/^-?\d{1,3}(\.\d{3})+$/.test(clean)) clean = clean.replace(/\./g, "");
    clean = clean.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(clean) ? Number(clean) : NaN;
  }

  function validate(type, answer, expected) {
    if (answer === null || answer === undefined || String(answer).trim() === "") return "empty";
    if (type === "numeric") return Math.abs(toNumber(answer) - expected) < 1e-9 ? "ok" : "error";
    return String(answer) === String(expected) ? "ok" : "error";
  }

  OVA.validator = { validate: validate, toNumber: toNumber };
})(window.OVA);
