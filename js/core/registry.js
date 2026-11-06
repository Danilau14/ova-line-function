/* Component registry. Contract: { render(data, services) → HTMLElement, destroy?(element) }. */
(function (OVA) {
  "use strict";

  var components = {};

  OVA.register = function (type, component) {
    if (!component || typeof component.render !== "function") {
      throw new Error('Component "' + type + '" must implement render(data, services).');
    }
    if (components[type]) throw new Error('Component "' + type + '" is already registered.');
    components[type] = component;
  };

  OVA.getComponent = function (type) {
    return components[type] || null;
  };
})(window.OVA = window.OVA || {});
