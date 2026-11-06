/* Table with editable cells and a change comparator (▲ ▼ ■ with sign and color).
   Data: { title?, icon?, text?, columns:{name,values}, rows:[{name,values,editable?,given?}], showChanges?, hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var formatNumber = OVA.dom.formatNumber;

  function buildRow(row, columns, s, items) {
    var cells = row.values.map(function (value, i) {
      var isFixed = !row.editable || (row.given || []).indexOf(i) !== -1;
      if (isFixed) return el("td", { class: "ova-table__cell", text: formatNumber(value) });
      var field = s.createField({ answer: value, signed: row.signed, label: row.name + " para " + columns.values[i] + " en " + columns.name });
      items.push({ check: field.check, reveal: field.reveal });
      return el("td", { class: "ova-table__cell" }, [field.element]);
    });
    return el("tr", {}, [el("th", { class: "ova-table__head", scope: "row", text: row.name })].concat(cells));
  }

  /* Tables to fill in run top to bottom, so every input fits on a phone next to its entry. */
  function buildVerticalTable(data, s, items) {
    var c = data.columns;
    return el("table", { class: "ova-table" }, [
      el("thead", {}, [el("tr", {}, [c.name].concat(data.rows.map(function (row) { return row.name; })).map(function (name) {
        return el("th", { class: "ova-table__head", scope: "col", text: name });
      }))]),
      el("tbody", {}, c.values.map(function (value, i) {
        return el("tr", {}, [el("th", { class: "ova-table__head", scope: "row", text: formatNumber(value) })].concat(data.rows.map(function (row) {
          if (!row.editable || (row.given || []).indexOf(i) !== -1) {
            return el("td", { class: "ova-table__cell", text: formatNumber(row.values[i]) });
          }
          var field = s.createField({ answer: row.values[i], signed: row.signed, label: row.name + " para " + value + " en " + c.name });
          items.push({ check: field.check, reveal: field.reveal });
          return el("td", { class: "ova-table__cell" }, [field.element]);
        })));
      }))
    ]);
  }

  function changeText(n) {
    if (n > 0) return "▲ +" + formatNumber(n);
    if (n < 0) return "▼ −" + formatNumber(-n);
    return "■ 0";
  }

  function buildChanges(data, s, items) {
    var base = data.rows[0];
    return el("div", { class: "ova-table__changes" }, base.values.slice(1).map(function (value, i) {
      var change = value - base.values[i];
      var from = formatNumber(data.columns.values[i]), to = formatNumber(data.columns.values[i + 1]);
      var field = s.createField({ answer: change, signed: true, label: "Cambio de " + from + " a " + to });
      var arrow = el("span", { class: "ova-table__arrow", text: "↝" });
      function showArrow() {
        arrow.textContent = changeText(change);
        arrow.setAttribute("data-sign", change > 0 ? "up" : change < 0 ? "down" : "flat");
      }
      items.push({
        check: function () {
          var result = field.check();
          if (result === "ok") showArrow();
          return result;
        },
        reveal: function () {
          field.reveal();
          showArrow();
        }
      });
      return el("div", { class: "ova-table__change" }, [
        el("span", { class: "ova-table__step", "aria-hidden": "true", text: "De " + from + " a " + to }),
        arrow,
        field.element
      ]);
    }));
  }

  OVA.register("table", {
    render: function (data, s) {
      var items = [];
      var c = data.columns;
      var vertical = data.vertical || data.rows.some(function (row) { return row.editable; });
      var table = vertical ? buildVerticalTable(data, s, items) : el("table", { class: "ova-table" }, [
        el("thead", {}, [el("tr", {}, [
          el("th", { class: "ova-table__head", scope: "col", text: c.name })
        ].concat(c.values.map(function (v) {
          return el("th", { class: "ova-table__head", scope: "col", text: formatNumber(v) });
        })))]),
        el("tbody", {}, data.rows.map(function (row) { return buildRow(row, c, s, items); }))
      ]);
      var changes = data.showChanges ? buildChanges(data, s, items) : null;

      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("div", { class: "ova-table__frame", tabindex: "0", role: "group", "aria-label": "Tabla: desliza si no cabe" }, [table]),
        changes,
        items.length ? s.createReview({ items: items, hint: data.hint, explanation: data.explanation }).element : null
      ]);
    }
  });
})(window.OVA);
