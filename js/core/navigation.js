/* Page state: previous/next, page list in the sidebar and progress. Reports changes through onChange(index). */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var mount = OVA.dom.mount;

  OVA.createNavigation = function (options) {
    var pages = options.pages;
    var total = pages.length;
    var current = 0;

    function goTo(index) {
      if (index < 0 || index >= total) return;
      current = index;
      paint();
      options.onChange(current);
    }

    function progress() {
      var number = current + 1;
      return [
        el("p", { class: "ova-progress__label", text: "Página " + number + " de " + total }),
        el("progress", {
          class: "ova-progress__bar",
          max: total,
          value: number,
          "aria-label": "Avance en la sesión: página " + number + " de " + total
        })
      ];
    }

    function pageList() {
      return el("ul", { class: "ova-menu__pages" }, pages.map(function (page, i) {
        return el("li", {}, [el("button", {
          class: "ova-menu__page",
          type: "button",
          text: (i + 1) + ". " + page.title,
          "aria-current": i === current ? "page" : null,
          on: { click: function () { goTo(i); } }
        })]);
      }));
    }

    function stepButton(text, target, extraClass) {
      return el("button", {
        class: "ova-btn ova-pager__btn" + extraClass,
        type: "button",
        text: text,
        disabled: target < 0 || target >= total,
        on: { click: function () { goTo(target); } }
      });
    }

    function pager() {
      return el("nav", { class: "ova-pager", "aria-label": "Pasar de página" }, [
        stepButton("← Anterior", current - 1, " ova-btn--soft"),
        stepButton("Siguiente →", current + 1, "")
      ]);
    }

    function paint() {
      mount(options.progressSlot, progress());
      mount(options.pagerSlot, pager());
      mount(options.pageListSlot, pageList());
    }

    return { start: function () { goTo(0); } };
  };
})(window.OVA);
