/* Dialogue in bubbles. side:"me" = main character, on the right. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var DEFAULT_AVATAR = "🙂";

  OVA.register("chat", {
    render: function (data, services) {
      var messages = data.messages.map(function (m) {
        var className = "ova-chat__message" + (m.side === "me" ? " ova-chat__message--me" : "");
        return el("li", { class: className }, [
          el("span", { class: "ova-chat__avatar", "aria-hidden": "true", text: m.avatar || DEFAULT_AVATAR }),
          el("div", { class: "ova-chat__bubble" }, [
            el("span", { class: "ova-chat__who", text: m.who }),
            el("span", { html: services.markdown.inline(m.text) })
          ])
        ]);
      });
      return el("ul", { class: "ova-chat" }, messages);
    }
  });
})(window.OVA);
