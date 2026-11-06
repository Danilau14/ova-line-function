/* Taxi receipts drawn as paper tickets. Data: { title?, icon?, text?, items:[{ number, who, route, km, total }] } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var COMPANY = "🚕 Taxi del primo";
  var THANKS = "¡Gracias por su carrera!";

  function line(label, value, extraClass) {
    return el("div", { class: "ova-receipt__line" + (extraClass ? " " + extraClass : "") }, [
      el("dt", { text: label }),
      el("dd", { text: value })
    ]);
  }

  function receipt(item) {
    return el("li", { class: "ova-receipt" }, [
      el("p", { class: "ova-receipt__company", text: COMPANY }),
      el("p", { class: "ova-receipt__number", text: "Recibo N.º " + item.number }),
      el("dl", { class: "ova-receipt__lines" }, [
        line("Pasajero", item.who),
        line("Recorrido", item.route),
        line("Distancia", OVA.dom.formatNumber(item.km) + " km"),
        line("Total", "$" + OVA.dom.formatNumber(item.total), "ova-receipt__line--total")
      ]),
      el("p", { class: "ova-receipt__thanks", text: THANKS })
    ]);
  }

  OVA.register("receipts", {
    render: function (data, s) {
      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("ul", { class: "ova-receipts" }, data.items.map(receipt))
      ]);
    }
  });
})(window.OVA);
