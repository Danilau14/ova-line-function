/* The only button of the final evaluation: sends every part at once and says what happened with the result. */
(function (OVA) {
  "use strict";

  var el = OVA.dom.el;
  var OUTCOMES = {
    sent: { state: "ok", text: "**Evaluación enviada.** Tu docente ya puede ver tu resultado en la plataforma. Revisa arriba la explicación de lo que no acertaste." },
    failed: { state: "error", text: "**La plataforma no recibió tu resultado.** Avísale a tu docente antes de cerrar esta página. Revisa arriba la explicación de lo que no acertaste." },
    none: { state: "ok", text: "**Evaluación terminada.** No entraste desde la plataforma del colegio, así que tu resultado no quedó registrado. Revisa arriba la explicación de lo que no acertaste." },
    teacher: { state: "ok", text: "**Evaluación terminada.** En modo docente no se envía ningún resultado." }
  };

  OVA.register("exam-submit", {
    render: function (data, s) {
      var release = s.gate.hold();
      var message = s.createFeedback();
      var button = el("button", {
        class: "ova-btn ova-review__button",
        type: "button",
        text: "Enviar evaluación",
        on: {
          click: function () {
            var missing = s.assessment.findMissing();
            if (missing.length) {
              message.show([{ state: "empty", text: missing.length === 1
                ? "Te falta responder 1 pregunta. Está marcada arriba."
                : "Te faltan " + missing.length + " preguntas por responder. Están marcadas arriba." }]);
              missing[0].element.scrollIntoView({ block: "center" });
              return;
            }
            button.disabled = true;
            message.show([OUTCOMES[s.assessment.submit()]]);
            release();
          }
        }
      });
      return OVA.dom.card(data, [
        el("div", { class: "ova-review" }, [button, message.element])
      ], "ova-exam");
    }
  });
})(window.OVA);
