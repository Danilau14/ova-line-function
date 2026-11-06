/* The final evaluation of a page: gathers its questions and grades them all at once, with one submission.
   The student never sees the number; it goes to the platform through report(percent), which returns the outcome. */
(function (OVA) {
  "use strict";

  function create(report) {
    var questions = [];

    return {
      /* Starts over when a page is drawn. */
      begin: function () { questions = []; },
      add: function (list) { questions = questions.concat(list); },
      /* Marks what is still unanswered and returns it. */
      findMissing: function () {
        return questions.filter(function (question) {
          var missing = !question.isAnswered();
          question.markMissing(missing);
          return missing;
        });
      },
      /* Grades everything: what is right stays, what is wrong shows its explanation. */
      submit: function () {
        var correct = questions.filter(function (question) {
          if (question.check() === "ok") return true;
          question.reveal();
          return false;
        }).length;
        return report(Math.round(correct / questions.length * 100));
      }
    };
  }

  OVA.assessment = { create: create };
})(window.OVA);
