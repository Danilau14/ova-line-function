/* From data to pixels in charts (sx/sy) and reading values along the line. */
(function (OVA) {
  "use strict";

  function create(cfg, d) {
    var pw = d.W - d.L - d.R;
    var ph = d.H - d.T - d.B;
    return {
      pw: pw,
      ph: ph,
      sx: function (x) { return d.L + (x - cfg.x.min) / (cfg.x.max - cfg.x.min) * pw; },
      sy: function (y) { return d.T + ph - (y - cfg.y.min) / (cfg.y.max - cfg.y.min) * ph; },
      /* Converts a horizontal position (0–1 of the drawn width) into an x value. */
      xFromFraction: function (f) { return cfg.x.min + (f * d.W - d.L) / pw * (cfg.x.max - cfg.x.min); }
    };
  }

  function interpolate(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (var i = 1; i < points.length; i++) {
      var a = points[i - 1], b = points[i];
      if (x <= b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return points[points.length - 1][1];
  }

  /* Slope at each point, so the curve passes through them without waving. */
  function slopes(p) {
    return p.map(function (_, i) {
      var a = p[Math.max(i - 1, 0)], b = p[Math.min(i + 1, p.length - 1)];
      return (b[1] - a[1]) / (b[0] - a[0]);
    });
  }

  /* SVG commands from each point to the next (one per segment): straight or smooth. */
  function segments(e, points, curve) {
    var m = curve ? slopes(points) : null;
    return points.slice(1).map(function (p1, i) {
      var p0 = points[i];
      var end = e.sx(p1[0]) + " " + e.sy(p1[1]);
      if (!curve) return "L " + end;
      var third = (p1[0] - p0[0]) / 3;
      return "C " + e.sx(p0[0] + third) + " " + e.sy(p0[1] + m[i] * third) + ", " +
        e.sx(p1[0] - third) + " " + e.sy(p1[1] - m[i + 1] * third) + ", " + end;
    });
  }

  OVA.scale = { create: create, interpolate: interpolate, segments: segments };
})(window.OVA);
