/* Turns page data into DOM. Treats every registered component the same way. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var mount = OVA.dom.mount;

  OVA.createRenderer = function (container, services) {
    var mounted = [];

    function cleanUp() {
      mounted.forEach(function (m) {
        if (m.component.destroy) m.component.destroy(m.element);
      });
      mounted = [];
    }

    function renderBlock(block) {
      var component = OVA.getComponent(block.type);
      if (!component) {
        console.error("Block without a registered component:", block.type);
        return el("p", { class: "ova-notice", text: "Este bloque no se pudo mostrar (" + block.type + ")." });
      }
      var element = component.render(block, services);
      mounted.push({ component: component, element: element });
      return element;
    }

    function renderPage(page) {
      cleanUp();
      var title = el("h2", { class: "ova-page__title", text: page.title, tabindex: "-1" });
      mount(container, [title].concat(page.blocks.map(renderBlock)));
      return title;
    }

    return { renderPage: renderPage };
  };
})(window.OVA);
