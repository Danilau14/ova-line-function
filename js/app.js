/* Startup for session.html: reads ?s=, loads the session data and wires renderer, navigation, sidebar and services. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var mount = OVA.dom.mount;
  var UNIT_TITLE = "Funciones: explorando cambios";

  var params = new URLSearchParams(window.location.search);
  var teacherMode = params.get("teacher") === "1";
  var content = document.getElementById("ova-content");
  var sessionTitle = document.getElementById("ova-session-title");
  var course = OVA.data.course;

  var inline = OVA.markdown.inline;
  var services = {
    markdown: OVA.markdown,
    validator: OVA.validator,
    scale: OVA.scale,
    planeDrawing: OVA.planeDrawing,
    missions: { trip: OVA.data.mission },
    renderFigure: function (block) { return OVA.getComponent(block.type).render(block, services); },
    createFeedback: function () { return OVA.feedback.create(inline); },
    createField: OVA.field.createService(OVA.validator),
    gate: OVA.gate.create()
  };
  services.createReview = OVA.review.createService(OVA.hints, OVA.feedback, inline, services.gate);

  var requested = course.sessions.filter(function (x) { return String(x.id) === params.get("s"); })[0];
  var pageListSlot = OVA.renderCourseMenu(
    document.getElementById("ova-course-menu"),
    course,
    requested ? requested.id : null,
    teacherMode
  );
  var sidebar = OVA.createSidebar({
    toggle: document.getElementById("ova-menu-toggle"),
    close: document.getElementById("ova-menu-close"),
    scrim: document.getElementById("ova-scrim"),
    background: [document.getElementById("ova-topbar"), document.getElementById("ova-main-column")]
  });

  function showNotice(text) {
    sessionTitle.textContent = UNIT_TITLE;
    mount(content, el("p", { class: "ova-notice", text: text }));
  }

  /* Teacher keys are added to the page only in teacher mode (?teacher=1). */
  function pageToShow(page) {
    if (!teacherMode || !page.teacherKey) return page;
    var key = { type: "box", variant: "teacher", title: "Clave para el docente", icon: "🔑", text: page.teacherKey };
    return { title: page.title, blocks: page.blocks.concat(key) };
  }

  /* Teacher mode adds a last page with every key and explanation of the session. */
  function teacherPage(session) {
    return {
      id: "teacher-review",
      title: "🔑 Todas las explicaciones de la sesión",
      blocks: [{ type: "teacher-review", pages: session.pages }]
    };
  }

  function startSession(session) {
    document.title = session.title + " · " + UNIT_TITLE;
    sessionTitle.textContent = session.title;

    var renderer = OVA.createRenderer(content, services);
    var firstTime = true;
    var pages = teacherMode ? session.pages.concat(teacherPage(session)) : session.pages;
    OVA.createNavigation({
      pages: pages,
      progressSlot: document.getElementById("ova-progress"),
      pagerSlot: document.getElementById("ova-pager"),
      pageListSlot: pageListSlot,
      onChange: function (index) {
        services.gate.begin(pages[index].id, teacherMode);
        var title = renderer.renderPage(pageToShow(pages[index]));
        sidebar.closeIfDrawer();
        window.scrollTo(0, 0);
        if (!firstTime) title.focus();
        firstTime = false;
      }
    }).start();
  }

  function loadSession(session) {
    var name = "session" + session.id;
    var script = document.createElement("script");
    script.src = "data/" + name + ".js";
    script.onload = function () { startSession(OVA.data[name]); };
    script.onerror = function () { showNotice("Esta sesión todavía no está disponible."); };
    document.body.appendChild(script);
  }

  if (!requested) showNotice("Falta indicar una sesión válida. Abre el menú y elige una.");
  else if (!requested.available) showNotice("Esta sesión todavía no está disponible.");
  else loadSession(requested);
})(window.OVA);
