/* Session 1: content only. Sources: ASF Act. 37, 39, 41–43 · TXT8 Ej. 2, 5 · MAT8 L23. To add a page, add an object to "pages". */
(function () {
  var CAMILO = {
    x: { name: "Tiempo", unit: "min", min: 0, max: 14, step: 2 },
    y: { name: "Distancia", unit: "m", min: 0, max: 1200, step: 200 },
    points: [[0, 0], [4, 400], [7, 400], [10, 1000], [14, 1000]]
  };
  var COFFEE = {
    x: { name: "Tiempo", unit: "min", min: 0, max: 30, step: 5, readStep: 5 },
    y: { name: "Temperatura", unit: "°C", min: 0, max: 100, step: 10 },
    points: [[0, 90], [5, 65], [10, 50], [15, 42], [20, 37], [25, 34], [30, 32]],
    curve: true
  };
  var VALENTINA = {
    x: { name: "Tiempo", unit: "días", min: 0, max: 5, step: 1 },
    y: { name: "Distancia", unit: "km", min: 0, max: 30, step: 6 },
    points: [[0, 0], [1, 6], [2, 12], [3, 18], [4, 24], [5, 30]]
  };
  var CAMILO_AVATAR = "🧑🏽", LAURA_AVATAR = "👩🏻", SANTI_AVATAR = "🧑🏻", VALENTINA_AVATAR = "👧🏾";

  function chart(base, extra) { return Object.assign({ type: "chart" }, base, extra); }

  OVA.data.session1 = {
    title: "Variables, gráficas y cambio",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "¿Por qué Camilo casi llega tarde?",
        minutes: 9,
        contexts: ["camilo", "trip", "taxi", "valentina", "minibus"],
        teacherKey: "Lectura rápida: a) 200 · b) 10 · c) 3 · d) 800. Ahora piensa: se quedó quieto; línea horizontal; más inclinada.",
        blocks: [
          { type: "box", title: "Lo que está pasando", icon: "📖", text: "El curso planea una salida. Hoy, a las 6:40, votaban cómo ir: en el **taxi** del primo de Santi o en la **buseta** del tío de Valentina. La votación quedó **empatada** y faltaba un solo voto: el de Camilo, que entró tarde." },
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA_AVATAR, text: "Camilo, ¡faltaba solo tu voto y entraste a las 6:44! Quedamos empatados 😤" },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Es que salí a las 6:30 y venía lejos…" },
              { who: "Laura", avatar: LAURA_AVATAR, text: "Ajá. Mándame la gráfica de tu app de pasos." },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Ehhh… bueno 😬" }
            ]
          },
          { type: "box", title: "Antes de mirar", icon: "🤔", text: "¿Crees que Camilo dice la verdad? ¿Cuántas veces paró? Hagan su apuesta en voz alta; la gráfica lo va a delatar." },
          chart(CAMILO, { mode: "read", title: "La gráfica de Camilo", icon: "📈", initial: 7 }),
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "A los 2 minutos, Camilo estaba a ___ m de su casa.", label: "Distancia a los 2 minutos, en metros", answer: 200, hint: "Ubica el 2 en la línea de abajo, sube hasta tocar la gráfica y mira a qué altura quedaste.", explanation: "Del minuto 0 al 4 avanza 400 m, así que a la mitad, en el minuto 2, lleva 200 m." },
              { type: "numeric", prompt: "Llegó a 1.000 m en el minuto ___", label: "Minuto en que llegó a 1.000 metros", answer: 10, hint: "Busca el 1.000 a la izquierda, ve a la derecha hasta la gráfica y baja hasta los minutos.", explanation: "Desde el 1.000 de la izquierda vas hasta la línea: la toca justo encima del minuto 10." },
              { type: "numeric", prompt: "Su primera parada duró ___ min.", label: "Duración de la primera parada, en minutos", answer: 3, hint: "Mira dónde empieza y dónde termina la primera parte plana. ¿Cuántos minutos hay entre esos dos momentos?", explanation: "La primera parte plana va del minuto 4 al minuto 7: 7 − 4 = 3 minutos." },
              { type: "numeric", prompt: "A los 9 minutos estaba a ___ m.", label: "Distancia a los 9 minutos, en metros", answer: 800, hint: "El 9 no tiene rayita propia: mueve el punto hasta 9 minutos y mira las coordenadas.", explanation: "Del minuto 7 al 10 avanza 600 m, o sea 200 m por minuto. En el minuto 9 lleva 400 + 200 + 200 = 800 m." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Entre los minutos 10 y 14, Camilo…", options: ["siguió caminando", "se quedó quieto", "se devolvió"], answer: 1, hint: "Mira las coordenadas en esos minutos: ¿cambió la distancia?", explanation: "En esos minutos la línea es horizontal: la distancia sigue en 1.000 m. Se quedó quieto." },
              { type: "choice", prompt: "En la gráfica, una parada se ve como…", options: ["una línea que sube", "una línea horizontal", "un solo punto"], answer: 1, hint: "Mientras Camilo está quieto, el tiempo sigue pasando, pero ¿la distancia cambia?", explanation: "En una parada el tiempo avanza, pero la distancia no cambia. Por eso la línea va a la derecha sin subir: es horizontal." },
              { type: "choice", prompt: "Si entre los minutos 0 y 4 Camilo hubiera ido **corriendo** en vez de caminando, su línea en esa parte habría quedado…", options: ["más inclinada", "menos inclinada", "igual"], answer: 0, hint: "Corriendo, en los mismos 4 minutos habría llegado más lejos. ¿Qué tan arriba terminaría la línea?", explanation: "Corriendo recorre más metros en los mismos 4 minutos, así que la línea termina más arriba: queda más inclinada." }
            ]
          },
          { type: "box", title: "En grupo", icon: "🗣️", text: "¿Acertaron su apuesta? A los 10 minutos Camilo ya iba en 1.000 m y ahí se quedó. ¿Qué creen que estaba haciendo?" },
          { type: "box", variant: "naming", title: "Concepto clave", icon: "🧠", text: "Una **magnitud** es una propiedad que se puede medir y expresar con un número y una unidad, como el tiempo (min) o la distancia (m).\n\nUna **gráfica** muestra en el plano cartesiano cómo cambia una magnitud respecto a otra. Cuando una parte es una **línea horizontal**, la magnitud del eje vertical no está cambiando: por eso así se ve una parada." },
          { type: "mission", id: "trip", hintsUpTo: 0 },
          { type: "bridge", text: "Laura averigua la verdad: a los 10 minutos Camilo ya estaba en la puerta, hablando con Santi. ¿Qué tenían que cuadrar justo antes de votar? Cuando los enfrenta, Santi le sale con un cuento raro…" }
        ]
      },
      {
        id: "p2",
        title: "¿Quién depende de quién?",
        minutes: 9,
        contexts: ["camilo", "taxi"],
        teacherKey: "Ponlos a prueba: sí / no / Laura. Clasificar: se elige o avanza = gasolina, carga, panes, km; se calcula = total pagado por la gasolina, batería, total pagado en la panadería, valor de la carrera.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA_AVATAR, side: "me", text: "¡Los pillé! ¿Qué cuadraban en la puerta justo antes de votar?" },
              { who: "Santi", avatar: SANTI_AVATAR, text: "Nada… Camilo se demoró y ya: el tiempo depende de la distancia. Si camina más, pasa más tiempo." },
              { who: "Laura", avatar: LAURA_AVATAR, side: "me", text: "Me cambias el tema. Y además, yo creo que es al revés." },
              { who: "Santi", avatar: SANTI_AVATAR, text: "¿Y cómo lo comprobamos?" }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ponlos a prueba",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Si Camilo hubiera ido más rápido, ¿habría cambiado la **distancia** a los 4 minutos?", options: ["Sí", "No"], answer: 0, hint: "Más rápido, en el mismo tiempo: ¿llegaría al mismo sitio?", explanation: "Más rápido, en 4 minutos llega más lejos: la distancia sí cambia." },
              { type: "choice", prompt: "¿Habría cambiado la hora que marca el **reloj** a los 4 minutos?", options: ["Sí", "No"], answer: 1, hint: "¿El reloj se adelanta porque alguien camine más rápido?", explanation: "El reloj avanza igual, sin importar lo que haga Camilo: a los 4 minutos son 4 minutos." },
              { type: "choice", prompt: "Entonces, ¿quién tiene razón?", options: ["Santi", "Laura", "Los dos"], answer: 1, hint: "Revisa tus dos respuestas de arriba: ¿cuál de las dos cosas cambió según lo que hizo Camilo?", explanation: "La distancia cambió según lo que hizo Camilo, pero el tiempo no. La distancia depende del tiempo: Laura tiene razón." }
            ]
          },
          {
            type: "classify",
            title: "Arrastra y clasifica",
            icon: "🎮",
            hint: "Pregúntate en cada pareja: ¿cuál de las dos decides primero, y cuál sale como resultado?", explanation: "Lo que eliges o avanza solo son los litros, los minutos de carga, los panes y los kilómetros. Lo demás sale de ahí: el total pagado por la gasolina, la batería, el total pagado en la panadería y el valor de la carrera.",
            cards: [
              { id: "fuel", text: "Litros de gasolina" },
              { id: "price", text: "Total pagado por la gasolina" },
              { id: "charge", text: "Minutos de carga del celular" },
              { id: "battery", text: "% de batería" },
              { id: "bread", text: "Panes comprados" },
              { id: "breadCost", text: "Total pagado en la panadería" },
              { id: "km", text: "Kilómetros del taxi" },
              { id: "fare", text: "Valor de la carrera" }
            ],
            bins: [
              { id: "chosen", title: "Se elige o va avanzando" },
              { id: "computed", title: "Se calcula a partir de la otra" }
            ],
            solution: { fuel: "chosen", charge: "chosen", bread: "chosen", km: "chosen", price: "computed", battery: "computed", breadCost: "computed", fare: "computed" }
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una **variable** es una cantidad que puede tomar distintos valores.\n\n- **Variable independiente:** puede tomar valores sin depender de la otra. Se representa en el eje **horizontal**.\n- **Variable dependiente:** su valor se determina a partir de la independiente. Se representa en el eje **vertical**.\n\nEn la gráfica de Camilo, el tiempo es la variable independiente y la distancia, la dependiente."
          },
          { type: "bridge", text: "En plena pelea le llega un mensaje a Camilo. Es su mamá, y no está nada contenta: «¡Te serví un tinto y ni lo probaste!»" }
        ]
      },
      {
        id: "p3",
        title: "Mientras tanto, el tinto de Camilo se enfría",
        minutes: 10,
        contexts: ["camilo", "coffee"],
        teacherKey: "Lectura rápida: a) 90 · b) 50 · c) 15 · d) 40. Ahora piensa: mucho menos; curva.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Mamá de Camilo", avatar: "👩🏽", text: "¡Camilo! Te serví un tinto a 90 °C y lo dejaste en la mesa." },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Iba de afán, ma 😅" },
              { who: "Mamá de Camilo", avatar: "👩🏽", text: "Pues ya se está enfriando. Le fui midiendo la temperatura, ¡mira!" }
            ]
          },
          { type: "box", title: "Tu apuesta", icon: "🤔", text: "En los primeros 10 minutos, ¿cuánto crees que bajó la temperatura? ¿Y en los últimos 10? ¿Igual o distinto? Cuéntenlo en voz alta." },
          chart(COFFEE, { mode: "read", title: "La gráfica del tinto", icon: "📈", initial: 5 }),
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "El tinto se sirvió a ___ °C.", label: "Temperatura inicial, en grados", answer: 90, hint: "«Se sirvió» es el minuto 0. Mira dónde arranca la gráfica.", explanation: "«Se sirvió» es el minuto 0, y ahí la gráfica marca 90 °C." },
              { type: "numeric", prompt: "Entre el minuto 0 y el 10 bajó ___ °C.", label: "Grados que bajó entre el minuto 0 y el 10", answer: 40, hint: "Lee la temperatura en cada momento y réstalas.", explanation: "En el minuto 0 había 90 °C y en el 10, 50 °C: 90 − 50 = 40 °C." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Entre los minutos 20 y 30, comparado con los primeros 10 minutos, el tinto bajó…", options: ["más", "igual", "mucho menos"], answer: 2, hint: "Calcula cuánto bajó de 20 a 30 y compáralo con lo que bajó de 0 a 10.", explanation: "De 20 a 30 baja de 37 a 32 °C: solo 5 °C. De 0 a 10 bajó 40 °C. Es mucho menos." },
              { type: "choice", prompt: "Esta gráfica, a diferencia de la de Camilo, es…", options: ["una curva", "una recta", "una línea horizontal"], answer: 0, hint: "Fíjate si la línea va siempre igual de inclinada o si se va doblando.", explanation: "La línea se va doblando: baja mucho al principio y poco al final. Por eso es una curva." }
            ]
          },
          { type: "box", title: "En grupo", icon: "🗣️", text: "¿Acertaron su apuesta?" },
          { type: "box", variant: "naming", title: "Concepto clave", icon: "🧠", text: "No todas las gráficas son líneas rectas. La del tinto es una **curva**: la temperatura baja rápido al principio y cada vez más despacio. Cada 5 minutos baja menos: primero 25 °C, después 15 °C, después 8 °C." },
          { type: "bridge", text: "Laura aprovecha las dos gráficas que tiene a la mano, la de Camilo y la del tinto: quiere revisarlas pedazo por pedazo." }
        ]
      },
      {
        id: "p4",
        title: "Camilo y el tinto, pedazo por pedazo",
        minutes: 7,
        contexts: ["camilo", "coffee"],
        teacherKey: "Camilo: ▲ ■ ▲ ■. Tinto: todos ▼. ¿Cuánto cambió?: Camilo +400, 0, +600; tinto −25 (0–5) y −2 (25–30). Más cambio: 0–5.",
        blocks: [
          { type: "box", title: "Corta en pedazos", icon: "🎬", text: "Laura mira cada pedazo por separado, como una detective: ¿dónde avanzó Camilo y dónde se quedó quieto? Y ya que estamos, lo mismo con el tinto." },
          chart(CAMILO, { mode: "segments", title: "Pinta cada pedazo: Camilo", icon: "🎮", initial: 4, segmentLabel: "Pedazo", hint: "Compara dónde empieza y dónde termina cada pedazo: ¿queda más arriba, más abajo o a la misma altura?", explanation: "Camilo sube de 0 a 4, se mantiene de 4 a 7, sube de 7 a 10 y se mantiene de 10 a 14." }),
          chart(COFFEE, { mode: "segments", title: "Pinta cada pedazo: el tinto", icon: "🎮", initial: 5, segmentLabel: "Pedazo", hint: "Compara dónde empieza y dónde termina cada pedazo: ¿queda más arriba, más abajo o a la misma altura?", explanation: "En cada pedazo la temperatura termina más abajo de donde empezó: todos bajan." }),
          {
            type: "quiz",
            title: "¿Cuánto cambió?",
            icon: "🔍",
            text: "Escribe el signo: **+** si aumentó, **−** si disminuyó.",
            questions: [
              { type: "numeric", signed: true, prompt: "Camilo, minutos 0–4: ___ m", label: "Cambio de distancia de Camilo, minutos 0 a 4", answer: 400, hint: "Valor al final menos valor al inicio.", explanation: "Valor final menos valor inicial: 400 − 0 = +400 m." },
              { type: "numeric", signed: true, prompt: "Camilo, minutos 4–7: ___ m", label: "Cambio de distancia de Camilo, minutos 4 a 7", answer: 0, hint: "¿Se movió en esos minutos?", explanation: "Valor final menos valor inicial: 400 − 400 = 0 m." },
              { type: "numeric", signed: true, prompt: "Camilo, minutos 7–10: ___ m", label: "Cambio de distancia de Camilo, minutos 7 a 10", answer: 600, hint: "Valor al final menos valor al inicio.", explanation: "Valor final menos valor inicial: 1.000 − 400 = +600 m." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "¿En cuál pedazo del tinto cambió más la temperatura?", options: ["0–5 min", "10–15 min", "25–30 min"], answer: 0, hint: "Mira cuál de esos pedazos es el más inclinado.", explanation: "De 0 a 5 bajó 25 °C, de 10 a 15 bajó 8 °C y de 25 a 30 bajó 2 °C. El mayor cambio es de 0 a 5." }
            ]
          },
          { type: "box", variant: "naming", title: "Concepto clave", icon: "🧠", text: "Un **tramo** es la parte de una gráfica comprendida entre dos valores de la variable independiente.\n\nLa **variación** en un tramo es el valor final menos el valor inicial de la variable dependiente:\n\n- **Variación positiva:** la gráfica sube.\n- **Variación negativa:** la gráfica baja.\n- **Variación cero:** la gráfica se mantiene.\n\nEjemplo: de 0 a 4 min, Camilo tiene 400 − 0 = +400 m." },
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Ma, ¡es que estaba hirviendo! Si me pongo a tomármelo, llego todavía más tarde 😂" },
              { who: "Mamá de Camilo", avatar: "👩🏽", text: "¿Más tarde? ¡Si ya dejaste a todo el curso empatado!" },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Guárdamelo: a los 30 minutos ya está en 32 °C, justo para tomármelo de un sorbo 😎" },
              { who: "Mamá de Camilo", avatar: "👩🏽", text: "Ay, este muchacho 🙄" }
            ]
          },
          { type: "bridge", text: "Con el tinto ya no hay nada más que discutir. Pero Valentina oye el chisme de la puerta y entra a la pelea. Ella no viene con cuentos: viene con una tabla." }
        ]
      },
      {
        id: "p5",
        title: "La apuesta de Valentina",
        minutes: 6,
        contexts: ["valentina", "minibus"],
        teacherKey: "Tabla: 0, 6, 12, 18, 24, 30 · 6 km por día · 48 km.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Valentina", avatar: VALENTINA_AVATAR, side: "me", text: "La buseta de mi tío es mejor que ese taxi. Le aposté a Santi: si corro 8 días seguidos, él deja de hacerle campaña y me oye los precios 🏃‍♀️ Ya voy anotando cuánto llevo." },
              { who: "Camilo", avatar: CAMILO_AVATAR, text: "¿Y cuántos kilómetros vas a llevar en esos 8 días?" },
              { who: "Valentina", avatar: VALENTINA_AVATAR, side: "me", text: "Eso es lo que tengo que averiguar 😅" }
            ]
          },
          chart(VALENTINA, { mode: "read", title: "La gráfica de Valentina", icon: "📈", initial: 2 }),
          {
            type: "table",
            title: "Completa su plan",
            icon: "🔍",
            hint: "Mueve el punto de la gráfica hasta cada día y mira cuántos kilómetros marca.", explanation: "Cada día suma 6 kilómetros: 6, 12, 18, 24 y 30.",
            columns: { name: "Tiempo (días)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Distancia (km)", values: [0, 6, 12, 18, 24, 30], editable: true, given: [0] }]
          },
          {
            type: "quiz",
            questions: [
              { type: "numeric", prompt: "Cada día corre ___ km.", label: "Kilómetros por día", answer: 6, hint: "Compara dos casillas seguidas de tu tabla.", explanation: "De una casilla a la siguiente siempre se suman 6 km." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "Si mantiene el mismo ritmo, en **8 días** llevará ___ km.", label: "Kilómetros en 8 días", answer: 48, hint: "La gráfica llega hasta 5 días, pero el ritmo no cambia. ¿Cuánto suma cada día?", explanation: "Con 6 km por día: 6 × 8 = 48 km." }
            ]
          },
          { type: "box", title: "En grupo", icon: "🗣️", text: "¿Cómo lo calculaste?" },
          { type: "bridge", text: "Valentina corre **lo mismo** cada día. ¿A Camilo le pasó igual en su camino? Laura quiere verlo en números." }
        ]
      },
      {
        id: "p6",
        title: "Primera pista: ¿cuánto cobra el taxi?",
        minutes: 14,
        contexts: ["valentina", "camilo", "taxi", "trip"],
        teacherKey: "A: +6 siempre, constante. B: +200, +200, 0, +200, no constante. C: +1.500 siempre, constante. Preguntas de cierre: orales, el docente decide si se escriben.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA_AVATAR, text: "Camilo, ya no hay más cuentos. ¿Qué cuadraban tú y Santi en la puerta?" },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "Bueno… Santi quería que yo votara por el taxi de su primo 😬" },
              { who: "Laura", avatar: LAURA_AVATAR, text: "¡Con razón le aceptó esa apuesta a Valentina! La tiene corriendo mientras él consigue votos. ¿Y cuánto cobra ese taxi?" },
              { who: "Camilo", avatar: CAMILO_AVATAR, side: "me", text: "$4.000 al subirse y $1.500 por cada kilómetro." }
            ]
          },
          { type: "box", title: "Una pista de la misión", icon: "📌", text: "El taxi cobra **$4.000 al subirse** (lo que se llama banderazo) y **$1.500 por cada kilómetro**. Guarda esta pista." },
          {
            type: "table",
            showChanges: true,
            title: "Tabla A · La apuesta de Valentina",
            icon: "📊",
            text: "¿Cuánto cambia la distancia de una columna a la siguiente? Escribe el signo: **+** si aumenta, **−** si disminuye.",
            hint: "Toma el valor de la columna siguiente y réstale el de la anterior.", explanation: "Se resta cada valor menos el anterior: 6 − 0 = +6, 12 − 6 = +6, y así siempre: +6.",
            columns: { name: "Tiempo (días)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Distancia (km)", values: [0, 6, 12, 18, 24, 30] }]
          },
          {
            type: "quiz",
            questions: [{ type: "choice", prompt: "En la tabla A, ¿el cambio es siempre la misma cantidad?", options: ["Sí", "No"], answer: 0, hint: "Compara las cantidades que escribiste.", explanation: "Todos los cambios fueron +6: siempre la misma cantidad." }]
          },
          {
            type: "table",
            showChanges: true,
            title: "Tabla B · El camino de Camilo",
            icon: "📊",
            hint: "Toma el valor de la columna siguiente y réstale el de la anterior. Si no cambió, escribe 0.", explanation: "Se resta cada valor menos el anterior: 200 − 0 = +200, 400 − 200 = +200, 400 − 400 = 0 y 600 − 400 = +200.",
            columns: { name: "Tiempo (min)", values: [0, 2, 4, 6, 8] },
            rows: [{ name: "Distancia (m)", values: [0, 200, 400, 400, 600] }]
          },
          {
            type: "quiz",
            questions: [{ type: "choice", prompt: "En la tabla B, ¿el cambio es siempre la misma cantidad?", options: ["Sí", "No"], answer: 1, hint: "Compara las cantidades que escribiste.", explanation: "Los cambios fueron +200, +200, 0 y +200: no siempre es la misma cantidad." }]
          },
          {
            type: "table",
            showChanges: true,
            title: "Tabla C · El taxi",
            icon: "📊",
            hint: "Toma el valor de la columna siguiente y réstale el de la anterior.", explanation: "Se resta cada valor menos el anterior: 5.500 − 4.000 = +1.500, 7.000 − 5.500 = +1.500, y así siempre.",
            columns: { name: "Distancia (km)", values: [0, 1, 2, 3, 4] },
            rows: [{ name: "Valor de la carrera ($)", values: [4000, 5500, 7000, 8500, 10000] }]
          },
          {
            type: "quiz",
            questions: [{ type: "choice", prompt: "En la tabla C, ¿el cambio es siempre la misma cantidad?", options: ["Sí", "No"], answer: 0, hint: "Compara las cantidades que escribiste. Fíjate solo en cuánto cambia, no en dónde empieza.", explanation: "El cambio siempre es +1.500. Que empiece en 4.000 no cambia eso." }]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Hay **cambio constante** cuando, para aumentos iguales de la variable independiente, la variable dependiente varía siempre en la **misma cantidad**.\n\n- Valentina: +6 km por día. Es constante.\n- Camilo: +200, +200, 0, +200 m cada 2 min. No es constante.\n- Taxi: +$1.500 por km. Es constante, aunque empiece en $4.000."
          },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- ¿Qué es un cambio constante? Explícalo como a alguien de otro grado.\n- ¿Qué situación de tu vida cambia siempre igual y cuál no?\n- ¿Qué fue lo más fácil y lo más difícil de leer hoy?"
          },
          { type: "mission", id: "trip", hintsUpTo: 1 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "10 min: 50 °C · 42 °C: minuto 15 · 0–5: −25 °C · 25–30: −2 °C.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          chart(COFFEE, { mode: "read", title: "La gráfica del tinto", icon: "📈", initial: 5 }),
          {
            type: "quiz",
            title: "Sigue leyendo la gráfica",
            icon: "🔍",
            text: "Escribe el signo: **−** si disminuyó.",
            questions: [
              { type: "numeric", prompt: "A los 10 minutos tenía ___ °C.", label: "Temperatura a los 10 minutos, en grados", answer: 50, hint: "Mueve el punto hasta 10 minutos y mira las coordenadas.", explanation: "Encima del minuto 10, la gráfica marca 50 °C." },
              { type: "numeric", prompt: "Llegó a 42 °C en el minuto ___", label: "Minuto en que llegó a 42 grados", answer: 15, hint: "Mueve el punto hasta que las coordenadas digan 42 °C. ¿Qué minuto marca?", explanation: "La curva pasa por 42 °C justo encima del minuto 15." },
              { type: "numeric", signed: true, prompt: "Tinto, minutos 0–5: ___ °C", label: "Cambio de temperatura del tinto, minutos 0 a 5", answer: -25, hint: "Si la temperatura baja, el cambio lleva signo −.", explanation: "Valor final menos valor inicial: 65 − 90 = −25 °C." },
              { type: "numeric", signed: true, prompt: "Tinto, minutos 25–30: ___ °C", label: "Cambio de temperatura del tinto, minutos 25 a 30", answer: -2, hint: "Si la temperatura baja, el cambio lleva signo −.", explanation: "Valor final menos valor inicial: 32 − 34 = −2 °C." }
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
              { term: "Magnitud", definition: "Propiedad que se puede medir y expresar con un número y una unidad." },
              { term: "Gráfica", definition: "Muestra en el plano cartesiano cómo cambia una magnitud respecto a otra." },
              { term: "Variable independiente", definition: "Toma valores sin depender de la otra. Va en el eje horizontal." },
              { term: "Variable dependiente", definition: "Su valor se determina a partir de la independiente. Va en el eje vertical." },
              { term: "Tramo", definition: "Parte de una gráfica entre dos valores de la variable independiente." },
              { term: "Variación", definition: "Valor final menos valor inicial: positiva si sube, negativa si baja, cero si se mantiene." },
              { term: "Cambio constante", definition: "Para aumentos iguales de la independiente, la dependiente varía siempre la misma cantidad." }
            ]
          },
          { type: "bridge", text: "Hoy viste situaciones donde cada entrada tiene un resultado. Para desempatar, al otro día repiten la votación en una planilla… y Laura dice que tiene algo muy raro." }
        ]
      }
    ]
  };
})();
