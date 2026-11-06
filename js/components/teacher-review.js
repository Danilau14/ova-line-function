/* Teacher mode: every key and explanation of a session in one page, to review them without failing on purpose.
   Data: { pages } (the session pages). */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;

  function answerText(q) {
    if (q.type === "numeric") return OVA.dom.formatNumber(q.answer);
    if (q.type === "multi") return q.answer.map(function (i) { return q.options[i]; }).join(", ");
    if (q.type === "trueFalse") return q.answer ? "Verdadero" : "Falso";
    return q.options[q.answer];
  }

  function entry(s, label, explanation, answer) {
    return el("div", { class: "ova-review-list__entry" }, [
      el("p", { class: "ova-review-list__prompt", html: s.markdown.inline(label) }),
      el("p", { class: "ova-review-list__explanation", html: s.markdown.inline(explanation) }),
      answer ? el("p", { class: "ova-review-list__answer", text: "Respuesta: " + answer }) : null
    ]);
  }

  function blockEntries(block, s) {
    var entries = (block.questions || []).map(function (q) {
      return entry(s, q.prompt, q.explanation, answerText(q));
    });
    (block.machines || []).forEach(function (m) { entries.push(entry(s, m.name, m.explanation)); });
    if (block.explanation) entries.push(entry(s, block.title || "Actividad", block.explanation));
    return entries;
  }

  OVA.register("teacher-review", {
    render: function (data, s) {
      var sections = data.pages.map(function (page) {
        var entries = [];
        page.blocks.forEach(function (block) { entries = entries.concat(blockEntries(block, s)); });
        return entries.length ? { page: page, entries: entries } : null;
      }).filter(Boolean);

      return el("div", { class: "ova-review-list" }, sections.map(function (section) {
        return OVA.dom.card({ title: section.page.title, icon: "🔑", variant: "teacher" }, [
          section.page.teacherKey ? el("p", { class: "ova-review-list__key", html: s.markdown.inline(section.page.teacherKey) }) : null
        ].concat(section.entries));
      }));
    }
  });
})(window.OVA);
