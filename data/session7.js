/* Session 7: content only. Sources: ASF Act. 59–62 · TXT8 Afín Ej. 1, 3 · MAT8 L26, L28. Final self-assessment: own content. */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾", TEACHER = "👩🏽‍🏫";

  function plot(description, m, b, title) {
    return {
      type: "plane",
      title: title,
      x: { name: "x", unit: "", min: -4, max: 4, step: 2 },
      y: { name: "y", unit: "", min: -6, max: 8, step: 2 },
      description: description,
      relation: function (x) { return [m * x + b]; }
    };
  }

  OVA.data.session7 = {
    title: "Cierre: la regla y la evaluación",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "Las camisetas: dos precios y ninguna regla",
        minutes: 15,
        contexts: ["shirts"],
        teacherKey: "m = 40.000/5 = 8.000. 8.000 · 5 = 40.000; b = 60.000 − 40.000 = 20.000. f(x) = 8.000x + 20.000. f(12) = 116.000. Es afín.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "El curso votó con pruebas: la salida será al río, en la buseta, porque a 20 km sale $4.000 más barata por grupo. Ahora falta organizarla: Camilo quiere camisetas para todos, pero el almacén solo le dio dos precios sueltos." },
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, side: "me", text: "5 camisetas cuestan $60.000, y 10 cuestan $100.000." },
              { who: "Santi", avatar: SANTI, text: "¿Y cuánto valen 12?" },
              { who: "Camilo", avatar: CAMILO, side: "me", text: "Se me olvidó preguntar 😅" },
              { who: "Laura", avatar: LAURA, text: "Con dos puntos alcanza para hallar la regla. Empecemos por m." }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            title: "Paso 1: halla la pendiente",
            icon: "🧮",
            x: { name: "Camisetas", unit: "", min: 0, max: 12, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 120000, step: 20000 },
            points: [[5, 60000], [10, 100000]],
            hint: "Arriba van los valores: 100.000 − 60.000. Abajo, las camisetas: 10 − 5. Luego resta y divide.",
            explanation: "m = [[100.000 − 60.000|10 − 5]] = [[40.000|5]] = 8.000: cada camiseta cuesta $8.000."
          },
          {
            type: "quiz",
            title: "Paso 2: halla el intercepto",
            icon: "🔍",
            text: "Ya sabes que f(x) = 8.000x + b. Usa un punto que conozcas: con 5 camisetas el valor es $60.000.",
            questions: [
              { type: "numeric", prompt: "Lo que cuestan 5 camisetas a $8.000 cada una: 8.000 · 5 = $___", label: "Valor de 5 camisetas sin cobro fijo", answer: 40000, hint: "Multiplica.", explanation: "8.000 · 5 = 40.000." },
              { type: "numeric", prompt: "Lo que falta para llegar a $60.000: b = 60.000 − 40.000 = $___", label: "Valor de b", answer: 20000, hint: "Es el cobro que no depende de las camisetas. Resta.", explanation: "60.000 − 40.000 = 20.000. Es lo que se paga aunque no pidan ninguna camiseta: el diseño." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Paso 3: escribe la regla y úsala",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "La regla de las camisetas es…", options: ["f(x) = 8.000x + 20.000", "f(x) = 20.000x + 8.000", "f(x) = 8.000x"], answer: 0, hint: "m acompaña a la x y b va solo.", explanation: "m = 8.000 acompaña a la x, y b = 20.000 va solo." },
              { type: "numeric", prompt: "12 camisetas cuestan $___", label: "Valor de 12 camisetas", answer: 116000, hint: "Evalúa la regla con x = 12.", explanation: "f(12) = 8.000 · 12 + 20.000 = 96.000 + 20.000 = 116.000." },
              { type: "choice", prompt: "¿Esta función es lineal o afín?", options: ["Lineal", "Afín"], answer: 1, hint: "¿Pasa por el origen? Mira cuánto vale b.", explanation: "b = 20.000 no es 0: la recta no pasa por el origen. Es afín." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "**Para hallar la ecuación de una recta con dos puntos:**\n\n- Calcula la pendiente: m = [[y₂ − y₁|x₂ − x₁]].\n- Reemplaza m y uno de los puntos en y = mx + b.\n- Despeja b: b = y − m · x.\n- Escribe la regla f(x) = mx + b.\n\nCompruébala con el otro punto: f(10) = 8.000 · 10 + 20.000 = 100.000."
          },
          { type: "bridge", text: "Laura sube la dificultad: «¿Y si no tienes los puntos escritos, sino solo el dibujo de la recta?»." }
        ]
      },
      {
        id: "p2",
        title: "De la gráfica a la fórmula",
        minutes: 10,
        contexts: [],
        teacherKey: "Primera recta: b = 4, m = −1, f(x) = −x + 4. Segunda recta: b = −2, m = 3, f(x) = 3x − 2.",
        blocks: [
          {
            type: "box",
            title: "Cómo se lee",
            icon: "👀",
            text: "Primero mira dónde corta el eje vertical: ahí está b. Después elige dos puntos de la recta y calcula m."
          },
          {
            type: "quiz",
            title: "Primera recta",
            icon: "🔍",
            questions: [
              { type: "numeric", signed: true, figure: plot("Recta que pasa por (0, 4) y (4, 0)", -1, 4), prompt: "La recta corta el eje vertical en b = ___", label: "Intercepto de la primera recta", answer: 4, hint: "Mira dónde cruza la línea vertical del 0.", explanation: "La recta cruza el eje vertical en y = 4." }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            title: "Calcula su pendiente con (0, 4) y (2, 2)",
            icon: "🧮",
            x: { name: "x", unit: "", min: -1, max: 4, step: 1 },
            y: { name: "y", unit: "", min: 0, max: 6, step: 2 },
            points: [[0, 4], [2, 2]],
            hint: "Arriba van las y: 2 − 4. Abajo van las x: 2 − 0.",
            explanation: "m = [[2 − 4|2 − 0]] = [[−2|2]] = −1."
          },
          {
            type: "quiz",
            questions: [
              { type: "choice", prompt: "Con m = −1 y b = 4, su fórmula es…", options: ["f(x) = −x + 4", "f(x) = x + 4", "f(x) = 4x − 1"], answer: 0, hint: "Reemplaza m y b en f(x) = mx + b.", explanation: "Con m = −1 y b = 4: f(x) = −x + 4." }
            ]
          },
          { type: "bridge", text: "La profe escucha todo y les lanza un reto: «En el río quieren música, ¿no? Van a tener que alquilar sonido. Modélenlo ustedes, sin ayuda»." }
        ]
      },
      {
        id: "p3",
        title: "Mini-reto: el sonido para el río",
        minutes: 12,
        contexts: ["sound"],
        teacherKey: "Independiente: horas. m = 5.000, b = 30.000. f(x) = 5.000x + 30.000. f(4) = 50.000. Con $60.000: 6 horas. Puntos: (0, 30.000), (2, 40.000), (4, 50.000), (6, 60.000).",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Profe", avatar: TEACHER, text: "El alquiler del sonido cuesta $30.000 por llevarlo y $5.000 por cada hora de uso." },
              { who: "Valentina", avatar: VALENTINA, side: "me", text: "Tenemos $60.000 del fondo. ¿Para cuántas horas alcanza?" },
              { who: "Profe", avatar: TEACHER, text: "Eso lo responden ustedes, con la función." }
            ]
          },
          {
            type: "quiz",
            title: "Plantea el modelo",
            icon: "🧭",
            questions: [
              { type: "choice", prompt: "¿Cuál es la variable independiente?", options: ["Las horas de uso", "El valor del alquiler"], answer: 0, hint: "¿Qué se elige y qué resulta de esa elección?", explanation: "Se eligen las horas, y el valor resulta de ahí." },
              { type: "numeric", prompt: "m = ___", label: "Pendiente del alquiler", answer: 5000, hint: "¿Cuánto suma cada hora?", explanation: "Cada hora suma $5.000: m = 5.000." },
              { type: "numeric", prompt: "b = ___", label: "Intercepto del alquiler", answer: 30000, hint: "¿Cuánto se paga aunque se use 0 horas?", explanation: "Por llevarlo se pagan $30.000 aunque se use 0 horas: b = 30.000." }
            ]
          },
          {
            type: "plane",
            mode: "build",
            title: "Dibuja el modelo",
            icon: "✏️",
            text: "Con f(x) = 5.000x + 30.000, ubica los puntos para 0, 2, 4 y 6 horas.",
            x: { name: "Tiempo", unit: "h", min: 0, max: 8, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 80000, step: 20000, snap: 10000 },
            targets: [[0, 30000], [2, 40000], [4, 50000], [6, 60000]],
            connect: true,
            hint: "Evalúa la regla en cada x: por ejemplo, f(2) = 5.000 · 2 + 30.000.",
            explanation: "f(0) = 30.000, f(2) = 40.000, f(4) = 50.000 y f(6) = 60.000."
          },
          {
            type: "quiz",
            variant: "think",
            title: "Resuelve y decide",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "4 horas de sonido cuestan $___", label: "Valor de 4 horas", answer: 50000, hint: "Evalúa la regla con x = 4.", explanation: "f(4) = 5.000 · 4 + 30.000 = 50.000." },
              { type: "numeric", prompt: "Con $60.000 alcanza para ___ horas.", label: "Horas con 60.000 pesos", answer: 6, hint: "Quita primero los $30.000 de llevarlo y reparte lo que queda.", explanation: "60.000 − 30.000 = 30.000, y 30.000 ÷ 5.000 = 6 horas." },
              { type: "choice", prompt: "Si cobraran $10.000 por llevarlo, en vez de $30.000, la recta…", options: ["bajaría sin cambiar su inclinación", "quedaría más inclinada", "pasaría por el origen"], answer: 0, hint: "¿Qué parámetro cambió: m o b?", explanation: "Solo cambia b, que baja de 30.000 a 10.000. La recta baja y conserva su inclinación." }
            ]
          },
          { type: "bridge", text: "La profe sonríe: «Ya casi. Antes de la salida, una última revisión de todo lo que aprendieron»." }
        ]
      },
      {
        id: "p4",
        title: "Evaluación final",
        minutes: 13,
        contexts: [],
        teacherKey: "Sin puntaje: la retroalimentación es inmediata. Observa por objetivo: Parte 1 (O1), Parte 2 (O2), Parte 3 (O3), con los criterios SIEE. Claves: no, tiempo de carga, 10, 101; no, negativa, sube 4, lineal, 8, 2; regla con 3.000 y 2.000, 17.000, 3 horas.",
        blocks: [
          {
            type: "box",
            title: "Antes de empezar",
            icon: "📝",
            text: "No hay cronómetro ni puntaje. Responde con calma y, si te equivocas, revisa la pista e inténtalo otra vez."
          },
          {
            type: "quiz",
            title: "Parte 1: funciones",
            icon: "1️⃣",
            questions: [
              {
                type: "choice",
                figure: { type: "sagittal", left: { title: "A", items: ["1", "2", "3"] }, right: { title: "B", items: ["4", "5", "6"] }, arrows: [[0, 0], [0, 1], [1, 2], [2, 2]] },
                prompt: "¿Este diagrama representa una función?",
                options: ["Sí", "No"],
                answer: 1,
                hint: "Cuenta cuántas flechas salen de cada elemento de A.",
                explanation: "Del 1 salen dos flechas: una entrada con dos salidas. No es función."
              },
              { type: "choice", prompt: "En «minutos de carga → % de batería», la variable independiente es…", options: ["los minutos de carga", "el % de batería"], answer: 0, hint: "¿Cuál se elige y cuál resulta?", explanation: "Se eligen los minutos, y el porcentaje resulta de ahí." },
              { type: "numeric", prompt: "Si f(x) = 3x − 2, entonces f(4) = ___", label: "f de 4", answer: 10, hint: "Reemplaza x por 4.", explanation: "f(4) = 3 · 4 − 2 = 12 − 2 = 10." },
              { type: "choice", prompt: "Una rifa tiene 100 boletas. ¿Qué valor NO está en el dominio de «boletas vendidas → dinero»?", options: ["0", "50", "100", "101"], answer: 3, hint: "¿Se pueden vender más boletas de las que hay?", explanation: "Solo hay 100 boletas: 101 no es una entrada posible." }
            ]
          },
          {
            type: "quiz",
            title: "Parte 2: pendiente e intercepto",
            icon: "2️⃣",
            questions: [
              {
                type: "choice",
                figure: {
                  type: "plane",
                  x: { name: "x", unit: "", min: -1, max: 4, step: 1 },
                  y: { name: "y", unit: "", min: -3, max: 3, step: 1 },
                  description: "Parábola acostada, abierta hacia la derecha",
                  relation: function (x) {
                    if (x < 0) return [];
                    var h = Math.sqrt(x);
                    return [h, -h];
                  }
                },
                prompt: "Según el criterio de la recta vertical, ¿esta gráfica representa una función?",
                options: ["Sí", "No"],
                answer: 1,
                hint: "Imagina una recta vertical en x = 1: ¿cuántos puntos toca?",
                explanation: "En x = 1 la recta vertical toca dos puntos: y = 1 y y = −1. No es función."
              },
              { type: "choice", prompt: "Una recta baja de izquierda a derecha. Su pendiente es…", options: ["positiva", "negativa", "cero"], answer: 1, hint: "Si baja, ¿qué signo queda arriba en la fracción?", explanation: "Si baja, y disminuye y arriba queda un número negativo: m es negativa." },
              { type: "choice", prompt: "Al pasar de f(x) = 2x + 1 a f(x) = 2x + 5, la recta…", options: ["sube 4 unidades sin cambiar su inclinación", "queda más inclinada", "pasa a bajar"], answer: 0, hint: "¿Qué número cambió: m o b?", explanation: "Solo cambia b, de 1 a 5: la recta sube 4 unidades y conserva su pendiente." },
              { type: "choice", prompt: "f(x) = 7x es una función…", options: ["lineal", "afín"], answer: 0, hint: "¿Se le suma algo? ¿Pasa por el origen?", explanation: "No se le suma nada, así que pasa por el origen: es lineal." },
              { type: "numeric", signed: true, prompt: "En f(x) = −3x + 8, el intercepto es ___", label: "Intercepto de menos 3x más 8", answer: 8, hint: "Es el número que va solo.", explanation: "El número que va solo es 8: la recta corta el eje vertical en (0, 8)." },
              { type: "numeric", signed: true, prompt: "La recta que pasa por (2, 5) y (4, 9) tiene pendiente m = ___", label: "Pendiente entre 2,5 y 4,9", answer: 2, hint: "Cuánto cambia y, sobre cuánto cambia x.", explanation: "m = [[9 − 5|4 − 2]] = [[4|2]] = 2." }
            ]
          },
          {
            type: "quiz",
            title: "Parte 3: modelar y decidir",
            icon: "3️⃣",
            text: "Un parqueadero cobra $2.000 de entrada y $3.000 por cada hora.",
            questions: [
              { type: "choice", prompt: "La regla del parqueadero es…", options: ["f(x) = 2.000x + 3.000", "f(x) = 3.000x + 2.000", "f(x) = 5.000x"], answer: 1, hint: "¿Qué número se multiplica por las horas?", explanation: "Las horas se multiplican por 3.000, y los 2.000 de entrada se pagan una sola vez: f(x) = 3.000x + 2.000." },
              { type: "numeric", prompt: "5 horas cuestan $___", label: "Valor de 5 horas", answer: 17000, hint: "Evalúa la regla con x = 5.", explanation: "f(5) = 3.000 · 5 + 2.000 = 17.000." },
              { type: "numeric", prompt: "Otro parqueadero cobra $5.000 de entrada y $2.000 por hora. Los dos cuestan lo mismo con ___ horas.", label: "Horas en que cuestan igual", answer: 3, hint: "Prueba con 1, 2 y 3 horas en cada regla.", explanation: "Con 3 horas: 3.000 · 3 + 2.000 = 11.000 y 2.000 · 3 + 5.000 = 11.000." }
            ]
          },
          { type: "bridge", text: "Terminaste la revisión. ¡Solo falta salir de paseo!" }
        ]
      },
      {
        id: "p5",
        title: "¡Por fin, la salida!",
        minutes: 5,
        contexts: ["trip", "camilo"],
        teacherKey: "Preguntas orales. Sirven como evidencia para los criterios SIEE de los tres objetivos.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, side: "me", text: "¡Hoy es la salida al río, y llegué de primero! 🎉" },
              { who: "Laura", avatar: LAURA, text: "Déjame ver la gráfica de tu app… 🤨" },
              { who: "Santi", avatar: SANTI, text: "Ya dejen eso, que la buseta se va. ¿Quién trajo las camisetas?" },
              { who: "Valentina", avatar: VALENTINA, text: "12, por $116.000. Exacto, como decía la regla 😌" }
            ]
          },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- ¿Qué es una función? Explícalo con un ejemplo de tu vida.\n- ¿Qué pasa con una recta cuando cambian m y b? Di qué pasa al aumentarlos, disminuirlos o volverlos negativos.\n- ¿En qué situación de tu vida podrías usar una función para decidir mejor?"
          },
          { type: "mission", id: "trip", hintsUpTo: 5 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "Segunda recta: b = −2, m = 3, f(x) = 3x − 2.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          {
            type: "quiz",
            variant: "think",
            title: "Segunda recta",
            icon: "🧩",
            questions: [
              { type: "numeric", signed: true, figure: plot("Recta que pasa por (0, −2) y (2, 4)", 3, -2), prompt: "La recta corta el eje vertical en b = ___", label: "Intercepto de la segunda recta", answer: -2, hint: "Mira dónde cruza la línea vertical del 0. Puede ser negativo.", explanation: "La recta cruza el eje vertical en y = −2." }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            variant: "think",
            title: "Calcula su pendiente con (0, −2) y (2, 4)",
            icon: "🧮",
            x: { name: "x", unit: "", min: -1, max: 3, step: 1 },
            y: { name: "y", unit: "", min: -4, max: 6, step: 2 },
            points: [[0, -2], [2, 4]],
            hint: "Arriba van las y: 4 − (−2). Abajo van las x: 2 − 0.",
            explanation: "m = [[4 − (−2)|2 − 0]] = [[6|2]] = 3."
          },
          {
            type: "quiz",
            variant: "think",
            questions: [
              { type: "choice", prompt: "Con m = 3 y b = −2, su fórmula es…", options: ["f(x) = −2x + 3", "f(x) = 3x − 2", "f(x) = 3x + 2"], answer: 1, hint: "Reemplaza m y b en f(x) = mx + b. Fíjate en el signo de b.", explanation: "Con m = 3 y b = −2: f(x) = 3x − 2." }
            ]
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
              { term: "Hallar la ecuación con dos puntos", definition: "Calcula m = [[y₂ − y₁|x₂ − x₁]], reemplaza un punto en y = mx + b y despeja b." },
              { term: "Hallar la fórmula desde una gráfica", definition: "b es donde la recta corta el eje vertical; m se calcula con dos puntos de la recta." },
              { term: "Modelar una situación", definition: "Identifica la variable independiente, m (lo que suma cada unidad) y b (el valor inicial), y escribe f(x) = mx + b." }
            ]
          },
          { type: "bridge", text: "Una última pregunta para pensar: al comparar el taxi y la buseta hallaron el cruce mirando la gráfica. ¿Se podrá encontrar solo con las reglas, sin dibujar nada?" }
        ]
      }
    ]
  };
})();
