/* Numeric input shared by quiz and table: validates, marks itself and locks when correct or revealed. */
(function (OVA) {
  "use strict";

  function createService(validator) {
    return function createField(o) {
      var revealed = false;
      var input = OVA.dom.el("input", {
        class: "ova-field__input",
        type: "text",
        inputmode: o.signed ? "text" : "decimal",
        autocomplete: "off",
        "aria-label": o.label,
        placeholder: o.placeholder,
        on: { input: function () { mark(null); } }
      });
      var wrapper = OVA.dom.el("span", { class: "ova-field" }, [input]);

      function mark(state) {
        if (state) wrapper.setAttribute("data-state", state);
        else wrapper.removeAttribute("data-state");
        if (state === "error") input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }

      return {
        element: wrapper,
        hasValue: function () { return input.value.trim() !== ""; },
        check: function () {
          if (revealed) return "ok";
          var result = validator.validate("numeric", input.value, o.answer);
          mark(result === "empty" ? null : result);
          if (result === "ok") input.readOnly = true;
          return result;
        },
        reveal: function () {
          revealed = true;
          input.value = OVA.dom.formatNumber(o.answer);
          input.readOnly = true;
          mark("revealed");
        }
      };
    };
  }

  OVA.field = { createService: createService };
})(window.OVA);
