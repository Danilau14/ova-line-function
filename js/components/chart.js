/* Touchable SVG chart that always shows the coordinates of the selected point.
   Modes: read, and segments (also marks each piece ▲ ▼ ■).
   Data: { mode, title?, icon?, text?, x:{name,unit,min,max,step,readStep?}, y:{…}, points, curve?, initial?, segmentLabel?, hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;
  var formatNumber = OVA.dom.formatNumber;

  /* Wide keeps the eXe Session 1 measures; compact keeps text legible on phones. */
  var WIDE = { W: 920, H: 540, L: 125, R: 45, T: 35, B: 100, gapX: 42, gapY: 22, nameX: 26, charWidth: 13.5, coordHeight: 44, coordGap: 20, compact: false };
  var COMPACT = { W: 420, H: 340, L: 78, R: 16, T: 16, B: 66, gapX: 26, gapY: 10, nameX: 16, charWidth: 12, coordHeight: 34, coordGap: 12, compact: true };
  var WIDE_QUERY = "(min-width: 48rem)";

  var STATES = ["", "up", "down", "flat"];
  var STATE_TEXT = { "": "sin marcar", up: "▲ sube", down: "▼ baja", flat: "■ se mantiene" };
  var MARKS = { up: "▲", down: "▼", flat: "■" };

  var cleanups = new WeakMap();

  function measures() {
    return window.matchMedia(WIDE_QUERY).matches ? WIDE : COMPACT;
  }

  function axisName(axis) { return axis.name + " (" + axis.unit + ")"; }

  function ticks(axis) {
    var values = [];
    for (var v = axis.min; v <= axis.max + 1e-8; v += axis.step) values.push(v);
    return values;
  }

  function describe(d) {
    return "Gráfica de " + d.y.name + " según " + d.x.name + ". Puntos: " +
      d.points.map(function (p) { return "(" + p[0] + " " + d.x.unit + ", " + p[1] + " " + d.y.unit + ")"; }).join(", ");
  }

  function background(d, e, m) {
    var bottom = m.T + e.ph;
    var nodes = [];
    ticks(d.x).forEach(function (x) {
      var X = e.sx(x);
      nodes.push(svg("line", { class: "ova-chart__grid", x1: X, y1: m.T, x2: X, y2: bottom }));
      nodes.push(svg("text", { class: "ova-chart__tick", x: X, y: bottom + m.gapX, "text-anchor": "middle", text: formatNumber(x) }));
    });
    ticks(d.y).forEach(function (y) {
      var Y = e.sy(y);
      nodes.push(svg("line", { class: "ova-chart__grid", x1: m.L, y1: Y, x2: m.W - m.R, y2: Y }));
      nodes.push(svg("text", { class: "ova-chart__tick", x: m.L - m.gapY, y: Y, "text-anchor": "end", "dominant-baseline": "central", text: formatNumber(y) }));
    });
    nodes.push(svg("line", { class: "ova-chart__axis", x1: m.L, y1: bottom, x2: m.W - m.R, y2: bottom }));
    nodes.push(svg("line", { class: "ova-chart__axis", x1: m.L, y1: m.T, x2: m.L, y2: bottom }));
    nodes.push(svg("text", { class: "ova-chart__name", x: m.L + e.pw / 2, y: m.H - 8, "text-anchor": "middle", text: axisName(d.x) }));
    nodes.push(svg("text", {
      class: "ova-chart__name",
      transform: "translate(" + m.nameX + " " + (m.T + e.ph / 2) + ") rotate(-90)",
      "text-anchor": "middle",
      text: axisName(d.y)
    }));
    return nodes;
  }

  /* The plot: drawing, coordinates label, slider and readout. Shared by both modes. */
  function createPlot(d, s, pieces) {
    var readStep = d.x.readStep || 1;
    var current = d.initial === undefined ? d.x.min : d.initial;
    var frame = el("div", { class: "ova-chart__frame" });
    var readX = el("strong");
    var readY = el("strong");
    var slider = el("input", {
      class: "ova-chart__slider",
      type: "range",
      min: d.x.min,
      max: d.x.max,
      step: readStep,
      value: current,
      "aria-label": "Mueve el punto: " + d.x.name,
      on: { input: function (ev) { locate(Number(ev.target.value)); } }
    });
    var readout = el("p", { class: "ova-chart__readout", "aria-live": "polite" }, [
      readX, el("span", { "aria-hidden": "true", text: " · " }), readY
    ]);
    var point, guideX, guideY, coord, coordBg, coordText, scale, m, strokes = [], marks = [];

    function placeCoord(cx, cy, label) {
      var width = label.length * m.charWidth + 16;
      var height = m.coordHeight;
      /* Starts after the vertical axis, so it never hides the axis numbers. */
      var x = Math.max(m.L + width / 2 + 2, Math.min(m.W - width / 2 - 2, cx));
      var above = cy - m.coordGap - height / 2;
      var y = above - height / 2 < 2 ? cy + m.coordGap + height / 2 : above;
      coordText.textContent = label;
      [["x", -width / 2], ["y", -height / 2], ["width", width], ["height", height]].forEach(function (a) {
        coordBg.setAttribute(a[0], a[1]);
      });
      coord.setAttribute("transform", "translate(" + x + " " + y + ")");
    }

    function locate(x) {
      var snapped = d.x.min + Math.round((x - d.x.min) / readStep) * readStep;
      current = Math.max(d.x.min, Math.min(d.x.max, snapped));
      var y = Math.round(s.scale.interpolate(d.points, current));
      var cx = scale.sx(current), cy = scale.sy(y);
      var xText = OVA.dom.formatQuantity(current, d.x.unit);
      var yText = OVA.dom.formatQuantity(y, d.y.unit);
      point.setAttribute("cx", cx);
      point.setAttribute("cy", cy);
      [["x1", cx], ["y1", cy], ["x2", cx], ["y2", m.T + scale.ph]].forEach(function (a) { guideX.setAttribute(a[0], a[1]); });
      [["x1", cx], ["y1", cy], ["x2", m.L], ["y2", cy]].forEach(function (a) { guideY.setAttribute(a[0], a[1]); });
      placeCoord(cx, cy, "(" + xText + ", " + yText + ")");
      readX.textContent = d.x.name + " = " + xText;
      readY.textContent = d.y.name + " = " + yText;
      slider.value = current;
    }

    function fromPointer(ev) {
      var r = ev.currentTarget.getBoundingClientRect();
      locate(scale.xFromFraction((ev.clientX - r.left) / r.width));
    }

    function paintPieces() {
      (pieces || []).forEach(function (piece, i) {
        if (piece.state) strokes[i].setAttribute("data-segment", piece.state);
        else strokes[i].removeAttribute("data-segment");
        marks[i].textContent = MARKS[piece.state] || "";
      });
    }

    function draw() {
      m = measures();
      scale = s.scale.create(d, m);
      guideX = svg("line", { class: "ova-chart__guide" });
      guideY = svg("line", { class: "ova-chart__guide" });
      point = svg("circle", { class: "ova-chart__point" });
      coordBg = svg("rect", { class: "ova-chart__coord-bg", rx: 8 });
      coordText = svg("text", { class: "ova-chart__coord-text", "text-anchor": "middle", "dominant-baseline": "central" });
      coord = svg("g", {}, [coordBg, coordText]);

      var commands = s.scale.segments(scale, d.points, d.curve);
      strokes = commands.map(function (command, i) {
        var a = d.points[i];
        return svg("path", { class: "ova-chart__line", d: "M " + scale.sx(a[0]) + " " + scale.sy(a[1]) + " " + command });
      });
      marks = (pieces || []).map(function (piece) {
        return svg("text", {
          class: "ova-chart__mark",
          x: (scale.sx(piece.a[0]) + scale.sx(piece.b[0])) / 2,
          y: Math.min(scale.sy(piece.a[1]), scale.sy(piece.b[1])) - m.gapY,
          "text-anchor": "middle"
        });
      });
      var vertices = d.points.map(function (p) {
        return svg("circle", { class: "ova-chart__vertex", cx: scale.sx(p[0]), cy: scale.sy(p[1]) });
      });

      var drawing = svg("svg", {
        class: "ova-chart__svg" + (m.compact ? " ova-chart__svg--compact" : ""),
        viewBox: "0 0 " + m.W + " " + m.H,
        role: "img",
        "aria-label": describe(d),
        on: {
          pointerdown: fromPointer,
          pointermove: function (ev) { if (ev.buttons) fromPointer(ev); }
        }
      }, background(d, scale, m).concat([guideX, guideY], strokes, vertices, marks, [point, coord]));

      OVA.dom.mount(frame, drawing);
      paintPieces();
      locate(current);
    }

    draw();
    return { frame: frame, slider: slider, readout: readout, draw: draw, paintPieces: paintPieces };
  }

  /* Redraws when the width changes (rotating the phone) and leaves the cleanup ready. */
  function watchWidth(element, draw) {
    var query = window.matchMedia(WIDE_QUERY);
    query.addEventListener("change", draw);
    cleanups.set(element, function () { query.removeEventListener("change", draw); });
  }

  function readMode(d, s) {
    var plot = createPlot(d, s);
    var node = el("div", { class: "ova-chart" }, [
      el("p", { class: "ova-chart__instruction", text: "Toca la gráfica o mueve el control para ver las coordenadas de cada punto." }),
      plot.frame,
      plot.slider,
      plot.readout
    ]);
    watchWidth(node, plot.draw);
    return node;
  }

  function segmentsMode(d, s) {
    var label = d.segmentLabel || "Tramo";
    var pieces = d.points.slice(1).map(function (p, i) {
      var a = d.points[i];
      return { a: a, b: p, expected: p[1] > a[1] ? "up" : p[1] < a[1] ? "down" : "flat", state: "", result: "" };
    });
    var plot = createPlot(d, s, pieces);

    var items = pieces.map(function (piece) {
      var name = label + " " + piece.a[0] + "–" + piece.b[0] + " " + d.x.unit;
      var button = el("button", {
        class: "ova-chart__segment",
        type: "button",
        on: { click: function () {
          piece.state = STATES[(STATES.indexOf(piece.state) + 1) % STATES.length];
          piece.result = "";
          paint();
        } }
      });
      function paint() {
        button.textContent = name + " · " + STATE_TEXT[piece.state];
        button.setAttribute("data-segment", piece.state);
        if (piece.result) button.setAttribute("data-state", piece.result);
        else button.removeAttribute("data-state");
        plot.paintPieces();
      }
      paint();
      return {
        element: button,
        check: function () {
          if (piece.result === "revealed") return "ok";
          var result = s.validator.validate("choice", piece.state, piece.expected);
          piece.result = result === "empty" ? "" : result;
          if (result === "ok") button.disabled = true;
          paint();
          return result;
        },
        reveal: function () {
          piece.state = piece.expected;
          piece.result = "revealed";
          button.disabled = true;
          paint();
        }
      };
    });

    var node = el("div", { class: "ova-chart" }, [
      el("p", { class: "ova-chart__instruction", text: "Toca la gráfica o mueve el control para ver las coordenadas de cada punto." }),
      plot.frame,
      plot.slider,
      plot.readout,
      el("p", { class: "ova-chart__instruction", text: "Toca cada pedazo para cambiar su símbolo: sin marcar → ▲ sube → ▼ baja → ■ se mantiene." }),
      el("div", { class: "ova-chart__segments" }, items.map(function (x) { return x.element; })),
      s.createReview({ items: items, hint: d.hint, explanation: d.explanation }).element
    ]);
    watchWidth(node, plot.draw);
    return node;
  }

  OVA.register("chart", {
    figure: true,
    render: function (data, s) {
      var body = data.mode === "segments" ? segmentsMode(data, s) : readMode(data, s);
      var card = OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        body
      ]);
      cleanups.set(card, cleanups.get(body));
      return card;
    },
    destroy: function (element) {
      var cleanup = cleanups.get(element);
      if (cleanup) cleanup();
    }
  });
})(window.OVA);
