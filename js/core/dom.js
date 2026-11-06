/* Helpers to create and mount elements. Knows nothing about components or content. */
(function (OVA) {
  "use strict";

  OVA.data = {};

  var ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var SVG_NS = "http://www.w3.org/2000/svg";

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) { return ENTITIES[c]; });
  }

  function applyOptions(node, options) {
    Object.keys(options || {}).forEach(function (key) {
      var value = options[key];
      if (value === undefined || value === null || value === false) return;
      if (key === "class") node.setAttribute("class", value);
      else if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "on") Object.keys(value).forEach(function (ev) { node.addEventListener(ev, value[ev]); });
      else node.setAttribute(key, value === true ? "" : value);
    });
  }

  function appendAll(node, children) {
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  /* options: { class, text, html, on:{event:fn}, ...attributes }. html must already be sanitized. */
  function el(tag, options, children) {
    var node = document.createElement(tag);
    applyOptions(node, options);
    return appendAll(node, children);
  }

  function svg(tag, options, children) {
    var node = document.createElementNS(SVG_NS, tag);
    applyOptions(node, options);
    return appendAll(node, children);
  }

  /* Replaces the content of parent with the given children. */
  function mount(parent, children) {
    parent.textContent = "";
    [].concat(children).forEach(function (child) { if (child) parent.appendChild(child); });
    return parent;
  }

  /* Base .ova-box card: the head only exists when there is a title. */
  function card(data, children, extraClass) {
    var className = "ova-box" + (data.variant ? " ova-box--" + data.variant : "") + (extraClass ? " " + extraClass : "");
    var head = data.title ? el("div", { class: "ova-box__head" }, [
      data.icon ? el("span", { "aria-hidden": "true", text: data.icon }) : null,
      el("h3", { class: "ova-box__title", text: data.title })
    ]) : null;
    return el("section", { class: className }, [head].concat(children));
  }

  /* 1200 → 1.200 (Colombian format). */
  function formatNumber(value) {
    return Number(value).toLocaleString("es-CO");
  }

  /* "3 días", "1 día", "4 km". */
  function formatQuantity(value, unit) {
    var text = value < 0 ? "−" + formatNumber(-value) : formatNumber(value);
    if (!unit) return text;
    return text + " " + (Math.abs(value) === 1 ? unit.replace(/([aeiouáéíóú])s$/, "$1") : unit);
  }

  OVA.dom = { formatQuantity: formatQuantity, el: el, svg: svg, mount: mount, escapeHtml: escapeHtml, card: card, formatNumber: formatNumber };
})(window.OVA = window.OVA || {});
