/* Session 6: content only. Sources: ASF Act. 59, 60 · MAT8 L28, Desafíos de integración. Closes the unit's mission by comparing two functions. */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾";
  var KMS = [0, 4, 8, 12, 16, 20];
  var TAXI = KMS.map(function (x) { return 1500 * x + 4000; });
  var MINIBUS = KMS.map(function (x) { return 1000 * x + 10000; });

  OVA.data.session6 = {
    title: "La votación: comparar y decidir",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "Las pistas sobre la mesa",
        minutes: 8,
        contexts: ["taxi", "minibus", "trip"],
        teacherKey: "Taxi: m = 1.500, b = 4.000. Buseta: m = 1.000, b = 10.000.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "Llegó el día que dijo la profe. La oferta del taxi no sirve, porque la salida es un martes. Quedan los precios reales de los dos transportes, y hoy se decide con pruebas." },
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, text: "Hoy se vota. Nada de gritos: solo pruebas." },
              { who: "Santi", avatar: SANTI, text: "Taxi, obvio." },
              { who: "Valentina", avatar: VALENTINA, text: "Buseta, obvio." },
              { who: "Camilo", avatar: CAMILO, side: "me", text: "¿Y si revisamos las pistas primero? 🙃" }
            ]
          },
          {
            type: "box",
            title: "Tus pistas",
            icon: "📌",
            text: "El curso irá por grupos de cuatro, así que estos son los precios **por cada grupo**:\n\n- **Taxi:** $4.000 al subirse y $1.500 por km. La oferta no aplica, porque la salida es un martes.\n- **Buseta:** $10.000 al subirse y $1.000 por km."
          },
          {
            type: "quiz",
            title: "Escribe cada regla",
            icon: "🔍",
            text: "Usa tus pistas para completar f(x) = mx + b, donde x son los kilómetros.",
            questions: [
              { type: "numeric", prompt: "Taxi: m = ___", label: "Pendiente del taxi", answer: 1500, hint: "¿Cuánto cobra por cada kilómetro?", explanation: "El taxi cobra $1.500 por km: m = 1.500." },
              { type: "numeric", prompt: "Taxi: b = ___", label: "Intercepto del taxi", answer: 4000, hint: "¿Cuánto cobra al subirse?", explanation: "El taxi cobra $4.000 al subirse: b = 4.000." },
              { type: "numeric", prompt: "Buseta: m = ___", label: "Pendiente de la buseta", answer: 1000, hint: "¿Cuánto cobra por cada kilómetro?", explanation: "La buseta cobra $1.000 por km: m = 1.000." },
              { type: "numeric", prompt: "Buseta: b = ___", label: "Intercepto de la buseta", answer: 10000, hint: "¿Cuánto cobra al subirse?", explanation: "La buseta cobra $10.000 al subirse: b = 10.000." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Las dos reglas",
            icon: "🧠",
            text: "- **Taxi:** f(x) = 1.500x + 4.000\n- **Buseta:** f(x) = 1.000x + 10.000\n\nLas dos son funciones afines: tienen su pendiente m y su intercepto b."
          },
          { type: "bridge", text: "Reglas listas. Camilo propone calcular los dos precios, kilómetro a kilómetro, frente a frente." }
        ]
      },
      {
        id: "p2",
        title: "Frente a frente",
        minutes: 12,
        contexts: ["taxi", "minibus"],
        teacherKey: "Taxi: 4.000, 10.000, 16.000, 22.000, 28.000, 34.000. Buseta: 10.000, 14.000, 18.000, 22.000, 26.000, 30.000. 4 km: taxi. 20 km: buseta. Igual en 12 km.",
        blocks: [
          {
            type: "box",
            title: "Las dos reglas",
            icon: "📌",
            text: "- **Taxi:** f(x) = 1.500x + 4.000\n- **Buseta:** f(x) = 1.000x + 10.000\n\nx son los kilómetros y f(x), el valor en pesos."
          },
          {
            type: "table",
            title: "Calcula los dos precios",
            icon: "📊",
            hint: "Taxi: 1.500 por los km, más 4.000. Buseta: 1.000 por los km, más 10.000.", explanation: "Taxi: 1.500 · x + 4.000. Buseta: 1.000 · x + 10.000. Por ejemplo, con 4 km: $10.000 en taxi y $14.000 en buseta.",
            columns: { name: "Distancia (km)", values: KMS },
            rows: [
              { name: "Taxi ($)", values: TAXI, editable: true, given: [0] },
              { name: "Buseta ($)", values: MINIBUS, editable: true, given: [0] }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Para un viaje de 4 km, sale más barato…", options: ["el taxi", "la buseta", "da igual"], answer: 0, hint: "Compara en la columna de 4 km.", explanation: "Con 4 km, el taxi cuesta $10.000 y la buseta, $14.000: el taxi es más barato." },
              { type: "choice", prompt: "Para un viaje de 20 km, sale más barato…", options: ["el taxi", "la buseta", "da igual"], answer: 1, hint: "Compara en la columna de 20 km.", explanation: "Con 20 km, el taxi cuesta $34.000 y la buseta, $30.000: la buseta es más barata." },
              { type: "numeric", prompt: "Los dos cuestan lo mismo en ___ km.", label: "Kilómetros donde cuestan igual", answer: 12, hint: "Busca la columna con el mismo valor en las dos filas.", explanation: "En la columna de 12 km, los dos valen $22.000." }
            ]
          },
          { type: "box", title: "En grupo", icon: "🗣️", text: "¿Quién tenía razón: Santi o Valentina? ¿Por qué se pelearon tanto si los dos tenían algo de razón?" },
          { type: "bridge", text: "Laura pone las dos rectas en la pantalla del salón. Y todo el mundo se queda callado." }
        ]
      },
      {
        id: "p3",
        title: "Las dos rectas se cruzan",
        minutes: 15,
        contexts: ["taxi", "minibus"],
        teacherKey: "Se cruzan en (12 km, $22.000). Antes: taxi. Después: buseta. Más pendiente: taxi. Mayor intercepto: buseta.",
        blocks: [
          {
            type: "box",
            title: "Las dos reglas",
            icon: "📌",
            text: "- **Taxi:** f(x) = 1.500x + 4.000\n- **Buseta:** f(x) = 1.000x + 10.000\n\nx son los kilómetros y f(x), el valor en pesos."
          },
          {
            type: "line-lab",
            title: "Taxi y buseta",
            icon: "📈",
            text: "La línea continua es el taxi; la punteada, la buseta. Mueve el punto y lee las coordenadas de cada una.",
            x: { name: "Distancia", unit: "km", min: 0, max: 20, step: 4 },
            y: { name: "Valor", unit: "$", min: 0, max: 40000, step: 10000 },
            lines: [{ name: "Taxi", m: 1500, b: 4000 }, { name: "Buseta", m: 1000, b: 10000 }],
            probe: { initial: 4, step: 1 }
          },
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Las rectas se cruzan en ___ km.", label: "Kilómetro del cruce", answer: 12, hint: "Mueve el punto hasta que las dos coordenadas coincidan.", explanation: "En 12 km las dos coordenadas coinciden." },
              { type: "numeric", prompt: "En ese punto, cada uno cobra $___", label: "Valor en el cruce", answer: 22000, hint: "Lee la coordenada en ese kilómetro.", explanation: "Taxi: 1.500 · 12 + 4.000 = 22.000. Buseta: 1.000 · 12 + 10.000 = 22.000." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Antes del cruce, ¿cuál recta va por debajo?", options: ["La del taxi", "La de la buseta"], answer: 0, hint: "Mira en 2 km o en 4 km.", explanation: "Con 4 km, el taxi está en $10.000 y la buseta en $14.000: el taxi va por debajo." },
              { type: "choice", prompt: "Entonces, antes del cruce conviene…", options: ["el taxi", "la buseta"], answer: 0, hint: "La recta de abajo es la que cobra menos.", explanation: "La recta de abajo es la que cobra menos: antes de 12 km, el taxi." },
              { type: "choice", prompt: "Después del cruce conviene…", options: ["el taxi", "la buseta"], answer: 1, hint: "Mira cuál queda abajo en 20 km.", explanation: "Después de 12 km, la buseta queda abajo: cobra menos." },
              { type: "choice", prompt: "¿Cuál tiene mayor pendiente?", options: ["El taxi", "La buseta"], answer: 0, hint: "¿Cuál es más inclinada? ¿Cuál cobra más por km?", explanation: "El taxi suma $1.500 por km y la buseta, $1.000: la pendiente del taxi es mayor." },
              { type: "choice", prompt: "¿Cuál tiene mayor intercepto?", options: ["El taxi", "La buseta"], answer: 1, hint: "¿Cuál arranca más arriba en 0 km?", explanation: "La buseta arranca en $10.000 y el taxi, en $4.000: el intercepto de la buseta es mayor." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "El **punto de corte** de dos rectas es el punto donde las dos funciones dan el **mismo valor** para la **misma entrada**.\n\nAquí es (12, 22.000): a los 12 km, taxi y buseta cobran $22.000. Antes conviene la de **menor intercepto**; después, la de **menor pendiente**."
          },
          { type: "bridge", text: "Ya saben leer el cruce. Falta lo importante: ¿para dónde es la salida?" }
        ]
      },
      {
        id: "p4",
        title: "¿Parque o río?",
        minutes: 12,
        contexts: ["destinations", "taxi", "minibus"],
        teacherKey: "Parque: taxi $16.000, buseta $18.000; conviene taxi y ahorra $2.000. Río: taxi $34.000, buseta $30.000; conviene buseta y ahorra $4.000.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, side: "me", text: "Hay dos planes: el parque, a 8 km, o el río, a 20 km." },
              { who: "Santi", avatar: SANTI, text: "¿Y cuál transporte sirve?" },
              { who: "Valentina", avatar: VALENTINA, text: "Depende, ¿no? 🤔" }
            ]
          },
          {
            type: "box",
            title: "Las dos reglas",
            icon: "📌",
            text: "- **Taxi:** f(x) = 1.500x + 4.000\n- **Buseta:** f(x) = 1.000x + 10.000\n\nx son los kilómetros y f(x), el valor en pesos."
          },
          {
            type: "quiz",
            title: "Plan 1: el parque (8 km)",
            icon: "🌳",
            questions: [
              { type: "numeric", prompt: "En taxi cuesta $___", label: "Taxi al parque", answer: 16000, hint: "Usa la regla del taxi con x = 8.", explanation: "1.500 · 8 + 4.000 = 16.000." },
              { type: "numeric", prompt: "En buseta cuesta $___", label: "Buseta al parque", answer: 18000, hint: "Usa la regla de la buseta con x = 8.", explanation: "1.000 · 8 + 10.000 = 18.000." },
              { type: "choice", prompt: "Conviene…", options: ["el taxi", "la buseta"], answer: 0, hint: "¿Cuál cobra menos?", explanation: "Al parque: $16.000 en taxi y $18.000 en buseta. Conviene el taxi." },
              { type: "numeric", prompt: "Se ahorran $___", label: "Ahorro en el parque", answer: 2000, hint: "Resta los dos valores.", explanation: "18.000 − 16.000 = 2.000." }
            ]
          },
          {
            type: "quiz",
            title: "Plan 2: el río (20 km)",
            icon: "🏞️",
            questions: [
              { type: "numeric", prompt: "En taxi cuesta $___", label: "Taxi al río", answer: 34000, hint: "Usa la regla del taxi con x = 20.", explanation: "1.500 · 20 + 4.000 = 34.000." },
              { type: "numeric", prompt: "En buseta cuesta $___", label: "Buseta al río", answer: 30000, hint: "Usa la regla de la buseta con x = 20.", explanation: "1.000 · 20 + 10.000 = 30.000." },
              { type: "choice", prompt: "Conviene…", options: ["el taxi", "la buseta"], answer: 1, hint: "¿Cuál cobra menos?", explanation: "Al río: $34.000 en taxi y $30.000 en buseta. Conviene la buseta." },
              { type: "numeric", prompt: "Se ahorran $___", label: "Ahorro en el río", answer: 4000, hint: "Resta los dos valores.", explanation: "34.000 − 30.000 = 4.000." }
            ]
          },
          { type: "bridge", text: "Llegó la hora que dijo la profe: el curso vota." }
        ]
      },
      {
        id: "p5",
        title: "La votación final",
        minutes: 8,
        contexts: ["trip", "taxi", "minibus"],
        teacherKey: "Pregunta abierta: no hay una sola respuesta. La recomendación debe depender de los km y apoyarse en la gráfica, la tabla o la regla. Dos rectas y su cruce preparan el tema de sistemas de ecuaciones.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, text: "Entonces nadie tenía toda la razón." },
              { who: "Santi", avatar: SANTI, text: "Bueno… hasta 12 km, mi taxi 😎" },
              { who: "Valentina", avatar: VALENTINA, text: "Y de ahí en adelante, mi buseta 😌" },
              { who: "Camilo", avatar: CAMILO, side: "me", text: "¿Votamos? Hoy sí llegué a tiempo 😅" }
            ]
          },
          {
            type: "box",
            title: "Las dos reglas",
            icon: "📌",
            text: "- **Taxi:** f(x) = 1.500x + 4.000\n- **Buseta:** f(x) = 1.000x + 10.000\n\nx son los kilómetros y f(x), el valor en pesos."
          },
          {
            type: "box",
            title: "Tu recomendación",
            icon: "🗳️",
            text: "En grupo, decidan a dónde ir y en qué transporte. Tienen que convencer al curso con una gráfica, una tabla o una regla. Con «porque sí» no vale."
          },
          {
            type: "box",
            variant: "naming",
            title: "Misión cumplida",
            icon: "🎯",
            text: "La misión era recomendar el transporte más barato según los kilómetros. Esta es la respuesta:\n\n- **Menos de 12 km:** el taxi.\n- **Exactamente 12 km:** da igual, los dos cuestan $22.000.\n- **Más de 12 km:** la buseta.\n\nPor eso se peleaban tanto Santi y Valentina: cada uno tenía razón en un pedazo de la recta."
          },
          { type: "mission", id: "trip", hintsUpTo: 5 },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- ¿Qué te dicen m y b de una función? Explícalo con el taxi y la buseta.\n- ¿Por qué el transporte más barato depende de los kilómetros?\n- ¿Qué fue lo que más te costó en toda la unidad, y qué te ayudó?"
          }
        ]
      },
      {
        id: "summary",
        title: "Resumen de conceptos",
        minutes: 0,
        contexts: [],
        blocks: [
          {
            type: "summary",
            items: [
              { term: "Comparar dos funciones", definition: "Para cada entrada, se calcula la salida de cada una y se ve cuál es menor o mayor." },
              { term: "Punto de corte", definition: "Punto donde dos rectas tienen la misma entrada y la misma salida." },
              { term: "Antes y después del corte", definition: "Cambia cuál función da el valor menor. Por eso la mejor opción depende de x." },
              { term: "m y b en un contexto", definition: "m es lo que se suma por cada unidad; b es el valor inicial, cuando x = 0." }
            ]
          },
          { type: "bridge", text: "El curso votó, por fin con pruebas: ganó el río, a 20 km, en la buseta del tío de Valentina. Santi lo aceptó, porque la gráfica no deja dudas. Ahora Camilo tiene otra idea: camisetas para todos." }
        ]
      }
    ]
  };
})();
