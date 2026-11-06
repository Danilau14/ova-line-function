/* Session 5: content only. Sources: ASF Act. 48, 49, 59–61, 66, 67 · TXT8 Afín Ej. 1–3 · MAT8 L25, L26. Interactive labs: own content. */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾";
  var KM = { name: "Distancia", unit: "km", min: 0, max: 10, step: 2 };
  var LAB_X = { name: "x", unit: "", min: -4, max: 4, step: 2 };
  var LAB_Y = { name: "y", unit: "", min: -8, max: 8, step: 4 };
  var LINEAR_OR_AFFINE = ["Lineal", "Afín"];
  function linePlot(description, m, b) {
    return {
      type: "plane",
      x: { name: "x", unit: "", min: -4, max: 4, step: 2 },
      y: { name: "y", unit: "", min: -6, max: 8, step: 2 },
      description: description,
      relation: function (x) { return [m * x + b]; }
    };
  }
  var LAB_CONTROLS = {
    m: { label: "m", min: -3, max: 3, step: 1 },
    b: { label: "b", min: -6, max: 6, step: 1 }
  };

  OVA.data.session5 = {
    title: "El intercepto: ¿desde dónde arranca?",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "¡Llegó una oferta!",
        minutes: 8,
        contexts: ["offer", "taxi"],
        teacherKey: "$4.000 · $2.000 · $13.000 y $11.000. Siempre $2.000 de diferencia: las rectas son paralelas.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "El primo quiso cobrar $2.000 por km, pero el curso le mostró la gráfica y se echó para atrás: sigue en $1.500. Santi quiere recuperar votos para la votación final y hoy llega feliz con otra noticia." },
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "¡Oferta! Mi primo baja lo que cobra al subirse: de $4.000 a $2.000 🎉" },
              { who: "Laura", avatar: LAURA, side: "me", text: "¿Y lo del km?" },
              { who: "Santi", avatar: SANTI, text: "Igualito: $1.500." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Mmm. Vamos a ver qué tan buena es." }
            ]
          },
          {
            type: "line-lab",
            title: "El precio normal y la oferta",
            icon: "📈",
            text: "La línea continua es el precio normal; la punteada, la oferta.",
            x: KM,
            y: { name: "Valor", unit: "$", min: 0, max: 20000, step: 5000 },
            lines: [{ name: "Normal", m: 1500, b: 4000 }, { name: "Oferta", m: 1500, b: 2000 }],
            probe: { initial: 0, step: 1 }
          },
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Con 0 km, el precio normal es $___", label: "Precio normal con 0 kilómetros", answer: 4000, hint: "Lleva el punto a 0 km.", explanation: "Con 0 km solo se paga lo de subirse: $4.000." },
              { type: "numeric", prompt: "Con 0 km, la oferta es $___", label: "Oferta con 0 kilómetros", answer: 2000, hint: "Mira la coordenada de la línea punteada.", explanation: "Con 0 km solo se paga lo de subirse: $2.000." },
              { type: "numeric", prompt: "Con 6 km, el precio normal es $___", label: "Precio normal con 6 kilómetros", answer: 13000, hint: "Mueve el punto hasta 6 km.", explanation: "1.500 × 6 + 4.000 = 13.000." },
              { type: "numeric", prompt: "Con 6 km, la oferta es $___", label: "Oferta con 6 kilómetros", answer: 11000, hint: "Mira la coordenada de la línea punteada.", explanation: "1.500 × 6 + 2.000 = 11.000." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "¿Cuánto se ahorra con la oferta en un viaje largo?", options: ["Más entre más largo", "Siempre lo mismo: $2.000", "Nada"], answer: 1, hint: "Compara la diferencia a los 0 km y a los 10 km.", explanation: "Lo del km es igual en las dos, así que la diferencia siempre es la de subirse: 4.000 − 2.000 = $2.000." },
              { type: "choice", prompt: "Las dos rectas son…", options: ["paralelas: nunca se cruzan", "iguales", "de distinta inclinación"], answer: 0, hint: "¿Tienen la misma pendiente?", explanation: "Tienen la misma pendiente, 1.500, y arrancan en puntos distintos: son paralelas y nunca se cruzan." }
            ]
          },
          { type: "bridge", text: "Laura quiere saber qué pasa con cualquier oferta. Otra vez le quita el celular a Santi." }
        ]
      },
      {
        id: "p2",
        title: "¿Y si la oferta fuera otra?",
        minutes: 10,
        contexts: ["offer", "taxi", "valentina"],
        teacherKey: "Sube o baja sin cambiar la inclinación. Corta en $6.000. b = 4.000. La recta de Valentina (f(x) = 6x) pasa por el origen: b = 0.",
        blocks: [
          {
            type: "line-lab",
            title: "Mueve lo que cobran al subirse",
            icon: "🎚️",
            text: "Lo del km no cambia. Mira qué le pasa a la recta.",
            x: KM,
            y: { name: "Valor", unit: "$", min: 0, max: 30000, step: 5000 },
            lines: [{ name: "Taxi", m: 1500, b: 4000, controls: { b: { label: "Cobro al subirse ($)", min: 0, max: 10000, step: 1000 } } }]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Si cambias lo que cobran al subirse, la recta…", options: ["se vuelve más inclinada", "sube o baja sin cambiar su inclinación", "se vuelve curva"], answer: 1, hint: "Mueve el control y fíjate en la inclinación.", explanation: "Cambiar ese cobro mueve toda la recta hacia arriba o hacia abajo. La inclinación depende de lo que cobran por km, y eso no cambió." },
              { type: "numeric", prompt: "Si cobran $6.000 al subirse, la recta corta el eje vertical en $___", label: "Corte con el eje vertical", answer: 6000, hint: "Mira dónde empieza la recta, en 0 km.", explanation: "Con 0 km se paga solo lo de subirse: la recta corta el eje en 6.000." },
              { type: "numeric", prompt: "En f(x) = 1.500x + 4.000, el número que dice dónde arranca la recta es ___", label: "Número que dice dónde arranca", answer: 4000, hint: "Es el que no acompaña a la x.", explanation: "Cuando x = 0, f(0) = 1.500 · 0 + 4.000 = 4.000." },
              { type: "numeric", prompt: "La regla de Valentina es f(x) = 6x. Su recta arranca en ___", label: "Dónde arranca la recta de Valentina", answer: 0, hint: "¿Cuánto vale f(0)?", explanation: "f(0) = 6 · 0 = 0: arranca en el origen." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "El número b se llama **intercepto** (o **coeficiente de posición**), porque indica dónde la recta **intercepta**, es decir, corta, el eje vertical: en el punto **(0, b)**, ya que f(0) = b.\n\n**¿Para qué sirve?** Dice el valor inicial, cuando x = 0: lo que se paga antes de recorrer un solo kilómetro. Y decide el tipo de función:\n\n- Si **b = 0**, la recta pasa por el origen: es una **función lineal**, como la de Valentina.\n- Si **b no es 0**, no pasa por el origen: es una **función afín**, como el taxi.\n\nAsí, **m** determina la inclinación de la recta y **b**, dónde corta el eje vertical."
          },
          {
            type: "quiz",
            title: "¿Lineal o afín? Míralo en la gráfica",
            icon: "🔍",
            text: "Fíjate si la recta pasa por el origen (0, 0).",
            questions: [
              { type: "choice", figure: linePlot("Recta que pasa por el origen, con pendiente 2", 2, 0), prompt: "Esta función es…", options: LINEAR_OR_AFFINE, answer: 0, hint: "¿La recta pasa por (0, 0)?", explanation: "Pasa por (0, 0), así que b = 0: es lineal." },
              { type: "choice", figure: linePlot("Recta que corta el eje vertical en 3, con pendiente 2", 2, 3), prompt: "Esta función es…", options: LINEAR_OR_AFFINE, answer: 1, hint: "¿La recta pasa por (0, 0)?", explanation: "Corta el eje vertical en 3, no en el origen: es afín." }
            ]
          },
          { type: "bridge", text: "Camilo ya quiere mover los dos números a la vez: el de la pendiente y el del intercepto. Laura le pasa el celular." }
        ]
      },
      {
        id: "joint",
        title: "m y b al mismo tiempo",
        minutes: 10,
        contexts: [],
        teacherKey: "m: más inclinada; al volverse negativa baja; con 0 es horizontal; b: sube sin cambiar inclinación; negativo: corta debajo del origen; mover m no cambia el corte.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, side: "me", text: "¿Y si el primo sale con otra oferta y cambia los dos precios a la vez?" },
              { who: "Camilo", avatar: CAMILO, text: "Déjame probar a mí qué le pasa a la recta 🕹️" }
            ]
          },
          {
            type: "line-lab",
            title: "Mueve m y b",
            icon: "🎚️",
            text: "La línea punteada es f(x) = x, para que compares. Prueba: m más grande, m negativa, m en 0, b positivo y b negativo.",
            x: LAB_X,
            y: LAB_Y,
            lines: [
              { name: "Tu recta", m: 1, b: 2, controls: LAB_CONTROLS },
              { name: "Referencia", m: 1, b: 0 }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "¿Qué descubriste?",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Si **aumentas** m (positiva), la recta…", options: ["queda más inclinada", "sube sin inclinarse más", "queda horizontal"], answer: 0, hint: "Lleva m de 1 a 3 y mira.", explanation: "Con m mayor, y cambia más por cada unidad de x: la recta queda más inclinada." },
              { type: "choice", prompt: "Si **vuelves negativa** m, la recta…", options: ["sube más rápido", "pasa a bajar de izquierda a derecha", "desaparece"], answer: 1, hint: "Lleva m a −2 y mira.", explanation: "Con m negativa, y disminuye cuando x aumenta: la recta baja." },
              { type: "choice", prompt: "Si **aumentas** b, la recta…", options: ["se inclina más", "sube sin cambiar su inclinación", "pasa por el origen"], answer: 1, hint: "Deja m quieta y mueve b.", explanation: "b solo cambia dónde corta el eje vertical: la recta sube y conserva su inclinación." },
              { type: "choice", prompt: "Si **vuelves negativo** b, la recta…", options: ["corta el eje vertical por debajo del origen", "pasa a bajar", "queda horizontal"], answer: 0, hint: "Lleva b a −3 y mira dónde cruza el eje vertical.", explanation: "Corta en (0, b), y con b negativo ese punto queda debajo del origen. Eso no hace que baje: de eso se encarga m." },
              { type: "choice", prompt: "Si mueves **solo m**, el punto donde corta el eje vertical…", options: ["cambia", "no cambia"], answer: 1, hint: "Fíjate en el corte mientras mueves m.", explanation: "Ese punto es (0, b), y b no cambió: la recta gira alrededor de él." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "**Efecto de cada parámetro en f(x) = mx + b:**\n\n- **Aumentar m (positiva):** más inclinada. **Disminuirla hacia 0:** menos inclinada.\n- **m negativa:** la recta baja. **m = 0:** horizontal.\n- **Aumentar b:** la recta sube. **Disminuir b:** la recta baja. **b negativo:** corta debajo del origen.\n\nm hace **girar** la recta alrededor de (0, b); b la **desplaza** sin cambiar su inclinación."
          },
          { type: "bridge", text: "«Si es tan fácil, entonces léeme estas», reta Laura, y le pone a Santi varias reglas al frente." }
        ]
      },
      {
        id: "p3",
        title: "Laura pone a prueba a Santi",
        minutes: 13,
        contexts: [],
        teacherKey: "3 y 2 · −2 y 5 · 1 y −4 · 6 y 0. En la gráfica: b = 1, m = 2. Retos: f(x) = 2x + 1 y f(x) = −x + 3.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, side: "me", text: "Santi, si de verdad entendiste, léeme m y b en estas reglas. Sin taxi y sin ayuda." },
              { who: "Santi", avatar: SANTI, text: "Eso es facilito 😎" },
              { who: "Camilo", avatar: CAMILO, text: "Ayudémosle, por si acaso." }
            ]
          },
          {
            type: "quiz",
            title: "Lee m y b en la regla",
            icon: "🔍",
            questions: [
              { type: "numeric", signed: true, prompt: "En f(x) = 3x + 2, m = ___", label: "m en 3x más 2", answer: 3, hint: "Es el número que acompaña a la x.", explanation: "El número que acompaña a la x es 3." },
              { type: "numeric", signed: true, prompt: "En f(x) = −2x + 5, m = ___", label: "m en menos 2x más 5", answer: -2, hint: "No olvides el signo.", explanation: "El número que acompaña a la x, con su signo, es −2." },
              { type: "numeric", signed: true, prompt: "En f(x) = x − 4, b = ___", label: "b en x menos 4", answer: -4, hint: "No olvides el signo.", explanation: "El número que va solo, con su signo, es −4." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Lee m y b en la gráfica",
            icon: "🧩",
            questions: [
              {
                type: "numeric",
                signed: true,
                figure: {
                  type: "plane",
                  x: { name: "x", unit: "", min: -3, max: 3, step: 1 },
                  y: { name: "y", unit: "", min: -4, max: 6, step: 2 },
                  description: "Recta que pasa por (0, 1) y (1, 3)",
                  relation: function (x) { return [2 * x + 1]; }
                },
                prompt: "Esta recta corta el eje vertical en b = ___",
                label: "Intercepto de la recta",
                answer: 1,
                hint: "Mira dónde cruza la línea vertical del 0.", explanation: "La recta cruza el eje vertical en y = 1, es decir, en el punto (0, 1)."
              }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            title: "Calcula la pendiente de esa misma recta",
            icon: "🧮",
            text: "Usa los puntos (0, 1) y (1, 3) de la gráfica anterior.",
            x: { name: "x", unit: "", min: -3, max: 3, step: 1 },
            y: { name: "y", unit: "", min: -4, max: 6, step: 2 },
            points: [[0, 1], [1, 3]],
            hint: "Arriba van las y: 3 − 1. Abajo van las x: 1 − 0.",
            explanation: "m = [[3 − 1|1 − 0]] = [[2|1]] = 2. Por cada 1 que aumenta x, y sube 2."
          },
          {
            type: "line-lab",
            title: "Reto: construye f(x) = 2x + 1",
            icon: "🎯",
            text: "Mueve m y b hasta que tu recta sea esta.",
            x: LAB_X,
            y: LAB_Y,
            lines: [{ name: "Tu recta", m: 0, b: 0, controls: LAB_CONTROLS }],
            target: { m: 2, b: 1 },
            hint: "Primero ubica dónde arranca con b y después inclínala con m.", explanation: "En f(x) = 2x + 1, m = 2 y b = 1: arranca en (0, 1) y por cada 1 en x sube 2."
          },
          { type: "bridge", text: "Camilo mira las rectas que han aparecido: la del alza del primo, la de la oferta… «Algunas se parecen, ¿no? Son como familia». Y tiene razón." }
        ]
      },
      {
        id: "p4",
        title: "Las familias de rectas",
        minutes: 8,
        contexts: [],
        teacherKey: "Misma inclinación: 2x + 1, 2x − 3, 2x. Mismo punto de partida: x + 2, 3x + 2, −x + 2. Oferta: mismo m (paralelas). Alza del primo: mismo b (abanico).",
        blocks: [
          {
            type: "box",
            title: "Ya las viste en la historia",
            icon: "📖",
            text: "- **La oferta del primo:** bajó lo de subirse, de $4.000 a $2.000, y dejó igual los $1.500 por km. Las dos rectas tenían la **misma m**.\n- **El alza del primo:** subió de $1.500 a $2.000 por km, y dejó igual los $4.000 de subirse. Las dos rectas tenían la **misma b**."
          },
          {
            type: "line-lab",
            title: "Compara dos rectas",
            icon: "👀",
            text: "La punteada es fija. Primero iguala m (como en la oferta) y mueve b. Después iguala b (como en el alza) y mueve m.",
            x: LAB_X,
            y: LAB_Y,
            lines: [
              { name: "Tu recta", m: 1, b: 1, controls: LAB_CONTROLS },
              { name: "Fija", m: 2, b: -1 }
            ]
          },
          {
            type: "classify",
            title: "¿A qué familia pertenece?",
            icon: "🎮",
            hint: "Fíjate en un solo número: el que acompaña a la x o el que va solo.", explanation: "Las que tienen 2x comparten m = 2. Las que terminan en + 2 comparten b = 2.",
            cards: [
              { id: "p1", text: "f(x) = 2x + 1" },
              { id: "p2", text: "f(x) = 2x − 3" },
              { id: "p3", text: "f(x) = 2x" },
              { id: "b1", text: "f(x) = x + 2" },
              { id: "b2", text: "f(x) = 3x + 2" },
              { id: "b3", text: "f(x) = −x + 2" }
            ],
            bins: [
              { id: "par", title: "Misma inclinación (m = 2)" },
              { id: "beam", title: "Mismo punto de partida (b = 2)" }
            ],
            solution: { p1: "par", p2: "par", p3: "par", b1: "beam", b2: "beam", b3: "beam" }
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una **familia de funciones** es un grupo de funciones de la forma f(x) = mx + b que comparten el valor de m o el de b.\n\n- **Misma pendiente, distinto intercepto:** las rectas son **paralelas**; nunca se cortan. Como el precio normal y la oferta.\n- **Mismo intercepto, distinta pendiente:** todas las rectas pasan por el punto (0, b) y se abren como un **abanico**. Como la tarifa de hoy y el alza del primo."
          },
          { type: "bridge", text: "Mientras tanto, Laura leyó la letra pequeña de la oferta." }
        ]
      },
      {
        id: "p5",
        title: "La letra pequeña",
        minutes: 6,
        contexts: ["offer", "taxi", "trip"],
        teacherKey: "Preguntas orales. La salida es un martes: la oferta no aplica y el taxi sigue en f(x) = 1.500x + 4.000.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, side: "me", text: "«Oferta válida solo fines de semana.» ¿Qué día es la salida?" },
              { who: "Camilo", avatar: CAMILO, text: "…Un martes 😬" },
              { who: "Santi", avatar: SANTI, text: "Yo no sabía, ¡lo juro!" },
              { who: "Valentina", avatar: VALENTINA, text: "Ajá. Entonces mañana votamos con los precios reales 😌" }
            ]
          },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- En el taxi, ¿qué significan m y b? ¿Y en la buseta?\n- Si una oferta baja b, ¿qué le pasa a la recta? ¿Y si baja m?\n- ¿Qué fue lo más fácil y lo más difícil de hoy?"
          },
          { type: "mission", id: "trip", hintsUpTo: 5 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "b en 3x + 2: 2 · b en −2x + 5: 5 · m en x − 4: 1 · b en 6x: 0. Gráficas: lineal, afín. Reto: m = −1, b = 3.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          {
            type: "quiz",
            title: "Lee m y b",
            icon: "🔍",
            questions: [
              { type: "numeric", signed: true, prompt: "En f(x) = 3x + 2, b = ___", label: "b en 3x más 2", answer: 2, hint: "Es el número que va solo.", explanation: "El número que va solo es 2." },
              { type: "numeric", signed: true, prompt: "En f(x) = −2x + 5, b = ___", label: "b en menos 2x más 5", answer: 5, hint: "Es el número que va solo.", explanation: "El número que va solo es 5." },
              { type: "numeric", signed: true, prompt: "En f(x) = x − 4, m = ___", label: "m en x menos 4", answer: 1, hint: "Si no se ve ningún número, es porque la x está una vez.", explanation: "x es lo mismo que 1 · x, así que m = 1." },
              { type: "numeric", signed: true, prompt: "En f(x) = 6x, b = ___", label: "b en 6x", answer: 0, hint: "¿Se le está sumando algo?", explanation: "No se le suma nada: f(x) = 6x + 0, así que b = 0." }
            ]
          },
          {
            type: "quiz",
            title: "¿Lineal o afín?",
            icon: "🔍",
            text: "Fíjate si la recta pasa por el origen (0, 0).",
            questions: [
              { type: "choice", figure: linePlot("Recta que pasa por el origen, con pendiente menos 1", -1, 0), prompt: "Esta función es…", options: LINEAR_OR_AFFINE, answer: 0, hint: "Aunque baje, ¿pasa por (0, 0)?", explanation: "Baja, pero pasa por (0, 0): es lineal. El signo de m no decide si es lineal o afín." },
              { type: "choice", figure: linePlot("Recta que corta el eje vertical en menos 2, con pendiente menos 1", -1, -2), prompt: "Esta función es…", options: LINEAR_OR_AFFINE, answer: 1, hint: "¿Dónde corta el eje vertical?", explanation: "Corta el eje vertical en −2, no en el origen: es afín." }
            ]
          },
          {
            type: "line-lab",
            title: "Reto: construye f(x) = −x + 3",
            icon: "🎯",
            x: LAB_X,
            y: LAB_Y,
            lines: [{ name: "Tu recta", m: 0, b: 0, controls: LAB_CONTROLS }],
            target: { m: -1, b: 3 },
            hint: "¿Esta recta sube o baja? Eso te dice el signo de m.", explanation: "En f(x) = −x + 3, m = −1 y b = 3: arranca en (0, 3) y por cada 1 en x baja 1."
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
              { term: "Intercepto (o coeficiente de posición)", definition: "El número b: la recta corta el eje vertical en (0, b). Es el valor inicial, cuando x = 0." },
              { term: "Lineal o afín según b", definition: "Si b = 0, la función es lineal; si b no es 0, es afín." },
              { term: "Efecto de m", definition: "Cambia la inclinación de la recta." },
              { term: "Efecto de b", definition: "Sube o baja la recta sin cambiar su inclinación." },
              { term: "Rectas paralelas", definition: "Misma pendiente y distinto intercepto: nunca se cortan." },
              { term: "Abanico", definition: "Mismo intercepto y distinta pendiente: todas pasan por (0, b)." }
            ]
          },
          { type: "bridge", text: "Mañana es la votación final. Lleva todas tus pistas." }
        ]
      }
    ]
  };
})();
