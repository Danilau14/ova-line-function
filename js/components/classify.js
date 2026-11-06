/* Sort cards: drag with the mouse, or tap the card and then the bin (also works with the keyboard).
   Data: { title?, icon?, text?, cards:[{id,text}], bins:[{id,title}], solution:{card:bin}, hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var START = "";

  OVA.register("classify", {
    render: function (data, s) {
      var location = {};
      var selected = null;
      var buttons = {};
      var zones = {};

      function createZone(id, title, extraClass) {
        var list = el("div", { class: "ova-classify__list" });
        var target = el("button", { class: "ova-btn ova-btn--soft ova-classify__target", type: "button", text: "Poner aquí" });
        var node = el("div", {
          class: "ova-classify__zone" + (extraClass ? " " + extraClass : ""),
          "data-zone": id,
          on: {
            click: function () { if (selected) move(selected, id); },
            dragover: function (ev) { ev.preventDefault(); },
            drop: function (ev) { ev.preventDefault(); move(ev.dataTransfer.getData("text/plain"), id); }
          }
        }, [el("h4", { class: "ova-classify__title", text: title }), list, target]);
        zones[id] = { list: list, target: target };
        return node;
      }

      function move(cardId, zoneId) {
        var button = buttons[cardId];
        if (!button || button.disabled || !zones[zoneId]) return;
        location[cardId] = zoneId;
        button.removeAttribute("data-state");
        selected = null;
        zones[zoneId].list.appendChild(button);
        paint();
        button.focus();
      }

      function paint() {
        Object.keys(buttons).forEach(function (id) {
          buttons[id].setAttribute("aria-pressed", id === selected ? "true" : "false");
        });
        Object.keys(zones).forEach(function (id) { zones[id].target.disabled = !selected; });
      }

      var startZone = createZone(START, "Tarjetas", "ova-classify__zone--start");
      var binZones = data.bins.map(function (bin) { return createZone(bin.id, bin.title); });

      var items = data.cards.map(function (card) {
        var button = el("button", {
          class: "ova-classify__card",
          type: "button",
          draggable: "true",
          text: card.text,
          on: {
            click: function (ev) {
              ev.stopPropagation();
              selected = selected === card.id ? null : card.id;
              paint();
            },
            dragstart: function (ev) { ev.dataTransfer.setData("text/plain", card.id); }
          }
        });
        buttons[card.id] = button;
        location[card.id] = START;
        zones[START].list.appendChild(button);
        var revealed = false;
        return {
          check: function () {
            if (revealed) return "ok";
            if (location[card.id] === START) return "empty";
            var result = s.validator.validate("choice", location[card.id], data.solution[card.id]);
            button.setAttribute("data-state", result);
            if (result === "ok") button.disabled = true;
            return result;
          },
          reveal: function () {
            revealed = true;
            location[card.id] = data.solution[card.id];
            zones[data.solution[card.id]].list.appendChild(button);
            button.setAttribute("data-state", "revealed");
            button.disabled = true;
          }
        };
      });
      paint();

      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("p", { class: "ova-classify__help", text: "Arrastra cada tarjeta, o tócala y luego toca «Poner aquí»." }),
        startZone,
        el("div", { class: "ova-classify__bins" }, binZones),
        s.createReview({ items: items, hint: data.hint, explanation: data.explanation }).element
      ], "ova-classify");
    }
  });
})(window.OVA);
