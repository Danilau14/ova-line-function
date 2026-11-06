/* Session 2: content only. Sources: ASF Act. 35–38, 40 · TXT8 Ej. 2, 7, 8 · MAT8 L24 Sit. 2. */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾", ELISA = "👩🏾", BETO = "👦🏼";

  var VOTERS = ["Ana", "Beto", "Carla", "Diego", "Elisa"];
  var OPTIONS = ["Taxi", "Buseta", "Bus público", "A pie"];
  var VOTES = [[0, 0], [1, 0], [2, 1], [2, 2], [4, 2]];

  var REASONS = [
    "Cada elemento de partida tiene exactamente una flecha",
    "Un elemento de partida tiene dos o más flechas",
    "Un elemento de partida no tiene ninguna flecha",
    "Varios llegan al mismo destino, pero cada uno tiene una sola flecha"
  ];
  var GRAPH_REASONS = ["Cada valor de x tiene un solo punto", "Hay valores de x con dos puntos"];
  var IS_FUNCTION = ["Sí es función", "No es función"];
  var AXIS = { name: "y", unit: "", min: -4, max: 4, step: 2 };

  function diagram(title, left, right, arrows) {
    return { type: "sagittal", title: title, left: { title: "A", items: left }, right: { title: "B", items: right }, arrows: arrows };
  }

  function caseQuestions(figure, isFunction, reasons, reason, explanation) {
    return [
      { type: "choice", figure: figure, prompt: "¿Representa una función?", options: IS_FUNCTION, answer: isFunction ? 0 : 1, hint: "Fíjate en cada elemento de partida o en cada valor de x: ¿tiene exactamente una salida?", explanation: explanation },
      { type: "choice", prompt: "¿Por qué?", options: reasons, answer: reason, hint: "Cuenta cuántas salidas tiene cada entrada.", explanation: explanation }
    ];
  }

  /* Camilo's walk from session 1. */
  function camiloWalk(x) {
    if (x <= 4) return 100 * x;
    if (x <= 7) return 400;
    if (x <= 10) return 400 + 200 * (x - 7);
    return 1000;
  }

  OVA.data.session2 = {
    title: "Concepto de función",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "La planilla de votos tiene algo raro",
        minutes: 8,
        contexts: ["votes", "taxi", "minibus"],
        teacherKey: "5 estudiantes y 4 opciones · Carla: Buseta y Bus público · Bus público: Carla y Elisa · Diego no votó · A pie no tiene votos · 5 parejas.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "La votación de la salida quedó empatada y Camilo llegó tarde porque Santi lo tenía en la puerta, convenciéndolo de votar por el taxi. Por eso hoy la repiten, fila por fila, en una planilla." },
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, side: "me", text: "Miren la planilla de la fila 2. Algo no me cuadra 🤨" },
              { who: "Camilo", avatar: CAMILO, text: "¿Qué pasó? ¿Hicieron trampa?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "No sé. Ayúdenme a revisarla." }
            ]
          },
          {
            type: "box",
            title: "La planilla de la fila 2",
            icon: "📋",
            text: "En esta fila podían votar Ana, Beto, Carla, Diego y Elisa. Alguien agregó más opciones a la planilla: Taxi, Buseta, Bus público y A pie.\n\n- Ana: Taxi\n- Beto: Taxi\n- Carla: Buseta\n- Carla: Bus público\n- Elisa: Bus público"
          },
          {
            type: "quiz",
            title: "Revisa la planilla",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Hay ___ estudiantes que podían votar.", label: "Cantidad de estudiantes", answer: 5, hint: "Cuéntalos en la primera línea, no en la lista de abajo.", explanation: "Ana, Beto, Carla, Diego y Elisa: son 5, aunque uno no haya votado." },
              { type: "multi", prompt: "¿Por qué opciones votó Carla?", options: OPTIONS, answer: [1, 2], hint: "Carla aparece más de una vez en la lista.", explanation: "Carla aparece dos veces en la planilla: una con Buseta y otra con Bus público." },
              { type: "multi", prompt: "¿Quiénes votaron por Bus público?", options: VOTERS, answer: [2, 4], hint: "Busca «Bus público» en la lista y mira quién está al lado.", explanation: "Al lado de Bus público aparecen Carla y Elisa." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "¿Quién no aparece votando?", options: VOTERS, answer: 3, hint: "Compara la primera línea con la lista.", explanation: "De los cinco nombres, Diego es el único que no está en ningún renglón." },
              { type: "choice", prompt: "¿Qué opción no recibió ningún voto?", options: OPTIONS, answer: 3, hint: "Busca cada opción en la lista.", explanation: "Taxi, Buseta y Bus público aparecen en la planilla. A pie no aparece." }
            ]
          },
          { type: "box", title: "En grupo", icon: "🗣️", text: "¿Qué es lo raro de esta votación? ¿Deberían contarse los dos votos de Carla?" },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una **relación** es una correspondencia entre los elementos de dos conjuntos.\n\n- **Conjunto de partida:** de donde salen las correspondencias; aquí, los estudiantes.\n- **Conjunto de llegada:** a donde llegan; aquí, las opciones.\n- **Par ordenado:** pareja (a, b) con a en el conjunto de partida y b en el de llegada. El orden importa: (Ana, Taxi) dice que Ana votó por Taxi."
          },
          { type: "bridge", text: "«Con esa planilla no se entiende nada», dice Laura, y agarra un marcador. «Esto hay que dibujarlo.»" }
        ]
      },
      {
        id: "p2",
        title: "Laura lo dibuja con flechas",
        minutes: 10,
        contexts: ["votes"],
        teacherKey: "1) Las 5 flechas de la lista. 2) 1→2, 2→4, 3→6, 4→8. 3) Pares (1,3), (2,5), (3,5), (4,7). De Carla salen 2 flechas, de Diego 0; al 10 no llega ninguna.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "¿Flechas? ¿Y eso para qué?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Ya verás: la trampa salta a la vista 😏" }
            ]
          },
          {
            type: "box",
            title: "La planilla de la fila 2",
            icon: "📋",
            text: "- Ana: Taxi\n- Beto: Taxi\n- Carla: Buseta\n- Carla: Bus público\n- Elisa: Bus público\n\nDiego no aparece y nadie votó A pie."
          },
          {
            type: "sagittal",
            mode: "build",
            title: "Dibuja la votación",
            icon: "✏️",
            text: "Une a cada estudiante con lo que votó, según la lista.",
            left: { title: "Estudiantes", items: VOTERS },
            right: { title: "Opciones", items: OPTIONS },
            solution: VOTES,
            hint: "Revisa la lista renglón por renglón. Las flechas marcadas con línea punteada no están en ella.", explanation: "Cada renglón es una flecha: Ana→Taxi, Beto→Taxi, Carla→Buseta, Carla→Bus público y Elisa→Bus público. Diego no tiene flecha."
          },
          {
            type: "quiz",
            title: "De las flechas a los pares",
            icon: "🔍",
            questions: [
              {
                type: "multi",
                figure: diagram("Mira este diagrama", ["1", "2", "3", "4"], ["3", "5", "7", "9"], [[0, 0], [1, 1], [2, 1], [3, 2]]),
                prompt: "¿Qué pares representa?",
                options: ["(1, 3)", "(1, 5)", "(2, 3)", "(2, 5)", "(3, 5)", "(3, 7)", "(4, 7)"],
                answer: [0, 3, 4, 6],
                hint: "Sigue cada flecha: el primer número es donde sale y el segundo, donde llega.", explanation: "Las flechas son 1→3, 2→5, 3→5 y 4→7, así que los pares son (1, 3), (2, 5), (3, 5) y (4, 7)."
              }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "En la votación, de Carla salen ___ flechas.", label: "Flechas que salen de Carla", answer: 2, hint: "Míralo en tu dibujo.", explanation: "De Carla salen 2 flechas: a Buseta y a Bus público." },
              { type: "numeric", prompt: "De Diego salen ___ flechas.", label: "Flechas que salen de Diego", answer: 0, hint: "Míralo en tu dibujo.", explanation: "Diego no votó, así que de él salen 0 flechas." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Un **diagrama sagital** representa una relación con dos conjuntos y **flechas**: cada flecha va de un elemento del conjunto de partida a uno del conjunto de llegada, y corresponde a un par ordenado.\n\nUna misma relación se puede contar de varias maneras: con una **tabla** de pares, con un **diagrama sagital** o con **palabras**."
          },
          { type: "bridge", text: "Santi se defiende: «Con mi primo no hay enredo. Su taxímetro es una máquina: le das un número y te da otro». Laura quiere abrirla a ver qué hace por dentro." }
        ]
      },
      {
        id: "p3",
        title: "La máquina misteriosa del primo",
        minutes: 10,
        contexts: ["taxi"],
        teacherKey: "Máquina 1: suma 5 (f(x) = x + 5). 2: triplica (f(x) = 3x). 3: el doble menos 1 (f(x) = 2x − 1). 4 (reto): cuadrado (f(x) = x²). Preguntas: 8, 5, sí, suma 5, 15. La pregunta del mismo número lleva a la idea de una sola salida.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Mi primo me prestó su app de tarifas. Tiene estas cuatro máquinas de prueba." },
              { who: "Laura", avatar: LAURA, side: "me", text: "¿Y qué hacen?" },
              { who: "Santi", avatar: SANTI, text: "Ni idea 😅 Solo sé que ingresas un número y sale otro." }
            ]
          },
          {
            type: "machine",
            title: "Descifra las máquinas",
            icon: "⚙️",
            text: "Elige una máquina y prueba varios números. Después de dos pruebas, te pone un reto de predicción. La cuarta es opcional.",
            hint: "Mira tus pruebas. Ingresa el 0 y el 1 y compara qué pasa cuando la entrada sube.",
            machines: [
              { name: "Máquina 1", rule: function (x) { return x + 5; }, predictions: [10, 40], reveal: "Esta máquina sumaba 5.", explanation: "Cada salida es la entrada más 5: 10 + 5 = 15 y 40 + 5 = 45." },
              { name: "Máquina 2", rule: function (x) { return 3 * x; }, predictions: [7, 12], reveal: "Esta máquina triplicaba.", explanation: "Cada salida es la entrada por 3: 3 × 7 = 21 y 3 × 12 = 36." },
              { name: "Máquina 3", rule: function (x) { return 2 * x - 1; }, predictions: [15, 20], reveal: "Esta máquina hacía el doble menos 1.", explanation: "Se duplica la entrada y se le resta 1: 2 × 15 − 1 = 29 y 2 × 20 − 1 = 39." },
              { name: "Máquina 4 (reto)", rule: function (x) { return x * x; }, predictions: [6, 9], reveal: "Esta máquina multiplicaba el número por sí mismo.", optional: true, explanation: "Cada entrada se multiplica por sí misma: 6 × 6 = 36 y 9 × 9 = 81." }
            ]
          },
          {
            type: "quiz",
            title: "Sobre la máquina 1",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Si ingresas 3, sale ___", label: "Salida si ingresas 3", answer: 8, hint: "Pruébalo en la máquina 1.", explanation: "La máquina 1 suma 5: 3 + 5 = 8." },
              { type: "numeric", prompt: "Si ingresas 0, sale ___", label: "Salida si ingresas 0", answer: 5, hint: "Pruébalo en la máquina 1.", explanation: "La máquina 1 suma 5: 0 + 5 = 5." },
              { type: "choice", prompt: "Si ingresas el mismo número dos veces, ¿sale siempre lo mismo?", options: ["Sí", "No", "Depende del día"], answer: 0, hint: "Ingresa dos veces el mismo número y compara.", explanation: "La regla no cambia, así que una misma entrada siempre da la misma salida." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una **función** es una relación en la que a **cada** elemento del conjunto de partida le corresponde **exactamente un** elemento del conjunto de llegada.\n\n- **Entrada (x):** elemento del conjunto de partida. Es la variable **independiente**.\n- **Regla:** lo que se hace con la entrada para obtener la salida.\n- **Salida, f(x):** elemento que le corresponde. Es la variable **dependiente**.\n\n**Notación:** si la regla suma 5, se escribe f(x) = x + 5. f(3) = 8 se lee «f de 3 es 8» y significa que a la entrada 3 le corresponde la salida 8."
          },
          { type: "bridge", text: "Todo iba bien hasta que Beto y Elisa comparan sus recibos del taxi. Y ahí se armó." }
        ]
      },
      {
        id: "p4",
        title: "El escándalo de los recibos",
        minutes: 6,
        contexts: ["votes", "taxi"],
        teacherKey: "Recibos: no es función. A: sí, una flecha cada uno. B: sí, varias llegan al mismo destino. C: no, dos flechas desde el 1. D: no, el 3 sin flecha. E (circunferencia): no. F (y = x²): sí. Votación: no es función.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Beto", avatar: BETO, text: "El primo me cobró $7.000 por ir al centro." },
              { who: "Elisa", avatar: ELISA, text: "¿Cómo así? ¡A mí me cobró $9.000 por el mismo viaje!" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Mismo recorrido, dos precios 🤯" },
              { who: "Santi", avatar: SANTI, text: "Eh… debe haber una explicación." }
            ]
          },
          {
            type: "receipts",
            title: "Los dos recibos",
            icon: "🧾",
            text: "Compáralos con calma: ¿qué tienen igual y qué tienen distinto?",
            items: [
              { number: "0142", who: "Beto", route: "Colegio → Centro", km: 2, total: 7000 },
              { number: "0143", who: "Elisa", route: "Colegio → Centro", km: 2, total: 9000 }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Si la entrada es el recorrido y la salida es el precio, ¿ese cobro es una función?", options: IS_FUNCTION, answer: 1, hint: "¿Cuántos precios salieron para un mismo recorrido?", explanation: "El mismo recorrido dio $7.000 y $9.000: una entrada con dos salidas. No es función." },
              { type: "choice", figure: { type: "sagittal", title: "La votación de la fila 2", left: { title: "Estudiantes", items: VOTERS }, right: { title: "Opciones", items: OPTIONS }, arrows: VOTES }, prompt: "¿Y la votación de Carla y Diego, tomando a cada estudiante como entrada?", options: IS_FUNCTION, answer: 1, hint: "Mira cuántas flechas salen de Carla y cuántas de Diego.", explanation: "De Carla salen dos flechas y de Diego ninguna. Cada entrada debería tener exactamente una. No es función." }
            ]
          },
          {
            type: "quiz",
            title: "Laura revisa todos los casos",
            icon: "🔍",
            questions: [].concat(
              caseQuestions(diagram("Caso A", ["1", "2", "3"], ["2", "4", "6"], [[0, 0], [1, 1], [2, 2]]), true, REASONS, 0, "De 1, 2 y 3 sale exactamente una flecha de cada uno, así que es función."),
              caseQuestions(diagram("Caso C", ["1", "2"], ["2", "4", "6"], [[0, 0], [0, 1], [1, 2]]), false, REASONS, 1, "Del 1 salen dos flechas: una entrada con dos salidas. No es función.")
            )
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una relación **NO es función** cuando:\n\n- De un elemento de partida salen **dos o más flechas** (una entrada con dos salidas).\n- De un elemento de partida **no sale ninguna flecha** (una entrada sin salida).\n\nOjo: **varias entradas pueden llegar a la misma salida** y sigue siendo función."
          },
          { type: "bridge", text: "Santi quiere limpiar el nombre de su primo y trae una gráfica de cobros: «Miren, todo en orden». Pero en una gráfica no hay flechas… ¿cómo se revisa?" }
        ]
      },
      {
        id: "p5",
        title: "La regla de Laura sobre la gráfica",
        minutes: 8,
        contexts: ["taxi", "camilo"],
        teacherKey: "Gráfica de Santi: en x = 2 toca 2 puntos, no es función. E (circunferencia): no. F (parábola): sí. G (Camilo): sí, las partes planas no importan. H (parábola acostada): no.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Aquí están los cobros del primo. Sin flechas no hay nada raro 😎" },
              { who: "Laura", avatar: LAURA, side: "me", text: "¿Ah, no? Préstame esa regla 📏" },
              { who: "Camilo", avatar: CAMILO, text: "¿Para qué, si no vas a medir?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "No voy a medir. La voy a poner de pie sobre la gráfica y a pasarla despacio." }
            ]
          },
          {
            type: "plane",
            title: "La gráfica de Santi",
            icon: "📏",
            text: "Mueve la regla de izquierda a derecha y mira cuántos puntos toca en cada lugar.",
            x: { name: "Distancia", unit: "km", min: 0, max: 6, step: 1 },
            y: { name: "Valor", unit: "$", min: 0, max: 14000, step: 2000 },
            description: "Recta de los cobros del taxi, con un punto de más en 2 kilómetros y 9.000 pesos",
            verticalProbe: true,
            marks: [[2, 7000], [2, 9000]],
            relation: function (x) { return x === 2 ? [7000, 9000] : [1500 * x + 4000]; }
          },
          {
            type: "quiz",
            title: "¿Qué encontró Laura?",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "En 2 km, la regla toca ___ puntos.", label: "Puntos que toca la regla en 2 kilómetros", answer: 2, hint: "Lleva la regla hasta 2 km y lee cuántos puntos toca.", explanation: "En 2 km hay dos puntos: $7.000 y $9.000. Son los recibos de Beto y Elisa." },
              { type: "choice", prompt: "Entonces, esa gráfica…", options: ["sí representa una función", "no representa una función"], answer: 1, hint: "¿Cuántas salidas tiene la entrada 2 km?", explanation: "La entrada 2 km tiene dos salidas, y una función da exactamente una. No es función." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Pásale la regla a estas gráficas",
            icon: "🧩",
            questions: [].concat(
              caseQuestions({
                type: "plane",
                title: "Caso E",
                text: "Mueve la recta vertical y mira cuántos puntos toca.",
                x: { name: "x", unit: "", min: -4, max: 4, step: 2 },
                y: AXIS,
                description: "Circunferencia centrada en el origen, de radio 3",
                verticalProbe: true,
                relation: function (x) {
                  if (Math.abs(x) > 3) return [];
                  var h = Math.sqrt(9 - x * x);
                  return [h, -h];
                }
              }, false, GRAPH_REASONS, 1, "En x = 0 la recta vertical toca dos puntos: y = 3 y y = −3. Una entrada con dos salidas: no es función."),
              caseQuestions({
                type: "plane",
                title: "Caso G: el camino de Camilo",
                text: "Fíjate qué pasa en las partes planas.",
                x: { name: "Tiempo", unit: "min", min: 0, max: 14, step: 2 },
                y: { name: "Distancia", unit: "m", min: 0, max: 1200, step: 200 },
                description: "Gráfica del camino de Camilo, con dos partes horizontales",
                verticalProbe: true,
                relation: function (x) { return [camiloWalk(x)]; }
              }, true, GRAPH_REASONS, 0, "Cada minuto tiene una sola distancia. En las partes planas, muchos minutos comparten la misma distancia, y eso sí se permite: es función.")
            )
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "**Criterio de la recta vertical (o regla vertical):** una gráfica representa una función si **ninguna recta vertical la corta en más de un punto**.\n\n**¿Por qué funciona?** Todos los puntos de una recta vertical tienen el mismo valor de x. Si la recta corta la gráfica en dos puntos, esa entrada x tiene dos salidas, y una función solo puede tener una.\n\nOjo: las rectas **horizontales** no cuentan. Una parte plana solo dice que varias entradas comparten la misma salida, y eso sí se permite."
          },
          { type: "bridge", text: "Pillado otra vez, el primo promete que nunca más cobrará distinto. Pero el curso tiene otro problema: sea cual sea el transporte, no tiene plata para pagarlo. A Camilo se le ocurre hacer una rifa." }
        ]
      },
      {
        id: "p6",
        title: "La rifa: ¿qué números son posibles?",
        minutes: 8,
        contexts: ["raffle"],
        teacherKey: "Boletas: 0, 35, 80. Dinero: $0 (0 boletas), $210.000 (35 boletas), $480.000 (80 boletas). Diagrama: de 1, 2, 3; a 2, 4, 6; no coinciden: 8 y 10 son de llegada, pero no del rango.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "Hagamos una rifa: 80 boletas a $6.000 cada una." },
              { who: "Valentina", avatar: VALENTINA, side: "me", text: "¿Y si vendemos 85? 🤑" },
              { who: "Laura", avatar: LAURA, text: "Imposible, solo hay 80. Y tampoco se puede vender media boleta." }
            ]
          },
          {
            type: "quiz",
            title: "Boletas y plata",
            icon: "🔍",
            text: "Piensa en la regla «boletas vendidas → dinero recogido».",
            questions: [
              { type: "multi", prompt: "¿Cuáles pueden ser la **cantidad de boletas vendidas**?", options: ["0", "35", "80", "85", "−3", "2,5"], answer: [0, 1, 2], hint: "Solo hay 80 boletas y no se venden pedazos.", explanation: "Hay 80 boletas y se venden enteras: valen 0, 35 y 80. No sirven 85 (son muchas), −3 ni 2,5." },
              { type: "multi", prompt: "¿Cuáles pueden ser el **dinero recogido**?", options: ["$0", "$210.000", "$7.000", "$480.000", "$500.000", "−$6.000"], answer: [0, 1, 3], hint: "¿Con cuántas boletas se junta esa cantidad? Tiene que dar un número exacto de boletas, máximo 80.", explanation: "$0 son 0 boletas, $210.000 son 35 y $480.000 son 80. $7.000 no da un número exacto de boletas, $500.000 pasa del máximo y no se recoge dinero negativo." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              {
                type: "multi",
                figure: diagram("Mira este diagrama", ["1", "2", "3"], ["2", "4", "6", "8", "10"], [[0, 0], [1, 1], [2, 2]]),
                prompt: "¿De qué elementos de A sale una flecha?",
                options: ["1", "2", "3"],
                answer: [0, 1, 2],
                hint: "Sigue cada flecha desde su inicio.", explanation: "Las tres flechas salen de 1, 2 y 3."
              },
              { type: "multi", prompt: "¿A qué elementos de B llega una flecha?", options: ["2", "4", "6", "8", "10"], answer: [0, 1, 2], hint: "Mira dónde termina cada flecha.", explanation: "Las flechas llegan a 2, 4 y 6." },
              { type: "choice", prompt: "¿Todos los elementos de B reciben una flecha?", options: ["Sí", "No"], answer: 1, hint: "Compara tu respuesta anterior con la lista completa de B.", explanation: "A 8 y a 10 no les llega ninguna flecha. Son del conjunto de llegada, pero no del rango." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "- **Dominio, Dom(f):** conjunto de todos los valores que puede tomar la variable independiente. En la rifa: 0, 1, 2, …, 80 boletas.\n- **Rango (o recorrido), Rec(f):** conjunto de todos los valores que toma la variable dependiente. En la rifa: 0, 6.000, 12.000, …, 480.000 pesos.\n- **Imagen y preimagen:** si f(a) = b, entonces b es la **imagen** de a, y a es una **preimagen** de b. En la rifa, f(35) = 210.000: 210.000 es la imagen de 35.\n\nCuidado: el **conjunto de llegada** puede tener elementos a los que no llega ninguna flecha. El rango solo incluye los que sí reciben flecha."
          },
          { type: "bridge", text: "Con la rifa en marcha, solo falta una cosa para cerrar el día." }
        ]
      },
      {
        id: "p7",
        title: "La profe anula la votación",
        minutes: 5,
        contexts: ["votes", "camilo", "trip"],
        teacherKey: "Preguntas orales. La gráfica de Camilo sí es función: cada minuto tiene una sola distancia.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Profe", avatar: "👩🏽‍🏫", text: "Con esta planilla no se puede contar nada: votos dobles, gente sin votar… Votación anulada." },
              { who: "Santi", avatar: SANTI, text: "¿¡Qué!? ¿Y entonces?" },
              { who: "Profe", avatar: "👩🏽‍🏫", text: "Se vota al final, cuando todos tengan claros los precios. Con pruebas, no con gritos." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Por fin 🙌" }
            ]
          },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- Con tus palabras: ¿qué es una función? Da un ejemplo y uno que no lo sea.\n- Para que la votación sea una función, ¿qué tendrían que hacer Carla y Diego?\n- En la gráfica de Camilo, para cada minuto, ¿hay una sola distancia? ¿Esa gráfica es una función?\n- ¿Qué fue lo más fácil y lo más difícil de hoy?"
          },
          { type: "mission", id: "trip", hintsUpTo: 2 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "Planilla: 4 opciones y 5 parejas. Doble: 1→2, 2→4, 3→6, 4→8; al 10 no llega ninguna. Caso B: sí. Caso D: no. Caso F: sí. Caso H: no.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          { type: "box", title: "La planilla de la fila 2", icon: "📋", text: "Podían votar Ana, Beto, Carla, Diego y Elisa. Las opciones eran Taxi, Buseta, Bus público y A pie.\n\n- Ana: Taxi\n- Beto: Taxi\n- Carla: Buseta\n- Carla: Bus público\n- Elisa: Bus público" },
          {
            type: "quiz",
            title: "Cuenta en la planilla",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Hay ___ opciones de transporte.", label: "Cantidad de opciones", answer: 4, hint: "Cuéntalas en la primera línea.", explanation: "Taxi, Buseta, Bus público y A pie: son 4." },
              { type: "numeric", prompt: "En la lista hay ___ parejas «estudiante – opción».", label: "Cantidad de parejas", answer: 5, hint: "Cuenta los renglones de la lista.", explanation: "La planilla tiene 5 renglones, y cada renglón es una pareja." }
            ]
          },
          {
            type: "sagittal",
            mode: "build",
            title: "Otra relación, con palabras",
            icon: "✏️",
            text: "«Cada número se relaciona con su **doble**.»",
            left: { title: "A", items: ["1", "2", "3", "4"] },
            right: { title: "B", items: ["2", "4", "6", "8", "10"] },
            solution: [[0, 0], [1, 1], [2, 2], [3, 3]],
            hint: "¿Cuánto es el doble de cada número de A?", explanation: "El doble de 1 es 2, de 2 es 4, de 3 es 6 y de 4 es 8. Al 10 no le llega ninguna flecha."
          },
          {
            type: "quiz",
            title: "Sobre esas flechas",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "En la relación del doble, al número ___ de B no le llega ninguna flecha.", label: "Número de B sin flecha", answer: 10, hint: "Revisa cada número de B.", explanation: "A 2, 4, 6 y 8 llega una flecha. Al 10 no llega ninguna." }
            ]
          },
          {
            type: "quiz",
            title: "Más casos: ¿es función?",
            icon: "🧩",
            questions: [].concat(
              caseQuestions(diagram("Caso B", ["1", "2", "3"], ["5"], [[0, 0], [1, 0], [2, 0]]), true, REASONS, 3, "De cada elemento sale una sola flecha, aunque todas lleguen al 5. Varias entradas pueden tener la misma salida: es función."),
              caseQuestions(diagram("Caso D", ["1", "2", "3"], ["3", "4", "5"], [[0, 0], [1, 1]]), false, REASONS, 2, "Del 3 no sale ninguna flecha: una entrada sin salida. No es función."),
              caseQuestions({
                type: "plane",
                title: "Caso F",
                text: "Mueve la recta vertical y mira cuántos puntos toca.",
                x: { name: "x", unit: "", min: -2, max: 2, step: 1 },
                y: { name: "y", unit: "", min: 0, max: 4, step: 1 },
                description: "Curva y igual a x al cuadrado, entre menos 2 y 2",
                verticalProbe: true,
                relation: function (x) { return [x * x]; }
              }, true, GRAPH_REASONS, 0, "Donde pongas la recta vertical, toca un solo punto. Que x = 1 y x = −1 den el mismo y no importa: es función."),
              caseQuestions({
                type: "plane",
                title: "Caso H",
                text: "Mueve la recta vertical y mira cuántos puntos toca.",
                x: { name: "x", unit: "", min: -1, max: 4, step: 1 },
                y: { name: "y", unit: "", min: -3, max: 3, step: 1 },
                description: "Parábola acostada, abierta hacia la derecha",
                verticalProbe: true,
                relation: function (x) {
                  if (x < 0) return [];
                  var h = Math.sqrt(x);
                  return [h, -h];
                }
              }, false, GRAPH_REASONS, 1, "En x = 1 la recta vertical toca dos puntos: y = 1 y y = −1. Una entrada con dos salidas: no es función.")
            )
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
              { term: "Relación", definition: "Correspondencia entre los elementos de dos conjuntos." },
              { term: "Conjunto de partida y de llegada", definition: "De donde salen y a donde llegan las correspondencias." },
              { term: "Par ordenado", definition: "Pareja (a, b) con a en el conjunto de partida y b en el de llegada." },
              { term: "Diagrama sagital", definition: "Representa una relación con dos conjuntos y flechas." },
              { term: "Función", definition: "Relación en la que a cada elemento de partida le corresponde exactamente un elemento de llegada." },
              { term: "Criterio de la recta vertical", definition: "Una gráfica representa una función si ninguna recta vertical la corta en más de un punto." },
              { term: "Notación f(x)", definition: "f(3) = 8 significa que a la entrada 3 le corresponde la salida 8." },
              { term: "Dominio", definition: "Todos los valores que puede tomar la variable independiente." },
              { term: "Rango (o recorrido)", definition: "Todos los valores que toma la variable dependiente." },
              { term: "Imagen y preimagen", definition: "Si f(a) = b, b es la imagen de a, y a es una preimagen de b." }
            ]
          },
          { type: "bridge", text: "Ahora la pelea cambia: para ganar la votación final hay que mostrar precios claros. Pasan los 8 días y Valentina gana la apuesta: Santi tiene que oír los precios de la buseta… pero cada bando los muestra a su manera." }
        ]
      }
    ]
  };
})();
