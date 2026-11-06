/* Text box. Without a title it paints no head.
   The "naming" variant waits for the activities above it, but the student can open it at any moment. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var WAITING_TEXT = "Se abre solo cuando termines las actividades de arriba.";
  var OPEN_TEXT = "Ver el concepto";

  OVA.register("box", {
    render: function (data, services) {
      var text = el("div", { class: "ova-box__text", html: services.markdown.toHtml(data.text) });
      if (data.variant !== "naming") return OVA.dom.card(data, [text]);

      var slot = el("div", { "aria-live": "polite" });
      function open() { OVA.dom.mount(slot, text); }
      OVA.dom.mount(slot, el("div", { class: "ova-box__locked" }, [
        el("p", { class: "ova-box__waiting", text: WAITING_TEXT }),
        el("button", { class: "ova-btn ova-btn--soft", type: "button", text: OPEN_TEXT, on: { click: open } })
      ]));
      services.gate.whenOpen(open);
      return OVA.dom.card(data, [slot]);
    }
  });
})(window.OVA);
