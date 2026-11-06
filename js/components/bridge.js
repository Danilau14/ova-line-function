/* Page closing that links to the next one. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;

  OVA.register("bridge", {
    render: function (data, services) {
      return el("div", { class: "ova-bridge" }, [
        el("span", { class: "ova-bridge__arrow", "aria-hidden": "true", text: "➡️" }),
        el("div", { html: services.markdown.toHtml(data.text) })
      ]);
    }
  });
})(window.OVA);
