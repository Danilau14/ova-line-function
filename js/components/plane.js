/* Coordinate plane. Modes:
   build: tap (or use the selectors) to place points; checked against targets, optionally joined at the end.
   show: draws a relation; with verticalProbe a vertical line says how many points it touches.
   Data: { mode, title?, icon?, text?, x:{name,unit,min,max,step,snap?}, y:{…}, targets?, connect?, relation?(x)→[y…], verticalProbe?, hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;
  var SAMPLES = 160;

  function grid(axis) {
    var step = axis.snap || axis.step;
    var values = [];
    for (var v = axis.min; v <= axis.max + 1e-8; v += step) values.push(Math.round(v * 1e6) / 1e6);
    return values;
  }

  function nearest(values, target) {
    return values.reduce(function (best, v) { return Math.abs(v - target) < Math.abs(best - target) ? v : best; }, values[0]);
  }

  function selector(axis, label) {
    return el("label", { class: "ova-plane__selector" }, [
      el("span", { text: label }),
      el("select", { class: "ova-plane__select" }, grid(axis).map(function (v) {
        return el("option", { value: v, text: OVA.planeDrawing.formatValue(axis, v) });
      }))
    ]);
  }

  function buildMode(d, s) {
    var base = s.planeDrawing.create(d, s.scale);
    var scale = base.scale;
    var points = [];
    var wrong = {};
    var locked = false;
    var layer = svg("g");
    var lineLayer = svg("g");
    var coord = svg("g", { class: "ova-hidden" });
    var coordBg = svg("rect", { class: "ova-plane__coord-bg", rx: 8 });
    var coordText = svg("text", { class: "ova-plane__coord-text", "text-anchor": "middle", "dominant-baseline": "central" });
    coord.appendChild(coordBg);
    coord.appendChild(coordText);
    var listing = el("p", { class: "ova-plane__points", "aria-live": "polite" });
    var pickX = selector(d.x, d.x.name + ":");
    var pickY = selector(d.y, d.y.name + ":");
    var xValues = grid(d.x), yValues = grid(d.y);

    function key(p) { return p[0] + "|" + p[1]; }
    function label(p) { return "(" + s.planeDrawing.formatValue(d.x, p[0]) + ", " + s.planeDrawing.formatValue(d.y, p[1]) + ")"; }

    function paint() {
      OVA.dom.mount(layer, points.map(function (p) {
        return svg("circle", {
          class: "ova-plane__point",
          "data-state": wrong[key(p)] ? "error" : null,
          cx: scale.sx(p[0]),
          cy: scale.sy(p[1])
        });
      }));
      listing.textContent = points.length ? "Tus puntos: " + points.map(label).join(", ") : "Todavía no has puesto puntos.";
    }

    function togglePoint(p) {
      if (locked) return;
      var at = points.map(key).indexOf(key(p));
      if (at === -1) points.push(p); else points.splice(at, 1);
      wrong = {};
      if (at === -1) {
        coord.classList.remove("ova-hidden");
        s.planeDrawing.placeLabel(coord, coordBg, coordText, base.m, scale.sx(p[0]), scale.sy(p[1]), label(p), -1);
      } else {
        coord.classList.add("ova-hidden");
      }
      paint();
    }

    function fromPointer(ev) {
      var r = ev.currentTarget.getBoundingClientRect();
      var fx = (ev.clientX - r.left) / r.width, fy = (ev.clientY - r.top) / r.height;
      var m = base.m;
      var x = d.x.min + (fx * m.W - m.L) / scale.pw * (d.x.max - d.x.min);
      var y = d.y.min + (m.T + scale.ph - fy * m.H) / scale.ph * (d.y.max - d.y.min);
      if (x < d.x.min - 0.5 * (d.x.snap || d.x.step) || x > d.x.max + 0.5 * (d.x.snap || d.x.step)) return;
      var p = [nearest(xValues, x), nearest(yValues, y)];
      pickX.querySelector("select").value = p[0];
      pickY.querySelector("select").value = p[1];
      togglePoint(p);
    }

    var review = s.createReview({
      hint: d.hint,
      explanation: d.explanation,
      onDone: function () {
        locked = true;
        if (!d.connect) return;
        var sorted = points.slice().sort(function (a, b) { return a[0] - b[0]; });
        lineLayer.appendChild(svg("polyline", {
          class: "ova-plane__line",
          points: sorted.map(function (p) { return scale.sx(p[0]) + "," + scale.sy(p[1]); }).join(" ")
        }));
      },
      items: [{
        check: function () {
          if (!points.length) return "empty";
          var expected = d.targets.map(key);
          var placed = points.map(key);
          wrong = {};
          placed.forEach(function (k) { if (expected.indexOf(k) === -1) wrong[k] = true; });
          paint();
          var complete = expected.every(function (k) { return placed.indexOf(k) !== -1; });
          return complete && !Object.keys(wrong).length ? "ok" : "error";
        },
        reveal: function () {
          points = d.targets.map(function (p) { return p.slice(); });
          wrong = {};
          coord.classList.add("ova-hidden");
          paint();
        }
      }]
    });

    paint();
    return el("div", { class: "ova-plane" }, [
      el("p", { class: "ova-plane__help", text: "Toca el plano para poner un punto; tócalo otra vez para quitarlo. Si es difícil atinarle, usa los selectores." }),
      el("div", { class: "ova-plane__frame" }, [
        base.frame("Plano para ubicar puntos", [lineLayer, layer, coord], { pointerdown: fromPointer })
      ]),
      el("div", { class: "ova-plane__controls" }, [
        pickX,
        pickY,
        el("button", {
          class: "ova-btn ova-btn--soft",
          type: "button",
          text: "Poner punto",
          on: { click: function () {
            togglePoint([Number(pickX.querySelector("select").value), Number(pickY.querySelector("select").value)]);
          } }
        })
      ]),
      listing,
      review.element
    ]);
  }

  function showMode(d, s) {
    var base = s.planeDrawing.create(d, s.scale);
    var scale = base.scale;
    var span = d.x.max - d.x.min;
    var branches = [];
    for (var i = 0; i <= SAMPLES; i++) {
      var x = d.x.min + span * i / SAMPLES;
      d.relation(x).forEach(function (y, b) {
        (branches[b] = branches[b] || []).push(scale.sx(x) + "," + scale.sy(y));
      });
    }
    var curves = branches.map(function (pts) { return svg("polyline", { class: "ova-plane__line", points: pts.join(" ") }); });
    var clip = svg("g", { "clip-path": "url(#" + base.clipId + ")" }, curves);
    var marks = (d.marks || []).map(function (p) {
      return svg("circle", { class: "ova-plane__mark", cx: scale.sx(p[0]), cy: scale.sy(p[1]) });
    });
    var children = [clip].concat(marks);
    var extra = [];

    if (d.verticalProbe) {
      var guide = svg("line", { class: "ova-plane__guide", y1: base.m.T, y2: base.m.T + scale.ph });
      var dots = svg("g");
      var readout = el("p", { class: "ova-plane__readout", "aria-live": "polite" });
      var probe = function (x) {
        var X = scale.sx(x);
        guide.setAttribute("x1", X);
        guide.setAttribute("x2", X);
        var ys = d.relation(x);
        OVA.dom.mount(dots, ys.map(function (y) {
          return svg("circle", { class: "ova-plane__point", cx: X, cy: scale.sy(y) });
        }));
        var distinct = ys.filter(function (y, i) { return ys.indexOf(y) === i; }).length;
        readout.textContent = "En x = " + OVA.dom.formatNumber(x) + " la recta vertical toca " + distinct + (distinct === 1 ? " punto." : " puntos.");
      };
      children.push(guide, dots);
      var slider = el("input", {
        class: "ova-chart__slider",
        type: "range",
        min: d.x.min,
        max: d.x.max,
        step: 0.5,
        value: 0,
        "aria-label": "Mueve la recta vertical",
        on: { input: function (ev) { probe(Number(ev.target.value)); } }
      });
      probe(0);
      extra.push(slider, readout);
    }

    return el("div", { class: "ova-plane" }, [
      el("div", { class: "ova-plane__frame" }, [base.frame(d.description || "Gráfica en el plano", children)])
    ].concat(extra));
  }

  OVA.register("plane", {
    figure: true,
    render: function (data, s) {
      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        data.mode === "build" ? buildMode(data, s) : showMode(data, s)
      ]);
    }
  });
})(window.OVA);
