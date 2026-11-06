/* Course menu inside the sidebar. Returns the slot where the current session lists its pages. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;

  OVA.renderCourseMenu = function (container, course, currentId, teacherMode) {
    var pageListSlot = el("div");
    var suffix = teacherMode ? "&teacher=1" : "";
    var items = course.sessions.map(function (session) {
      var label = "Sesión " + session.id + " · " + session.title;
      if (!session.available) {
        return el("li", {}, [el("span", { class: "ova-menu__pending", text: label + " (próximamente)" })]);
      }
      var isCurrent = session.id === currentId;
      return el("li", {}, [
        el("a", {
          class: "ova-menu__link",
          href: "session.html?s=" + session.id + suffix,
          text: label,
          "aria-current": isCurrent ? "true" : null
        }),
        isCurrent ? pageListSlot : null
      ]);
    });
    /* Students get no entry to teacher mode (it shows the answers); inside it there is a way out. */
    var leaveTeacher = teacherMode ? el("li", {}, [el("a", {
      class: "ova-menu__link",
      href: currentId === null ? "index.html" : "session.html?s=" + currentId,
      text: "🔑 Salir del modo docente"
    })]) : null;
    OVA.dom.mount(container, el("ul", { class: "ova-menu__list" }, [
      el("li", {}, [el("a", { class: "ova-menu__link", href: "index.html" + (teacherMode ? "?teacher=1" : ""), text: "🏠 Inicio" })])
    ].concat(items, [leaveTeacher])));
    return pageListSlot;
  };
})(window.OVA);
