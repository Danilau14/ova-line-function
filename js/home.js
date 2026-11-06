/* Startup for index.html: cover, side menu and each session linked under its objective.
   In teacher mode (?teacher=1) it also offers a way out. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var course = OVA.data.course;
  var markdown = OVA.markdown;
  var teacherMode = new URLSearchParams(window.location.search).get("teacher") === "1";
  var suffix = teacherMode ? "&teacher=1" : "";

  function byId(id) { return document.getElementById(id); }

  function sessionLink(id) {
    var session = course.sessions.filter(function (item) { return item.id === id; })[0];
    var label = "Sesión " + session.id + " · " + session.title;
    return el("li", {}, [session.available
      ? el("a", { class: "ova-home__session", href: "session.html?s=" + session.id + suffix, text: label })
      : el("span", { class: "ova-home__session ova-home__session--pending", text: label + " (próximamente)" })]);
  }

  function objectiveCard(objective) {
    return el("article", { class: "ova-home__objective" }, [
      el("h3", { class: "ova-home__objective-title" }, [
        el("span", { "aria-hidden": "true", text: objective.icon }),
        el("span", { html: markdown.inline(objective.title) })
      ]),
      el("p", { html: markdown.inline(objective.text) }),
      el("p", { html: "<strong>Qué se espera:</strong> " + markdown.inline(objective.expected) }),
      el("ul", { class: "ova-home__list" }, objective.sessions.map(sessionLink))
    ]);
  }

  function stepItem(step) {
    return el("li", { class: "ova-home__step" }, [
      el("span", { class: "ova-home__step-icon", "aria-hidden": "true", text: step.icon }),
      el("div", {}, [
        el("strong", { class: "ova-home__step-title", text: step.title }),
        el("span", { text: step.text })
      ])
    ]);
  }

  byId("ova-home-about").innerHTML = markdown.toHtml(course.about);
  byId("ova-home-start").href = "session.html?s=1" + suffix;
  byId("ova-home-references").href = "references.html" + (teacherMode ? "?teacher=1" : "");
  OVA.dom.mount(byId("ova-home-list"), course.objectives.map(objectiveCard));
  byId("ova-home-note").textContent = course.objectivesNote;
  byId("ova-home-organization").textContent = course.organization.intro;
  OVA.dom.mount(byId("ova-home-steps"), course.organization.steps.map(stepItem));
  byId("ova-home-callout").textContent = course.organization.note;

  OVA.renderCourseMenu(byId("ova-course-menu"), course, null, teacherMode);
  OVA.createSidebar({
    toggle: byId("ova-menu-toggle"),
    close: byId("ova-menu-close"),
    scrim: byId("ova-scrim"),
    background: [byId("ova-topbar"), byId("ova-main-column")],
    startClosed: true
  });

  if (teacherMode) {
    OVA.dom.mount(byId("ova-home-teacher"), el("a", {
      class: "ova-home__teacher",
      href: "index.html",
      text: "🔑 Salir del modo docente"
    }));
  }
})(window.OVA);
