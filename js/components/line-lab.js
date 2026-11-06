/* Line lab: draws f(x) = mx + b lines, lets the student move m and/or b, and reads the coordinates on each line.
   Data: { title?, icon?, text?, x, y, lines:[{ name, m, b, controls?:{ m?:{label,min,max,step}, b?:{…} } }], probe?:{initial,step},
           target?:{m,b}, hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;

  function signedNumber(value) { return OVA.dom.formatNumber(Math.abs(value)); }

  /* f(x) = 1.500x + 4.000, with the usual simplifications for 1, 0 and negatives. */
  function formula(m, b) {
    var slope = m === 0 ? "" : (m < 0 ? "−" : "") + (Math.abs(m) === 1 ? "" : signedNumber(m)) + "x";
    if (!slope) return "f(x) = " + (b < 0 ? "−" : "") + signedNumber(b);
    if (b === 0) return "f(x) = " + slope;
    return "f(x) = " + slope + (b < 0 ? " − " : " + ") + signedNumber(b);
  }

  OVA.register("line-lab", {
    figure: true,
    render: function (data, s) {
      var drawing = s.planeDrawing;
      var base = drawing.create(data, s.scale);
      var scale = base.scale;
      var lines = data.lines.map(function (line) { return { name: line.name, m: line.m, b: line.b, controls: line.controls }; });
      var probeX = data.probe ? data.probe.initial : null;
      var strokes = svg("g", { "clip-path": "url(#" + base.clipId + ")" });
      var marks = svg("g");
      var legend = el("ul", { class: "ova-lab__legend", "aria-live": "polite" });

      function yAt(line, x) { return line.m * x + line.b; }

      function legendText(line) {
        var text = line.name + ": " + formula(line.m, line.b);
        if (probeX === null) return text;
        return text + " · (" + drawing.formatValue(data.x, probeX) + ", " + drawing.formatValue(data.y, yAt(line, probeX)) + ")";
      }

      function paint() {
        OVA.dom.mount(strokes, lines.map(function (line, i) {
          return svg("line", {
            class: "ova-lab__line",
            "data-line": i,
            x1: scale.sx(data.x.min),
            y1: scale.sy(yAt(line, data.x.min)),
            x2: scale.sx(data.x.max),
            y2: scale.sy(yAt(line, data.x.max))
          });
        }));

        var nodes = [];
        if (probeX !== null) {
          lines.forEach(function (line, i) {
            var y = yAt(line, probeX);
            if (y < data.y.min || y > data.y.max) return;
            var cx = scale.sx(probeX), cy = scale.sy(y);
            nodes.push(svg("circle", { class: "ova-lab__point", "data-line": i, cx: cx, cy: cy }));
            var background = svg("rect", { class: "ova-plane__coord-bg", rx: 8 });
            var text = svg("text", { class: "ova-plane__coord-text", "text-anchor": "middle", "dominant-baseline": "central" });
            var group = svg("g", {}, [background, text]);
            /* With two lines, the upper label goes above and the lower one below, so they do not overlap. */
            var other = lines[1 - i];
            var side = other && yAt(other, probeX) > y ? 1 : -1;
            drawing.placeLabel(group, background, text, base.m, cx, cy,
              "(" + drawing.formatValue(data.x, probeX) + ", " + drawing.formatValue(data.y, y) + ")", side);
            nodes.push(group);
          });
        }
        OVA.dom.mount(marks, nodes);
        OVA.dom.mount(legend, lines.map(function (line, i) {
          return el("li", { class: "ova-lab__item", "data-line": i, text: legendText(line) });
        }));
      }

      function controlFor(line, parameter) {
        var c = line.controls && line.controls[parameter];
        if (!c) return null;
        var valueText = el("output", { class: "ova-lab__value", text: OVA.dom.formatNumber(line[parameter]) });
        var slider = el("input", {
          class: "ova-chart__slider",
          type: "range",
          min: c.min,
          max: c.max,
          step: c.step,
          value: line[parameter],
          on: { input: function (ev) { setValue(Number(ev.target.value)); } }
        });
        function setValue(value) {
          line[parameter] = value;
          slider.value = value;
          valueText.textContent = value < 0 ? "−" + OVA.dom.formatNumber(-value) : OVA.dom.formatNumber(value);
          paint();
        }
        setters[parameter] = setValue;
        return el("label", { class: "ova-lab__control" }, [
          el("span", { class: "ova-lab__name" }, [document.createTextNode(c.label + ": "), valueText]),
          slider
        ]);
      }

      var controls = [];
      var setters = {};
      lines.forEach(function (line) {
        controls.push(controlFor(line, "m"), controlFor(line, "b"));
      });
      if (data.probe) {
        controls.push(el("label", { class: "ova-lab__control" }, [
          el("span", { class: "ova-lab__name", text: "Mueve el punto: " + data.x.name }),
          el("input", {
            class: "ova-chart__slider",
            type: "range",
            min: data.x.min,
            max: data.x.max,
            step: data.probe.step || 1,
            value: probeX,
            on: { input: function (ev) { probeX = Number(ev.target.value); paint(); } }
          })
        ]));
      }

      var review = data.target ? s.createReview({
        hint: data.hint,
        explanation: data.explanation,
        items: [{
          check: function () {
            return lines[0].m === data.target.m && lines[0].b === data.target.b ? "ok" : "error";
          },
          reveal: function () {
            setters.m(data.target.m);
            setters.b(data.target.b);
          }
        }]
      }) : null;

      paint();
      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("div", { class: "ova-plane" }, [
          el("div", { class: "ova-plane__frame" }, [base.frame(data.description || "Rectas en el plano", [strokes, marks])]),
          legend
        ].concat(controls)),
        review ? review.element : null
      ]);
    }
  });
})(window.OVA);
