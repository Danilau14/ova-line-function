/* Shared drawing for coordinate planes: grid, zero axes, tick labels and axis names. */
(function (OVA) {
  "use strict";

  var svg = OVA.dom.svg;
  var formatNumber = OVA.dom.formatNumber;
  var MEASURES = { W: 420, H: 360, L: 84, R: 14, T: 38, B: 56, charWidth: 12, coordHeight: 32, coordGap: 12 };
  var clipCount = 0;

  function axisTitle(axis) {
    return axis.unit ? axis.name + " (" + axis.unit + ")" : axis.name;
  }

  function ticks(axis) {
    var values = [];
    for (var v = axis.min; v <= axis.max + 1e-8; v += axis.step) values.push(Math.round(v * 1e6) / 1e6);
    return values;
  }

  /* Returns { m, scale, nodes, clipId, frame(children) } for a { x, y } configuration. */
  function create(cfg, scaleService) {
    var m = MEASURES;
    var scale = scaleService.create(cfg, m);
    var bottom = m.T + scale.ph;
    var right = m.W - m.R;
    var nodes = [];
    var clipId = "ova-plane-clip-" + (++clipCount);

    ticks(cfg.x).forEach(function (x) {
      var X = scale.sx(x);
      nodes.push(svg("line", { class: "ova-plane__grid", x1: X, y1: m.T, x2: X, y2: bottom }));
      nodes.push(svg("text", { class: "ova-plane__tick", x: X, y: bottom + 24, "text-anchor": "middle", text: formatNumber(x) }));
    });
    ticks(cfg.y).forEach(function (y) {
      var Y = scale.sy(y);
      nodes.push(svg("line", { class: "ova-plane__grid", x1: m.L, y1: Y, x2: right, y2: Y }));
      nodes.push(svg("text", { class: "ova-plane__tick", x: m.L - 8, y: Y, "text-anchor": "end", "dominant-baseline": "central", text: formatNumber(y) }));
    });

    /* Axes sit on zero when zero is in view, otherwise on the edge. */
    var axisY = cfg.y.min <= 0 && cfg.y.max >= 0 ? scale.sy(0) : bottom;
    var axisX = cfg.x.min <= 0 && cfg.x.max >= 0 ? scale.sx(0) : m.L;
    nodes.push(svg("line", { class: "ova-plane__axis", x1: m.L, y1: axisY, x2: right, y2: axisY }));
    nodes.push(svg("line", { class: "ova-plane__axis", x1: axisX, y1: m.T, x2: axisX, y2: bottom }));
    nodes.push(svg("text", { class: "ova-plane__name", x: m.L + scale.pw / 2, y: m.H - 6, "text-anchor": "middle", text: axisTitle(cfg.x) }));
    nodes.push(svg("text", { class: "ova-plane__name", x: 4, y: 22, text: axisTitle(cfg.y) }));
    nodes.push(svg("clipPath", { id: clipId }, [svg("rect", { x: m.L, y: m.T, width: scale.pw, height: scale.ph })]));

    return {
      m: m,
      scale: scale,
      nodes: nodes,
      clipId: clipId,
      frame: function (label, children, on) {
        return svg("svg", {
          class: "ova-plane__svg",
          viewBox: "0 0 " + m.W + " " + m.H,
          role: "img",
          "aria-label": label,
          on: on
        }, nodes.concat(children));
      }
    };
  }

  /* Places a coordinate label near (cx, cy), always inside the drawing. side: -1 above, 1 below. */
  function placeLabel(group, background, text, m, cx, cy, label, side) {
    var width = label.length * m.charWidth + 14;
    var height = m.coordHeight;
    var x = Math.max(m.L + width / 2 + 2, Math.min(m.W - width / 2 - 2, cx));
    var y = cy + side * (m.coordGap + height / 2);
    if (y - height / 2 < 2) y = cy + m.coordGap + height / 2;
    if (y + height / 2 > m.H - 2) y = cy - m.coordGap - height / 2;
    text.textContent = label;
    [["x", -width / 2], ["y", -height / 2], ["width", width], ["height", height]].forEach(function (a) {
      background.setAttribute(a[0], a[1]);
    });
    group.setAttribute("transform", "translate(" + x + " " + y + ")");
  }

  /* "4 km", "$10.000", or just "3" when the axis has no unit. */
  function formatValue(axis, value) {
    if (axis.unit === "$") return (value < 0 ? "−$" : "$") + formatNumber(Math.abs(value));
    return OVA.dom.formatQuantity(value, axis.unit);
  }

  OVA.planeDrawing = { create: create, placeLabel: placeLabel, formatValue: formatValue };
})(window.OVA);
