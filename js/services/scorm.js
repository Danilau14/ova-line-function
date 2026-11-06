/* SCORM 1.2 connection. Outside a platform there is no API and nothing happens, so the OVA still works offline. */
(function (OVA) {
  "use strict";

  var MAX_PARENTS = 10;

  function findApi() {
    var current = window;
    for (var i = 0; i < MAX_PARENTS && current; i++) {
      try {
        if (current.API) return current.API;
      } catch (e) {
        return null;
      }
      if (current.parent === current) break;
      current = current.parent;
    }
    try {
      return window.opener && window.opener.API ? window.opener.API : null;
    } catch (e) {
      return null;
    }
  }

  /* Sends the result and keeps the best one if the student retakes it. Returns "sent", "failed" or "none" (no platform). */
  function reportScore(percent) {
    var api = findApi();
    if (!api) return "none";
    try {
      api.LMSInitialize("");
      var previous = Number(api.LMSGetValue("cmi.core.score.raw")) || 0;
      api.LMSSetValue("cmi.core.score.min", "0");
      api.LMSSetValue("cmi.core.score.max", "100");
      api.LMSSetValue("cmi.core.score.raw", String(Math.max(previous, percent)));
      api.LMSSetValue("cmi.core.lesson_status", "completed");
      var saved = String(api.LMSCommit("")) === "true";
      api.LMSFinish("");
      return saved ? "sent" : "failed";
    } catch (e) {
      return "failed";
    }
  }

  OVA.scorm = { reportScore: reportScore };
})(window.OVA);
