/* Sagittal diagram: two sets joined by arrows.
   Modes: read (shows arrows) and build (tap left, then right, to draw or erase an arrow).
   Data: { mode?, title?, icon?, text?, left:{title,items}, right:{title,items}, arrows:[[i,j]] | solution:[[i,j]], hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;
  var W = 360, ROW = 56, HEAD = 44, LEFT_X = 74, RIGHT_X = 286, NODE_W = 124, NODE_H = 50;
  var markerCount = 0;

  function key(pair) { return pair[0] + "-" + pair[1]; }

  OVA.register("sagittal", {
    render: function (data, s) {
      var building = data.mode === "build";
      var arrows = (data.arrows || []).map(function (a) { return a.slice(); });
      var selected = null;
      var locked = false;
      var wrong = {};
      var rows = Math.max(data.left.items.length, data.right.items.length);
      var height = HEAD + rows * ROW + 10;
      var markerId = "ova-arrow-" + (++markerCount);
      var arrowLayer = svg("g");
      var pairList = el("p", { class: "ova-sagittal__pairs", "aria-live": "polite" });
      var leftNodes = [];
      var rightNodes = [];

      function rowY(index, total) { return HEAD + (rows * ROW) * (index + 0.5) / total; }

      function pairsText() {
        if (!arrows.length) return "Pares: todavía ninguno.";
        return "Pares: " + arrows.map(function (a) {
          return "(" + data.left.items[a[0]] + ", " + data.right.items[a[1]] + ")";
        }).join(", ");
      }

      function paint() {
        OVA.dom.mount(arrowLayer, arrows.map(function (a) {
          return svg("line", {
            class: "ova-sagittal__arrow",
            "data-state": wrong[key(a)] ? "error" : null,
            "marker-end": "url(#" + markerId + ")",
            x1: LEFT_X + NODE_W / 2,
            y1: rowY(a[0], data.left.items.length),
            x2: RIGHT_X - NODE_W / 2 - 6,
            y2: rowY(a[1], data.right.items.length)
          });
        }));
        leftNodes.forEach(function (node, i) { node.setAttribute("aria-pressed", i === selected ? "true" : "false"); });
        pairList.textContent = pairsText();
      }

      function toggle(i, j) {
        var at = arrows.map(key).indexOf(key([i, j]));
        if (at === -1) arrows.push([i, j]); else arrows.splice(at, 1);
        wrong = {};
        selected = null;
        paint();
      }

      function createNode(label, x, y, onActivate) {
        var options = { class: "ova-sagittal__node", transform: "translate(" + x + " " + y + ")" };
        if (building) {
          options.role = "button";
          options.tabindex = "0";
          options["aria-label"] = label;
          options.on = {
            click: onActivate,
            keydown: function (ev) {
              if (ev.key !== "Enter" && ev.key !== " ") return;
              ev.preventDefault();
              onActivate();
            }
          };
        }
        return svg("g", options, [
          svg("rect", { class: "ova-sagittal__chip", x: -NODE_W / 2, y: -NODE_H / 2, width: NODE_W, height: NODE_H, rx: 12 }),
          svg("text", { class: "ova-sagittal__label", "text-anchor": "middle", "dominant-baseline": "central", text: label })
        ]);
      }

      leftNodes = data.left.items.map(function (label, i) {
        return createNode(label, LEFT_X, rowY(i, data.left.items.length), function () {
          if (locked) return;
          selected = selected === i ? null : i;
          paint();
        });
      });
      rightNodes = data.right.items.map(function (label, j) {
        return createNode(label, RIGHT_X, rowY(j, data.right.items.length), function () {
          if (!locked && selected !== null) toggle(selected, j);
        });
      });

      var description = "Diagrama de flechas de " + data.left.title + " a " + data.right.title;
      var diagram = svg("svg", {
        class: "ova-sagittal__svg",
        viewBox: "0 0 " + W + " " + height,
        role: building ? "group" : "img",
        "aria-label": description
      }, [
        svg("defs", {}, [svg("marker", { id: markerId, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto" }, [
          svg("path", { class: "ova-sagittal__head", d: "M 0 0 L 10 5 L 0 10 z" })
        ])]),
        svg("text", { class: "ova-sagittal__set", x: LEFT_X, y: 24, "text-anchor": "middle", text: data.left.title }),
        svg("text", { class: "ova-sagittal__set", x: RIGHT_X, y: 24, "text-anchor": "middle", text: data.right.title }),
        svg("rect", { class: "ova-sagittal__oval", x: LEFT_X - 72, y: HEAD - 6, width: 144, height: rows * ROW + 12, rx: 60 }),
        svg("rect", { class: "ova-sagittal__oval", x: RIGHT_X - 72, y: HEAD - 6, width: 144, height: rows * ROW + 12, rx: 60 })
      ].concat(leftNodes, rightNodes, [arrowLayer]));

      var review = null;
      if (building) {
        review = s.createReview({
          hint: data.hint,
          explanation: data.explanation,
          onDone: function () { locked = true; },
          items: [{
            check: function () {
              if (!arrows.length) return "empty";
              var expected = data.solution.map(key);
              var drawn = arrows.map(key);
              wrong = {};
              drawn.forEach(function (k) { if (expected.indexOf(k) === -1) wrong[k] = true; });
              paint();
              var complete = expected.every(function (k) { return drawn.indexOf(k) !== -1; });
              return complete && !Object.keys(wrong).length ? "ok" : "error";
            },
            reveal: function () {
              arrows = data.solution.map(function (a) { return a.slice(); });
              wrong = {};
              selected = null;
              paint();
            }
          }]
        });
      }
      paint();

      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        building ? el("p", { class: "ova-sagittal__help", text: "Toca un elemento de la izquierda y luego uno de la derecha. Si repites, la flecha se borra." }) : null,
        el("div", { class: "ova-sagittal" }, [diagram]),
        building ? pairList : null,
        review ? review.element : null
      ]);
    }
  });
})(window.OVA);
