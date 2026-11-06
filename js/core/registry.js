/* Component registry. Contract: { render(data, services) → HTMLElement, destroy?(element), figure? }.
   A component with figure:true gets its source credited right below its drawing. */
(function (OVA) {
  "use strict";

  var components = {};
  var FIGURE_SOURCE = "Fuente: elaboración propia.";

  function creditSource(element) {
    var caption = OVA.dom.el("p", { class: "ova-figure-source", text: FIGURE_SOURCE });
    var drawing = element.querySelector("svg");
    if (!drawing) {
      element.appendChild(caption);
      return element;
    }
    /* Below the drawing's own wrapper, so it never lands inside a row of the drawing. */
    var anchor = drawing;
    while (anchor.parentNode !== element && anchor.parentNode.parentNode !== element) anchor = anchor.parentNode;
    if (anchor.parentNode !== element) anchor = anchor.parentNode;
    element.insertBefore(caption, anchor.nextSibling);
    return element;
  }

  OVA.register = function (type, component) {
    if (!component || typeof component.render !== "function") {
      throw new Error('Component "' + type + '" must implement render(data, services).');
    }
    if (components[type]) throw new Error('Component "' + type + '" is already registered.');
    if (component.figure) {
      var draw = component.render;
      component.render = function (data, services) { return creditSource(draw.call(component, data, services)); };
    }
    components[type] = component;
  };

  OVA.getComponent = function (type) {
    return components[type] || null;
  };
})(window.OVA = window.OVA || {});
