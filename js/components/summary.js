/* End-of-session summary: the concepts learned, in one place. Data: { title?, icon?, items:[{ term, definition }] } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var DEFAULT_TITLE = "Lo que aprendiste en esta sesión";
  var DEFAULT_ICON = "📌";

  OVA.register("summary", {
    render: function (data, s) {
      var entries = [];
      data.items.forEach(function (item) {
        entries.push(el("dt", { class: "ova-summary__term", text: item.term }));
        entries.push(el("dd", { class: "ova-summary__definition", html: s.markdown.inline(item.definition) }));
      });
      return OVA.dom.card({
        title: data.title || DEFAULT_TITLE,
        icon: data.icon || DEFAULT_ICON,
        variant: "summary"
      }, [el("dl", { class: "ova-summary" }, entries)]);
    }
  });
})(window.OVA);
