/* The "Comprobar" button and its flow: unlimited retries, a hint after 2 errors,
   and, after 3 failed attempts and only if the student asks, the worked solution. */
(function (OVA) {
  "use strict";

  var ATTEMPTS_FOR_SOLUTION = 3;
  var TEXTS = {
    button: "Comprobar",
    solution: "Ver cómo se resuelve",
    ok: "¡Eso es! Lo lograste.",
    error: "Todavía hay algo por revisar en lo marcado con ✖. Vuelve a mirar con calma y prueba otra vez.",
    empty: "Te falta completar algo. Cuando termines, comprueba de nuevo.",
    hint: "Compara el valor del inicio con el del final y vuelve a intentarlo.",
    solved: "Así queda resuelto. Míralo con calma, compáralo con lo que habías hecho y sigue adelante."
  };

  function createService(hints, feedback, inline, gate) {
    /* items: [{ check() → "ok"|"error"|"empty", reveal(), setHint?(text), hint? }]; untracked: the caller holds the gate itself. */
    return function createReview(o) {
      var release = o.untracked ? null : gate.hold();
      var message = feedback.create(inline);
      var groupCounter = hints.createCounter();
      var counters = o.items.map(function () { return hints.createCounter(); });
      var failedAttempts = 0;
      var lastResults = [];
      var usedSolution = false;

      var button = OVA.dom.el("button", {
        class: "ova-btn ova-review__button",
        type: "button",
        text: TEXTS.button,
        on: { click: check }
      });
      var solutionButton = OVA.dom.el("button", {
        class: "ova-btn ova-btn--soft ova-review__solution ova-hidden",
        type: "button",
        text: TEXTS.solution,
        on: { click: showSolution }
      });

      function check() {
        var results = o.items.map(function (item) { return item.check(); });
        lastResults = results;
        var hasError = results.indexOf("error") !== -1;
        var hasEmpty = results.indexOf("empty") !== -1;

        if (!hasError && !hasEmpty) {
          button.disabled = true;
          solutionButton.classList.add("ova-hidden");
          o.items.forEach(function (item) { if (item.setHint) item.setHint(null); });
          message.show([usedSolution
            ? { state: "solved", text: o.explanation ? o.explanation + " " + TEXTS.solved : TEXTS.solved }
            : { state: "ok", text: TEXTS.ok }]);
          if (o.onDone) o.onDone();
          if (release) release();
          return;
        }

        o.items.forEach(function (item, i) {
          if (!item.setHint || results[i] === "empty") return;
          var due = counters[i].record(results[i] === "ok");
          item.setHint(due && results[i] === "error" ? (item.hint || TEXTS.hint) : null);
        });

        var messages = [{ state: hasError ? "error" : "empty", text: hasError ? TEXTS.error : TEXTS.empty }];
        if (hasError && groupCounter.record(false) && o.hint) messages.push({ state: "hint", text: o.hint });
        message.show(messages);

        if (hasError && ++failedAttempts >= ATTEMPTS_FOR_SOLUTION) solutionButton.classList.remove("ova-hidden");
        else if (!hasError) solutionButton.classList.add("ova-hidden");
      }

      /* Only what the student got wrong: what they have not tried yet stays theirs to answer. */
      function showSolution() {
        usedSolution = true;
        o.items.forEach(function (item, i) {
          if (lastResults[i] === "error") item.reveal();
        });
        check();
      }

      return { element: OVA.dom.el("div", { class: "ova-review" }, [button, solutionButton, message.element]) };
    };
  }

  OVA.review = { createService: createService };
})(window.OVA);
