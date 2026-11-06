/* Startup for references.html: side menu and the list of sources. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var data = OVA.data.references;
  var teacherMode = new URLSearchParams(window.location.search).get("teacher") === "1";

  function byId(id) { return document.getElementById(id); }

  function group(item) {
    return el("section", { class: "ova-home__section" }, [
      el("h2", { class: "ova-home__heading", text: item.title }),
      el("ul", { class: "ova-references__list" }, item.items.map(function (reference) {
        return el("li", { class: "ova-references__item", html: OVA.markdown.inline(reference) });
      }))
    ]);
  }

  byId("ova-references-intro").textContent = data.intro;
  OVA.dom.mount(byId("ova-references-groups"), data.groups.map(group));
  byId("ova-references-home").href = "index.html" + (teacherMode ? "?teacher=1" : "");

  OVA.renderCourseMenu(byId("ova-course-menu"), OVA.data.course, null, teacherMode);
  OVA.createSidebar({
    toggle: byId("ova-menu-toggle"),
    close: byId("ova-menu-close"),
    scrim: byId("ova-scrim"),
    background: [byId("ova-topbar"), byId("ova-main-column")],
    startClosed: true
  });
})(window.OVA);
