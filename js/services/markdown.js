/* Simple Markdown → sanitized HTML: paragraphs, "- " lists, **bold**, *italics*, [[top|bottom]] fractions. */
(function (OVA) {
  "use strict";

  var escapeHtml = OVA.dom.escapeHtml;

  function inline(text) {
    return escapeHtml(text)
      .replace(/\[\[(.+?)\|(.+?)\]\]/g, '<span class="ova-frac" role="img" aria-label="$1 sobre $2"><span class="ova-frac__top">$1</span><span class="ova-frac__bottom">$2</span></span>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  function block(chunk) {
    var lines = chunk.split("\n");
    var isList = lines.every(function (l) { return /^- /.test(l); });
    if (!isList) return "<p>" + lines.map(inline).join("<br>") + "</p>";
    return "<ul>" + lines.map(function (l) { return "<li>" + inline(l.slice(2)) + "</li>"; }).join("") + "</ul>";
  }

  function toHtml(text) {
    return String(text).trim().split(/\n\s*\n/).map(block).join("");
  }

  OVA.markdown = { toHtml: toHtml, inline: inline };
})(window.OVA);
