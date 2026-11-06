/* Collapsible card with the unit's mission and the hints collected. Data: { id, hintsUpTo? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;

  OVA.register("mission", {
    render: function (data, s) {
      var mission = s.missions[data.id];
      var collected = mission.hints.slice(0, data.hintsUpTo || 0);
      var list = collected.length
        ? el("ul", {}, collected.map(function (hint, i) {
            return el("li", { html: s.markdown.inline("**Pista " + (i + 1) + ":** " + hint) });
          }))
        : el("p", { text: mission.noHints });
      return el("details", { class: "ova-mission" }, [
        el("summary", { class: "ova-mission__summary", text: mission.title }),
        el("div", { class: "ova-mission__body" }, [
          el("div", { html: s.markdown.toHtml(mission.text) }),
          list
        ])
      ]);
    }
  });
})(window.OVA);
