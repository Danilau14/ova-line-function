/* Single rule: the hint appears after 2 errors in a row. */
(function (OVA) {
  "use strict";

  var ERRORS_FOR_HINT = 2;

  function createCounter() {
    var streak = 0;
    return {
      /* Records an attempt and says whether the hint should show. */
      record: function (correct) {
        streak = correct ? 0 : streak + 1;
        return streak >= ERRORS_FOR_HINT;
      }
    };
  }

  OVA.hints = { createCounter: createCounter };
})(window.OVA);
