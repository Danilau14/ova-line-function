/* Mystery machines: the number goes in at the top, the machine works, and the result comes out at the bottom.
   All the machines are available from tabs; two predictions reveal each rule.
   Data: { title?, icon?, text?, machines:[{ name, rule(x), predictions:[n,n], reveal, explanation, optional? }], hint? } */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var svg = OVA.dom.svg;
  var formatNumber = OVA.dom.formatNumber;
  var MIN_INPUT = -20, MAX_INPUT = 50, MIN_TRIES = 2;
  var PROCESSING_MS = 1100;
  var PROCESSING_TEXT = "Procesando…";
  var IDLE_TEXT = "?";

  function number(value) {
    return value < 0 ? "−" + formatNumber(-value) : formatNumber(value);
  }

  function processingTime() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : PROCESSING_MS;
  }

  /* Same machine as the eXeLearning version: input funnel, body with screen, output funnel. */
  function createDrawing(name) {
    var tokenIn = svg("text", { class: "ova-machine__token ova-machine__token--in", x: 120, y: 24, "text-anchor": "middle" });
    var tokenOut = svg("text", { class: "ova-machine__token ova-machine__token--out", x: 120, y: 276, "text-anchor": "middle" });
    var status = svg("text", { class: "ova-machine__status", x: 120, y: 138, "text-anchor": "middle", "dominant-baseline": "central", text: IDLE_TEXT });
    var drawing = svg("svg", {
      class: "ova-machine__svg",
      viewBox: "0 0 240 290",
      role: "img",
      "aria-label": "Dibujo de " + name + ": el número entra por arriba y sale por abajo",
      "data-state": "idle"
    }, [
      svg("rect", { class: "ova-machine__funnel", x: 105, y: 30, width: 30, height: 16 }),
      svg("polygon", { class: "ova-machine__funnel", points: "46,46 194,46 152,94 88,94" }),
      svg("text", { class: "ova-machine__label", x: 120, y: 74, "text-anchor": "middle", text: "Entrada" }),
      svg("rect", { class: "ova-machine__body", x: 30, y: 94, width: 180, height: 100, rx: 12 }),
      svg("rect", { class: "ova-machine__screen", x: 42, y: 106, width: 156, height: 64, rx: 6 }),
      status,
      svg("circle", { class: "ova-machine__light", cx: 120, cy: 182, r: 6 }),
      svg("polygon", { class: "ova-machine__funnel", points: "88,194 152,194 194,242 46,242" }),
      svg("text", { class: "ova-machine__label", x: 120, y: 226, "text-anchor": "middle", text: "Salida" }),
      tokenIn,
      tokenOut
    ]);

    return {
      element: drawing,
      setState: function (state, input, output) {
        drawing.setAttribute("data-state", state);
        if (state === "processing") {
          status.textContent = PROCESSING_TEXT;
          tokenIn.textContent = number(input);
          tokenOut.textContent = "";
        }
        if (state === "done") {
          status.textContent = number(output);
          tokenOut.textContent = number(output);
        }
      }
    };
  }

  function createMachine(machine, data, s, onSolved, goToNext) {
    var tries = {};
    var triesCount = 0;
    var drawing = createDrawing(machine.name);
    var input = el("input", {
      class: "ova-field__input",
      type: "text",
      inputmode: "text",
      autocomplete: "off",
      "aria-label": "Número que ingresa a " + machine.name
    });
    var message = s.createFeedback();
    var logBody = el("tbody");
    var log = el("table", { class: "ova-table ova-machine__log" }, [
      el("thead", {}, [el("tr", {}, [
        el("th", { class: "ova-table__head", scope: "col", text: "Entrada" }),
        el("th", { class: "ova-table__head", scope: "col", text: "Salida" })
      ])]),
      logBody
    ]);
    var challenge = el("div", { class: "ova-machine__challenge ova-hidden" });
    var reveal = el("p", { class: "ova-machine__reveal ova-hidden", text: machine.reveal });
    var next = goToNext ? el("button", {
      class: "ova-btn ova-machine__next ova-hidden",
      type: "button",
      text: "Siguiente máquina →",
      on: { click: goToNext }
    }) : null;

    var fields = machine.predictions.map(function (n) {
      return { n: n, field: s.createField({ answer: machine.rule(n), signed: true, label: "Salida si ingresas " + n }) };
    });
    var review = s.createReview({
      untracked: true,
      hint: data.hint,
      explanation: machine.explanation,
      onDone: function () {
        reveal.classList.remove("ova-hidden");
        if (next) next.classList.remove("ova-hidden");
        onSolved();
      },
      items: fields.map(function (f) { return { check: f.field.check, reveal: f.field.reveal }; })
    });
    OVA.dom.mount(challenge, [el("p", { class: "ova-machine__prompt", text: "Predice sin probar:" })].concat(fields.map(function (f) {
      return el("div", { class: "ova-quiz__line" }, [el("span", { text: "Si ingresas " + f.n + ", sale" }), f.field.element]);
    }), [review.element]));

    var enterButton = el("button", { class: "ova-btn", type: "button", text: "Ingresar", on: { click: tryInput } });

    function finish(value, output, repeated) {
      drawing.setState("done", value, output);
      tries[value] = output;
      triesCount++;
      logBody.appendChild(el("tr", { class: "ova-machine__row" }, [
        el("td", { class: "ova-table__cell", text: number(value) }),
        el("td", { class: "ova-table__cell", text: number(output) })
      ]));
      message.show(repeated ? [{ state: "ok", text: "Salió lo mismo que la vez anterior." }] : []);
      input.value = "";
      input.disabled = false;
      enterButton.disabled = false;
      input.focus();
      if (triesCount >= MIN_TRIES) challenge.classList.remove("ova-hidden");
    }

    function tryInput() {
      var value = s.validator.toNumber(input.value);
      if (isNaN(value) || value < MIN_INPUT || value > MAX_INPUT || Math.floor(value) !== value) {
        message.show([{ state: "empty", text: "Escribe un número entero entre " + MIN_INPUT + " y " + MAX_INPUT + "." }]);
        return;
      }
      var output = machine.rule(value);
      var repeated = tries[value] !== undefined;
      input.disabled = true;
      enterButton.disabled = true;
      message.show([]);
      drawing.setState("processing", value, output);
      window.setTimeout(function () { finish(value, output, repeated); }, processingTime());
    }

    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") tryInput();
    });

    return el("div", { class: "ova-machine" }, [
      el("div", { class: "ova-machine__lab" }, [
        el("div", { class: "ova-machine__frame" }, [drawing.element]),
        el("div", { class: "ova-machine__controls" }, [
          el("p", { class: "ova-machine__prompt", text: "Ingresa un número:" }),
          el("div", { class: "ova-quiz__line" }, [
            input,
            enterButton,
            el("button", {
              class: "ova-btn ova-btn--soft",
              type: "button",
              text: "Limpiar",
              on: { click: function () { logBody.textContent = ""; tries = {}; } }
            })
          ]),
          message.element,
          log
        ])
      ]),
      challenge,
      reveal,
      next
    ]);
  }

  OVA.register("machine", {
    figure: true,
    render: function (data, s) {
      /* The gate opens with the required machines; an optional one (the challenge) does not hold it. */
      var release = s.gate.hold();
      var required = data.machines.filter(function (m) { return !m.optional; }).length;
      var solved = 0;
      var tabs = [];
      var panels = [];

      function show(index) {
        panels.forEach(function (panel, i) { panel.classList.toggle("ova-hidden", i !== index); });
        tabs.forEach(function (tab, i) { tab.setAttribute("aria-pressed", i === index ? "true" : "false"); });
      }

      data.machines.forEach(function (machine, i) {
        tabs.push(el("button", {
          class: "ova-btn ova-btn--soft ova-machine__tab",
          type: "button",
          text: machine.name,
          on: { click: function () { show(i); } }
        }));
        panels.push(createMachine(machine, data, s, function () {
          tabs[i].textContent = machine.name + " ✔";
          if (!machine.optional && ++solved === required) release();
        }, i + 1 < data.machines.length ? function () { show(i + 1); } : null));
      });
      show(0);

      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("div", { class: "ova-machine__tabs" }, tabs)
      ].concat(panels));
    }
  });
})(window.OVA);
