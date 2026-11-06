/* Questions with no timer or score. Types: numeric, choice, multi, trueFalse. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var groupCount = 0;
  var TRUE_FALSE = ["Verdadero", "Falso"];

  function numericQuestion(q, s) {
    var field = s.createField({ answer: q.answer, signed: q.signed, label: q.label || q.prompt });
    var parts = q.prompt.split("___");
    var children = [el("span", { html: s.markdown.inline(parts[0]) }), field.element];
    if (parts[1]) children.push(el("span", { html: s.markdown.inline(parts[1]) }));
    return {
      node: el("div", { class: "ova-quiz__line" }, children),
      isAnswered: field.hasValue,
      check: field.check,
      reveal: field.reveal,
      answerText: OVA.dom.formatNumber(q.answer)
    };
  }

  function optionsQuestion(q, s) {
    var isTrueFalse = q.type === "trueFalse";
    var options = isTrueFalse ? TRUE_FALSE : q.options;
    var expected = isTrueFalse ? (q.answer ? 0 : 1) : q.answer;
    var name = "ova-quiz-" + (++groupCount);
    var revealed = false;
    var radios = options.map(function (_, i) {
      return el("input", { class: "ova-quiz__radio", type: "radio", name: name, value: i });
    });
    var node = el("fieldset", { class: "ova-quiz__group" }, [
      el("legend", { class: "ova-quiz__prompt", html: s.markdown.inline(q.prompt) })
    ].concat(options.map(function (text, i) {
      return el("label", { class: "ova-quiz__option" }, [radios[i], el("span", { html: s.markdown.inline(text) })]);
    })));

    return {
      node: node,
      answerText: options[expected],
      isAnswered: function () { return radios.some(function (r) { return r.checked; }); },
      check: function () {
        if (revealed) return "ok";
        var chosen = radios.filter(function (r) { return r.checked; })[0];
        var result = s.validator.validate("choice", chosen ? chosen.value : null, expected);
        if (result === "ok") radios.forEach(function (r) { r.disabled = true; });
        return result;
      },
      reveal: function () {
        revealed = true;
        radios[expected].checked = true;
        radios.forEach(function (r) { r.disabled = true; });
      }
    };
  }

  function multiQuestion(q, s) {
    var revealed = false;
    var boxes = q.options.map(function (_, i) {
      return el("input", { class: "ova-quiz__radio", type: "checkbox", value: i });
    });
    var node = el("fieldset", { class: "ova-quiz__group" }, [
      el("legend", { class: "ova-quiz__prompt", html: s.markdown.inline(q.prompt) })
    ].concat(q.options.map(function (text, i) {
      return el("label", { class: "ova-quiz__option" }, [boxes[i], el("span", { html: s.markdown.inline(text) })]);
    })));
    var expected = q.answer.slice().sort().join(",");

    return {
      node: node,
      answerText: q.answer.map(function (i) { return q.options[i]; }).join(", "),
      isAnswered: function () { return boxes.some(function (b) { return b.checked; }); },
      check: function () {
        if (revealed) return "ok";
        var chosen = boxes.filter(function (b) { return b.checked; }).map(function (b) { return Number(b.value); });
        var result = s.validator.validate("choice", chosen.sort().join(","), expected);
        if (result === "ok") boxes.forEach(function (b) { b.disabled = true; });
        return result;
      },
      reveal: function () {
        revealed = true;
        boxes.forEach(function (b, i) {
          b.checked = q.answer.indexOf(i) !== -1;
          b.disabled = true;
        });
      }
    };
  }

  function createQuestion(q, s) {
    var isNumeric = q.type === "numeric";
    var question = isNumeric ? numericQuestion(q, s) : q.type === "multi" ? multiQuestion(q, s) : optionsQuestion(q, s);
    var hint = s.createFeedback();
    var revealed = false;
    var wrapper = el("div", {
      class: "ova-quiz__question" + (isNumeric ? "" : " ova-quiz__question--choice")
    }, [q.figure ? s.renderFigure(q.figure) : null, question.node, hint.element]);
    return {
      element: wrapper,
      hint: q.hint,
      isAnswered: question.isAnswered,
      markMissing: function (missing) { wrapper.classList.toggle("ova-quiz__question--missing", missing); },
      check: function () {
        var result = question.check();
        if (revealed) return result;
        if (result === "empty") wrapper.removeAttribute("data-state");
        else wrapper.setAttribute("data-state", result);
        return result;
      },
      setHint: function (text) {
        if (!revealed) hint.show(text ? [{ state: "hint", text: text }] : []);
      },
      reveal: function () {
        revealed = true;
        question.reveal();
        wrapper.setAttribute("data-state", "revealed");
        hint.show([{ state: "solved", text: q.explanation + " **Respuesta: " + question.answerText + "**" }]);
      }
    };
  }

  OVA.register("quiz", {
    render: function (data, s) {
      var questions = data.questions.map(function (q) { return createQuestion(q, s); });
      /* A graded quiz has no button of its own: the page's exam-submit block sends everything together. */
      if (data.graded) s.assessment.add(questions);
      var review = data.graded ? null : s.createReview({ items: questions });
      return OVA.dom.card(data, [
        data.text ? el("div", { html: s.markdown.toHtml(data.text) }) : null,
        el("div", { class: "ova-quiz__questions" }, questions.map(function (q) { return q.element; })),
        review ? review.element : null
      ], "ova-quiz");
    }
  });
})(window.OVA);
