/* Opens and closes the sidebar: drawer with scrim on small screens, collapsible column on large ones. */
(function (OVA) {
  "use strict";

  var COLUMN_QUERY = "(min-width: 64rem)";

  OVA.createSidebar = function (o) {
    var column = window.matchMedia(COLUMN_QUERY);

    function isDrawer() { return !column.matches; }

    function setOpen(open) {
      document.body.setAttribute("data-sidebar", open ? "open" : "closed");
      o.toggle.setAttribute("aria-expanded", open ? "true" : "false");
      o.toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      /* While the drawer is open, the rest of the page cannot take focus. */
      o.background.forEach(function (node) { node.inert = open && isDrawer(); });
    }

    function isOpen() { return document.body.getAttribute("data-sidebar") === "open"; }

    function closeAndRefocus() {
      setOpen(false);
      o.toggle.focus();
    }

    o.toggle.addEventListener("click", function () {
      var opening = !isOpen();
      setOpen(opening);
      if (opening && isDrawer()) o.close.focus();
    });
    o.close.addEventListener("click", closeAndRefocus);
    o.scrim.addEventListener("click", closeAndRefocus);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && isOpen() && isDrawer()) closeAndRefocus();
    });
    function initialState() { return !o.startClosed && column.matches; }

    column.addEventListener("change", function () { setOpen(initialState()); });

    setOpen(initialState());

    return {
      /* After choosing a page on a small screen, the drawer gets out of the way. */
      closeIfDrawer: function () { if (isDrawer()) setOpen(false); }
    };
  };
})(window.OVA);
