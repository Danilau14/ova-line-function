/* Feedback messages. States: ok, error, empty, hint (data-state; styling lives in feedback.css). */
(function (OVA) {
  "use strict";

  function create(inline) {
    var node = OVA.dom.el("div", { class: "ova-feedback", "aria-live": "polite" });
    return {
      element: node,
      show: function (messages) {
        OVA.dom.mount(node, messages.map(function (m) {
          return OVA.dom.el("p", { class: "ova-feedback__message", "data-state": m.state, html: inline(m.text) });
        }));
      }
    };
  }

  OVA.feedback = { create: create };
})(window.OVA);
