/* Startup for index.html: lists the course sessions. In teacher mode (?teacher=1) it also offers a way out. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var teacherMode = new URLSearchParams(window.location.search).get("teacher") === "1";
  var suffix = teacherMode ? "&teacher=1" : "";

  OVA.dom.mount(document.getElementById("ova-home-list"), OVA.data.course.sessions.map(function (session) {
    var label = "Sesión " + session.id + " · " + session.title;
    return el("li", {}, [session.available
      ? el("a", { class: "ova-home__session", href: "session.html?s=" + session.id + suffix, text: label })
      : el("span", { class: "ova-home__session ova-home__session--pending", text: label + " (próximamente)" })]);
  }));

  if (teacherMode) {
    OVA.dom.mount(document.getElementById("ova-home-teacher"), el("a", {
      class: "ova-home__teacher",
      href: "index.html",
      text: "🔑 Salir del modo docente"
    }));
  }
})(window.OVA);
