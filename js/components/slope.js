/* Slope as a fraction, next to the triangle it comes from.
   solve: the student fills in the numerator, the denominator and the result.
   explore: two points move along a line and the fraction recalculates live.
   Data: { mode, title?, icon?, variant?, text?, x, y, points:[[x1,y1],[x2,y2]], line?:{m,b}, hint?, explanation? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;

  function number(value) {
    return value < 0 ? "−" + OVA.dom.formatNumber(-value) : OVA.dom.formatNumber(value);
  }

  /* "13.000 − 7.000", with parentheses around a negative: "4 − (−2)". */
  function difference(a, b) {
    return number(a) + " − " + (b < 0 ? "(" + number(b) + ")" : number(b));
  }

  function slopeOf(p, q) {
    return (q[1] - p[1]) / (q[0] - p[0]);
  }

  /* The plane with the line, the triangle and the two labeled points. */
  function createDrawing(d, s) {
    var drawing = s.planeDrawing;
    var base = drawing.create(d, s.scale);
    var scale = base.scale;
    var lineLayer = svg("g", { "clip-path": "url(#" + base.clipId + ")" });
    var layer = svg("g");

    var amounts = el("div", { class: "ova-slope__amounts" });

    function coordLabel(p, side) {
      var background = svg("rect", { class: "ova-plane__coord-bg", rx: 8 });
      var text = svg("text", { class: "ova-plane__coord-text", "text-anchor": "middle", "dominant-baseline": "central" });
      var group = svg("g", {}, [background, text]);
      drawing.placeLabel(group, background, text, base.m, scale.sx(p[0]), scale.sy(p[1]),
        "(" + drawing.formatValue(d.x, p[0]) + ", " + drawing.formatValue(d.y, p[1]) + ")", side);
      return group;
    }

    function paint(p, q, showAmounts) {
      /* With a known line it stays drawn even when both points fall on the same place. */
      var m = d.line ? d.line.m : slopeOf(p, q);
      OVA.dom.mount(lineLayer, svg("line", {
        class: "ova-plane__line",
        x1: scale.sx(d.x.min),
        y1: scale.sy(p[1] + m * (d.x.min - p[0])),
        x2: scale.sx(d.x.max),
        y2: scale.sy(p[1] + m * (d.x.max - p[0]))
      }));
      var samePoint = p[0] === q[0];

      var X1 = scale.sx(p[0]), Y1 = scale.sy(p[1]), X2 = scale.sx(q[0]), Y2 = scale.sy(q[1]);
      var nodes = [
        svg("line", { class: "ova-slope__run", x1: X1, y1: Y1, x2: X2, y2: Y1 }),
        svg("line", { class: "ova-slope__rise", x1: X2, y1: Y1, x2: X2, y2: Y2 })
      ];
      nodes.push(svg("circle", { class: "ova-plane__point", cx: X1, cy: Y1 }));
      if (!samePoint) nodes.push(svg("circle", { class: "ova-plane__point", cx: X2, cy: Y2 }));
      nodes.push(coordLabel(p, q[1] >= p[1] ? 1 : -1));
      if (!samePoint) nodes.push(coordLabel(q, q[1] >= p[1] ? -1 : 1));
      OVA.dom.mount(layer, nodes);

      OVA.dom.mount(amounts, showAmounts && !samePoint ? [
        el("span", { class: "ova-slope__amount", "data-kind": "run", text: "Avanza: " + drawing.formatValue(d.x, q[0] - p[0]) }),
        el("span", { class: "ova-slope__amount", "data-kind": "rise", text: "Cambia: " + drawing.formatValue(d.y, q[1] - p[1]) })
      ] : []);
    }

    return {
      paint: paint,
      amounts: amounts,
      element: el("div", { class: "ova-plane__frame" }, [
        base.frame(d.description || "Recta con dos puntos y el triángulo de su pendiente", [lineLayer, layer])
      ])
    };
  }

  function solveMode(d, s) {
    var p = d.points[0], q = d.points[1];
    var rise = q[1] - p[1], run = q[0] - p[0];
    var drawing = createDrawing(d, s);
    function blank(answer, placeholder, label) {
      return s.createField({ answer: answer, signed: true, placeholder: placeholder, label: label });
    }
    var y2 = blank(q[1], "y₂", "Valor de y dos");
    var y1 = blank(p[1], "y₁", "Valor de y uno");
    var x2 = blank(q[0], "x₂", "Valor de x dos");
    var x1 = blank(p[0], "x₁", "Valor de x uno");
    var top = blank(rise, "", "Resultado de la resta de arriba");
    var bottom = blank(run, "", "Resultado de la resta de abajo");
    var result = blank(rise / run, "m", "Valor de la pendiente");
    var review = s.createReview({
      hint: d.hint,
      explanation: d.explanation,
      onDone: function () { drawing.paint(p, q, true); },
      items: [y2, y1, x2, x1, top, bottom, result]
    });
    drawing.paint(p, q, false);

    function subtraction(a, b) {
      return [a.element, el("span", { class: "ova-slope__minus", text: "−" }), b.element];
    }
    function fraction(topNodes, bottomNodes) {
      return el("div", { class: "ova-slope__fraction" }, [
        el("div", { class: "ova-slope__part" }, topNodes),
        el("div", { class: "ova-slope__part ova-slope__part--bottom" }, bottomNodes)
      ]);
    }

    return el("div", { class: "ova-slope" }, [
      drawing.element,
      drawing.amounts,
      el("p", { class: "ova-slope__points", html: s.markdown.inline(
        "**Punto 1:** (x₁, y₁) = (" + number(p[0]) + ", " + number(p[1]) + ")  ·  **Punto 2:** (x₂, y₂) = (" + number(q[0]) + ", " + number(q[1]) + ")"
      ) }),
      el("div", { class: "ova-slope__equation" }, [
        el("span", { class: "ova-slope__symbol", text: "m =" }),
        fraction(subtraction(y2, y1), subtraction(x2, x1)),
        el("span", { class: "ova-slope__symbol", text: "=" }),
        fraction([top.element], [bottom.element]),
        el("span", { class: "ova-slope__symbol", text: "=" }),
        result.element
      ]),
      review.element
    ]);
  }

  function exploreMode(d, s) {
    var yAt = function (x) { return d.line.m * x + d.line.b; };
    var x1 = d.points[0][0], x2 = d.points[1][0];
    var drawing = createDrawing(d, s);
    var readout = el("div", { class: "ova-slope__live", "aria-live": "polite" });

    function paint() {
      var p = [x1, yAt(x1)], q = [x2, yAt(x2)];
      drawing.paint(p, q, true);
      readout.innerHTML = x1 === x2
        ? s.markdown.inline("Elige dos puntos distintos: abajo quedaría 0, y no se puede dividir entre 0.")
        : s.markdown.inline("m = [[" + difference(q[1], p[1]) + "|" + difference(q[0], p[0]) + "]] = [[" + number(q[1] - p[1]) + "|" + number(q[0] - p[0]) + "]] = **" + number(slopeOf(p, q)) + "**");
    }

    function control(label, value, onChange) {
      return el("label", { class: "ova-lab__control" }, [
        el("span", { class: "ova-lab__name", text: label }),
        el("input", {
          class: "ova-chart__slider",
          type: "range",
          min: d.x.min,
          max: d.x.max,
          step: 1,
          value: value,
          on: { input: function (ev) { onChange(Number(ev.target.value)); paint(); } }
        })
      ]);
    }

    paint();
    return el("div", { class: "ova-slope" }, [
      drawing.element,
      drawing.amounts,
      readout,
      control("Mueve el primer punto", x1, function (v) { x1 = v; }),
      control("Mueve el segundo punto", x2, function (v) { x2 = v; })
    ]);
  }

  OVA.register("slope", {
    figure: true,
    render: function (data, s) {
      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        data.mode === "explore" ? exploreMode(data, s) : solveMode(data, s)
      ]);
    }
  });
})(window.OVA);
