/* Session 3: content only. Sources: ASF Cl. 14 (Act. 44–45) · TXT8 Ej. 1, 4, 5, 6 · MAT8 L23–L24 (Sit. 1–4). */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾";

  OVA.data.session3 = {
    title: "Las caras de una función",
    minutes: 55,
    pages: [
      {
        id: "p1",
        title: "Cada bando cuenta los precios a su manera",
        minutes: 8,
        contexts: ["valentina", "minibus"],
        teacherKey: "Valentina: 0, 6, 12, 18, 24, 30. Buseta: 10.000, 11.000, 12.000, 13.000, 14.000, 15.000. Preguntas: $14.000 · 2 km · $10.000.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "La profe anuló la votación por las trampas de la planilla: se vota al final, cuando estén claros los precios. Ya sabemos los del taxi: $4.000 al subirse y $1.500 por km. Falta conocer los de la buseta." },
          {
            type: "box",
            title: "Algo que ya vienes haciendo",
            icon: "🧭",
            text: "Sin darte cuenta, ya has contado funciones de varias maneras: con **gráficas** (el camino de Camilo), con **tablas** (los kilómetros de Valentina), con **flechas** (la planilla) y con **palabras** (las tarifas del taxi). Hoy las vas a juntar y a aprender a pasar de una a otra."
          },
          {
            type: "chat",
            messages: [
              { who: "Valentina", avatar: VALENTINA, side: "me", text: "La buseta de mi tío cobra $10.000 al subirse y $1.000 por cada kilómetro." },
              { who: "Santi", avatar: SANTI, text: "Con palabras todo suena bonito. Muéstralo en una tabla 😏" },
              { who: "Valentina", avatar: VALENTINA, side: "me", text: "Listo. Y de paso te muestro lo que corro: 6 kilómetros por día 🏃‍♀️" }
            ]
          },
          {
            type: "table",
            title: "Los kilómetros de Valentina",
            icon: "📋",
            hint: "Cada día suma 6 kilómetros.", explanation: "Cada día suma 6 kilómetros: 6, 12, 18, 24 y 30.",
            columns: { name: "Tiempo (días)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Distancia (km)", values: [0, 6, 12, 18, 24, 30], editable: true, given: [0] }]
          },
          {
            type: "table",
            title: "Los precios de la buseta",
            icon: "📋",
            hint: "Empieza en lo que cobran al subirse y cada kilómetro suma $1.000.", explanation: "Se empieza en $10.000 y cada kilómetro suma $1.000: 11.000, 12.000, 13.000, 14.000 y 15.000.",
            columns: { name: "Distancia (km)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Valor ($)", values: [10000, 11000, 12000, 13000, 14000, 15000], editable: true, given: [0] }]
          },
          {
            type: "quiz",
            title: "Lee tu tabla",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Un viaje de 4 km en buseta cuesta $___", label: "Valor de 4 km en buseta", answer: 14000, hint: "Busca la columna de los 4 km.", explanation: "En la columna de 4 km dice 14.000: 10.000 + 1.000 × 4 = 14.000." },
              { type: "numeric", prompt: "Si pagas $12.000, recorres ___ km.", label: "Kilómetros por 12.000 pesos", answer: 2, hint: "Busca $12.000 en la fila de abajo y mira qué hay arriba.", explanation: "El valor 12.000 está en la columna de 2 km." },
              { type: "numeric", prompt: "Aunque no recorras nada, pagas $___", label: "Valor con 0 kilómetros", answer: 10000, hint: "Mira la columna de 0 km.", explanation: "Con 0 km solo se paga lo de subirse: $10.000." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Cada manera de contar una función se llama **representación**. Hay cinco:\n\n- **Verbal:** describe la regla con palabras. «$10.000 al subirse y $1.000 por km».\n- **Tabla de valores:** organiza parejas de valores (x, y): la entrada x y su salida y.\n- **Diagrama sagital:** une cada entrada con su salida mediante flechas, como en la planilla.\n- **Gráfica:** ubica las parejas (x, y) como puntos del plano cartesiano, como el camino de Camilo.\n- **Expresión algebraica:** escribe la regla con números, operaciones y letras, como f(x) = 6x.\n\nAcabas de usar las dos primeras. En las siguientes páginas vas a construir gráficas y a descubrir de dónde sale la expresión algebraica."
          },
          { type: "bridge", text: "Camilo mira las tablas y se acuerda de cómo lo pillaron a él: «Una gráfica lo muestra todo de un vistazo». Esta vez, no la vas a leer: la vas a construir." }
        ]
      },
      {
        id: "p2",
        title: "Ahora la gráfica la haces tú",
        minutes: 10,
        contexts: ["valentina", "minibus"],
        teacherKey: "Puntos de cada tabla. Preguntas: Valentina; por el cobro al subirse; sí.",
        blocks: [
          {
            type: "box",
            title: "Un punto tiene dos datos",
            icon: "📍",
            text: "Cada pareja de tu tabla es un punto del plano. La pareja (3 días, 18 km) se ubica así: 3 en el eje horizontal y 18 en el vertical.\n\nDesde la Sesión 1 lees gráficas. Ahora vas a construirlas tú, solo con la tabla."
          },
          {
            type: "table",
            title: "Tu tabla: los kilómetros de Valentina",
            icon: "📌",
            columns: { name: "Tiempo (días)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Distancia (km)", values: [0, 6, 12, 18, 24, 30] }]
          },
          {
            type: "plane",
            mode: "build",
            title: "Ubica los kilómetros de Valentina",
            icon: "✏️",
            x: { name: "Tiempo", unit: "días", min: 0, max: 5, step: 1 },
            y: { name: "Distancia", unit: "km", min: 0, max: 30, step: 6 },
            targets: [[0, 0], [1, 6], [2, 12], [3, 18], [4, 24], [5, 30]],
            connect: true,
            hint: "Mira tu tabla: ¿cuánto vale en el eje horizontal? ¿Y en el vertical?", explanation: "Cada pareja de la tabla es un punto: (0, 0), (1, 6), (2, 12), (3, 18), (4, 24) y (5, 30)."
          },
          {
            type: "table",
            title: "Tu tabla: los precios de la buseta",
            icon: "📌",
            vertical: true,
            columns: { name: "Distancia (km)", values: [0, 1, 2, 3, 4, 5] },
            rows: [{ name: "Valor ($)", values: [10000, 11000, 12000, 13000, 14000, 15000] }]
          },
          {
            type: "plane",
            mode: "build",
            title: "Ubica los precios de la buseta",
            icon: "✏️",
            x: { name: "Distancia", unit: "km", min: 0, max: 5, step: 1 },
            y: { name: "Valor", unit: "$", min: 0, max: 16000, step: 4000, snap: 1000 },
            targets: [[0, 10000], [1, 11000], [2, 12000], [3, 13000], [4, 14000], [5, 15000]],
            connect: true,
            hint: "Usa los selectores: elige el kilómetro y el valor de tu tabla.", explanation: "Cada pareja de la tabla es un punto: (0, 10.000), (1, 11.000), hasta (5, 15.000)."
          },
          {
            type: "quiz",
            variant: "think",
            title: "Mira las dos gráficas",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "¿Cuál gráfica parte del punto (0, 0)?", options: ["La de Valentina", "La de la buseta", "Las dos"], answer: 0, hint: "Mira dónde arranca cada una.", explanation: "Con 0 días, Valentina lleva 0 km: su gráfica arranca en (0, 0). Con 0 km, la buseta ya cobra $10.000." },
              { type: "choice", prompt: "¿Por qué la de la buseta empieza en $10.000?", options: ["Porque cobran al subirse", "Porque va más rápido", "Porque hay un error"], answer: 0, hint: "¿Qué pagas aunque no recorras ningún kilómetro?", explanation: "Con 0 km ya se pagan $10.000, porque es lo que cobran al subirse." },
              { type: "choice", prompt: "¿Los puntos de cada gráfica quedan en línea recta?", options: ["Sí", "No"], answer: 0, hint: "Mira las líneas que quedaron al unirlos.", explanation: "Cada kilómetro suma siempre lo mismo, así que los puntos quedan alineados." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Ahora que las construyes, ponles nombre exacto a sus partes:\n\n- **Abscisa:** primera coordenada de un punto (x, la entrada). Se lee en el eje horizontal.\n- **Ordenada:** segunda coordenada de un punto (y, la salida). Se lee en el eje vertical.\n- **Gráfica de una función:** conjunto de todos los puntos (x, y) del plano que cumplen la regla."
          },
          { type: "bridge", text: "Laura no se impresiona: «Muy bonito, pero esa gráfica solo llega hasta 5 km. ¿Y un viaje de 37 km?»." }
        ]
      },
      {
        id: "p3",
        title: "Del patrón a la regla",
        minutes: 14,
        contexts: ["secretTable", "valentina", "minibus"],
        teacherKey: "Valentina: 6, 12, 18, 60; cambian solo los días; 6. Buseta: 11.000, 12.000, 3, 47.000; 10.000 queda fijo; 1.000 y 10.000. Tabla secreta: sube 2; x = 0 da 3; y = 2x + 3; x = 10 da 23.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "¿37 km? ¿Toca hacer toda la tabla hasta 37? 😩" },
              { who: "Laura", avatar: LAURA, side: "me", text: "No. Si encontramos el patrón, sirve para cualquier número." },
              { who: "Camilo", avatar: CAMILO, text: "¿Y cómo se encuentra?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Mirando bien cómo se calcula cada renglón 🕵️‍♀️" }
            ]
          },
          {
            type: "quiz",
            title: "Paso 1: Valentina, renglón por renglón",
            icon: "🔍",
            text: "Calcula cada renglón y fíjate en lo que se repite.",
            questions: [
              { type: "numeric", prompt: "1 día: 6 × 1 = ___ km", label: "Kilómetros en 1 día", answer: 6, hint: "Multiplica.", explanation: "6 × 1 = 6." },
              { type: "numeric", prompt: "2 días: 6 × 2 = ___ km", label: "Kilómetros en 2 días", answer: 12, hint: "Multiplica.", explanation: "6 × 2 = 12." },
              { type: "numeric", prompt: "10 días: 6 × 10 = ___ km", label: "Kilómetros en 10 días", answer: 60, hint: "Multiplica.", explanation: "6 × 10 = 60." },
              { type: "choice", prompt: "De un renglón a otro, ¿qué cambia?", options: ["Solo los días", "Solo el 6", "Los dos"], answer: 0, hint: "Compara dos renglones: ¿qué número es distinto?", explanation: "En todos los renglones se multiplica por 6. Lo único distinto es el número de días." },
              { type: "numeric", prompt: "Como los días cambian, los llamamos x. Entonces: kilómetros = ___ · x", label: "Número que multiplica a x", answer: 6, hint: "Es el número que se repite en todos los renglones.", explanation: "El 6 se repite en todos los renglones y los días cambian: kilómetros = 6 · x." }
            ]
          },
          {
            type: "quiz",
            title: "Paso 2: la buseta, renglón por renglón",
            icon: "🔍",
            text: "Aquí hay algo que se paga una sola vez. Calcula y compara.",
            questions: [
              { type: "numeric", prompt: "1 km: 10.000 + 1.000 × 1 = $___", label: "Valor de 1 kilómetro", answer: 11000, hint: "Primero la multiplicación, luego la suma.", explanation: "1.000 × 1 = 1.000, y 10.000 + 1.000 = 11.000." },
              { type: "numeric", prompt: "3 km: 10.000 + 1.000 × ___ = $13.000", label: "Número de kilómetros", answer: 3, hint: "¿Qué número va cambiando en cada renglón?", explanation: "Para llegar a 13.000 faltan 3.000 sobre los 10.000, y 1.000 × 3 = 3.000." },
              { type: "numeric", prompt: "37 km, el reto de Laura: 10.000 + 1.000 × 37 = $___", label: "Valor de 37 kilómetros", answer: 47000, hint: "Es el mismo cálculo; solo cambia el número de kilómetros.", explanation: "1.000 × 37 = 37.000, y 10.000 + 37.000 = 47.000." },
              { type: "choice", prompt: "En todos los renglones, ¿qué se queda igual?", options: ["El 10.000 y el 1.000", "Solo el 10.000", "Los kilómetros"], answer: 0, hint: "Mira qué números se repiten en todos.", explanation: "En todos aparecen el 10.000 y el 1.000. Lo único que cambia son los kilómetros." },
              { type: "numeric", prompt: "Con x kilómetros: valor = 10.000 + ___ · x", label: "Número que multiplica a x", answer: 1000, hint: "¿Qué número multiplica a los kilómetros en cada renglón?", explanation: "El 1.000 multiplica a los kilómetros en todos los renglones: valor = 10.000 + 1.000 · x." },
              { type: "numeric", prompt: "Con x kilómetros: valor = ___ + 1.000 · x", label: "Número fijo", answer: 10000, hint: "¿Qué se paga aunque no recorras nada?", explanation: "El 10.000 se paga siempre, aunque x sea 0: valor = 10.000 + 1.000 · x." }
            ]
          },
          {
            type: "box",
            title: "Paso 3: la tabla secreta de Laura",
            icon: "🕵️",
            text: "Ya sin ayuda: esta tabla sigue una regla parecida.\n\n- x = 1 → y = 5\n- x = 2 → y = 7\n- x = 3 → y = 9\n- x = 4 → y = 11"
          },
          {
            type: "quiz",
            variant: "think",
            title: "Encuentra su regla",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "Cada vez que x sube 1, y sube ___", label: "Cuánto sube y", answer: 2, hint: "Compara dos renglones seguidos.", explanation: "De 5 a 7, de 7 a 9 y de 9 a 11: y siempre sube 2." },
              { type: "numeric", prompt: "Devuélvete un renglón: cuando x = 0, y vale ___", label: "y cuando x es 0", answer: 3, hint: "Si subir 1 en x suma 2, bajar 1 en x resta 2. Empieza desde y = 5.", explanation: "Si subir 1 en x suma 2, bajar 1 resta 2: 5 − 2 = 3." },
              { type: "numeric", prompt: "Entonces la regla es y = 2 · x + ___", label: "Número fijo de la regla", answer: 3, hint: "Es lo que vale y cuando x = 0, igual que el cobro fijo de la buseta.", explanation: "Cuando x = 0, y vale 3: y = 2 · x + 3." },
              { type: "numeric", prompt: "Comprueba con otro número: cuando x = 10, y vale ___", label: "y cuando x es 10", answer: 23, hint: "Reemplaza x por 10: 2 · 10 + 3.", explanation: "2 · 10 + 3 = 20 + 3 = 23." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Una **expresión algebraica** es una regla escrita con números, operaciones y letras. La letra x es la **variable**: representa cualquier valor de la entrada.\n\nPara hallarla a partir de un patrón:\n\n- Calcula varios casos concretos.\n- Identifica qué se queda fijo y qué cambia.\n- Escribe x en lugar de lo que cambia.\n\n**Notación:** f(x) = 2x + 3 se lee «f de x». **Evaluar** es reemplazar x por un número: f(10) = 2 · 10 + 3 = 23 significa que si entra 10, sale 23."
          },
          { type: "bridge", text: "Camilo llega con una noticia: averiguó con otro taxista, don Jairo. Santi lo reta: «¿Ah, sí? Si son tan buenos, ahí les doy su regla y hagan ustedes lo demás»." }
        ]
      },
      {
        id: "p4",
        title: "Don Jairo, el otro taxista: de la regla a la gráfica",
        minutes: 10,
        contexts: ["jairo", "taxi"],
        teacherKey: "0, 2.500, 5.000, 7.500, 10.000. Con 0 km: $0. (4, 10.000) sí; (2, 6.000) no; los puntos intermedios también están en la recta. Con negativos: −3, −1, 1, 3, 5.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "Don Jairo no cobra nada al subirse, pero cada kilómetro vale $2.500." },
              { who: "Santi", avatar: SANTI, text: "¿Y eso qué? Mi primo cobra $1.500 por kilómetro." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Su regla es f(x) = 2.500x. Veamos cómo se ve." }
            ]
          },
          {
            type: "table",
            title: "Evalúa la regla de don Jairo: f(x) = 2.500x",
            icon: "🧮",
            hint: "Multiplica los kilómetros por 2.500.",
            explanation: "Por ejemplo, f(1) = 2.500 · 1 = 2.500 y f(4) = 2.500 · 4 = 10.000. Los valores son 0, 2.500, 5.000, 7.500 y 10.000.",
            columns: { name: "Distancia (km)", values: [0, 1, 2, 3, 4] },
            rows: [{ name: "Valor ($)", values: [0, 2500, 5000, 7500, 10000], editable: true }]
          },
          {
            type: "plane",
            mode: "build",
            title: "Pon los puntos",
            icon: "📍",
            text: "Ubica los puntos de tu tabla. Al terminar se unen con una línea.",
            x: { name: "Distancia", unit: "km", min: 0, max: 4, step: 1 },
            y: { name: "Valor", unit: "$", min: 0, max: 10000, step: 2500 },
            targets: [[0, 0], [1, 2500], [2, 5000], [3, 7500], [4, 10000]],
            connect: true,
            hint: "Usa los selectores: elige los km y luego el valor de tu tabla.",
            explanation: "Cada pareja de la tabla es un punto: (0, 0), (1, 2.500), (2, 5.000), (3, 7.500) y (4, 10.000)."
          },
          {
            type: "quiz",
            variant: "think",
            title: "Verifica y compara",
            icon: "✅",
            questions: [
              { type: "choice", prompt: "¿El punto (4 km, $10.000) está en la gráfica?", options: ["Sí", "No"], answer: 0, hint: "Evalúa f(4).", explanation: "f(4) = 2.500 · 4 = 10.000. Coincide con el punto, así que sí está." },
              { type: "choice", prompt: "¿El punto (2 km, $6.000) está en la gráfica?", options: ["Sí", "No"], answer: 1, hint: "Evalúa f(2).", explanation: "f(2) = 2.500 · 2 = 5.000, no 6.000. Ese punto no está." },
              { type: "choice", prompt: "Comparado con el taxi del primo, ¿qué tiene de distinto el arranque de esta recta?", options: ["Arranca en $0, porque no cobra al subirse", "Arranca en $4.000, igual que el primo", "No tiene arranque"], answer: 0, hint: "Mira cuánto vale con 0 km en cada uno.", explanation: "Con 0 km, don Jairo cobra $0 y el primo, $4.000. Por eso la recta de don Jairo sale del punto (0, 0)." }
            ]
          },
          { type: "bridge", text: "Palabras, tabla, gráfica, flechas, fórmula. Camilo está mareado: «¿Pero eso no es todo lo mismo?». Y tiene razón." }
        ]
      },
      {
        id: "p5",
        title: "Las cinco caras de una función",
        minutes: 8,
        contexts: ["minibus"],
        teacherKey: "Cada tarjeta va con su función: f(x) = 3x + 4: multiplicar por 3 y sumar 4; x: −2, −1, 0, 1. f(x) = 2x − 1: el doble menos 1; x: 0, 1, 2, 3. Buseta: $10.000 + $1.000 por km; km: 0, 1, 2.",
        blocks: [
          {
            type: "classify",
            title: "¿De quién es cada cara?",
            icon: "🔄",
            hint: "Toma cada tarjeta y pruébala con la regla: ¿le da lo mismo?", explanation: "Se prueba cada tarjeta con la regla. Por ejemplo, si x = 1, 3 · 1 + 4 = 7, y por eso (1, 7) es de f(x) = 3x + 4.",
            cards: [
              { id: "a1", text: "Multiplicar por 3 y sumar 4" },
              { id: "a2", text: "Tabla: x = −2, −1, 0, 1 · y = −2, 1, 4, 7" },
              { id: "a3", text: "Flechas: −2→−2, −1→1, 0→4, 1→7" },
              { id: "a4", text: "Puntos: (−2, −2), (−1, 1), (0, 4), (1, 7)" },
              { id: "b1", text: "El doble menos 1" },
              { id: "b2", text: "Tabla: x = 0, 1, 2, 3 · y = −1, 1, 3, 5" },
              { id: "b3", text: "Flechas: 0→−1, 1→1, 2→3, 3→5" },
              { id: "b4", text: "Puntos: (0, −1), (1, 1), (2, 3), (3, 5)" },
              { id: "c1", text: "$10.000 al subirse y $1.000 por km" },
              { id: "c2", text: "Tabla: km = 0, 1, 2 · $ = 10.000, 11.000, 12.000" },
              { id: "c3", text: "Flechas: 0→10.000, 1→11.000, 2→12.000" },
              { id: "c4", text: "Puntos: (0, 10.000), (1, 11.000), (2, 12.000)" }
            ],
            bins: [
              { id: "a", title: "f(x) = 3x + 4" },
              { id: "b", title: "f(x) = 2x − 1" },
              { id: "c", title: "f(x) = 1.000x + 10.000" }
            ],
            solution: { a1: "a", a2: "a", a3: "a", a4: "a", b1: "b", b2: "b", b3: "b", b4: "b", c1: "c", c2: "c", c3: "c", c4: "c" }
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Las **representaciones** de una función son las distintas formas de expresar la misma correspondencia entre entradas y salidas. Ya las conoces todas; así se ve cada una con f(x) = 3x + 4:\n\n- **Verbal:** «multiplicar por 3 y sumar 4».\n- **Tabla de valores:** x = −2, −1, 0, 1 · y = −2, 1, 4, 7.\n- **Diagrama sagital:** −2→−2, −1→1, 0→4, 1→7.\n- **Gráfica:** los puntos (−2, −2), (−1, 1), (0, 4), (1, 7) en el plano.\n- **Expresión algebraica:** f(x) = 3x + 4.\n\nLa función es la misma; cada representación deja ver algo distinto."
          },
          { type: "bridge", text: "Por fin están de acuerdo en algo: ya pueden comparar precios sin pelear por el formato." }
        ]
      },
      {
        id: "p6",
        title: "Para cerrar: ya hablamos el mismo idioma",
        minutes: 5,
        contexts: ["valentina", "minibus", "taxi", "trip"],
        teacherKey: "Preguntas orales. Lo que se paga al empezar se ve mejor en la gráfica o en la fórmula.",
        blocks: [
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- ¿Qué representación te resultó más fácil de leer? ¿Y de construir?\n- ¿Cuál cuenta mejor «cuánto empiezo pagando»: la tabla, la gráfica o la fórmula?\n- En la gráfica de Valentina y en la de la buseta, ¿qué se parece y qué cambia?"
          },
          { type: "mission", id: "trip", hintsUpTo: 3 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "3 días: 18 km · 2 km: $12.000 · Los puntos intermedios también están en la recta. Con negativos: −3, −1, 1, 3, 5.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          {
            type: "quiz",
            title: "Sigue el patrón",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "3 días: 6 × 3 = ___ km", label: "Kilómetros en 3 días", answer: 18, hint: "Multiplica.", explanation: "6 × 3 = 18." },
              { type: "numeric", prompt: "2 km: 10.000 + 1.000 × 2 = $___", label: "Valor de 2 kilómetros", answer: 12000, hint: "Primero la multiplicación, luego la suma.", explanation: "1.000 × 2 = 2.000, y 10.000 + 2.000 = 12.000." }
            ]
          },
          {
            type: "quiz",
            title: "La regla de don Jairo, f(x) = 2.500x",
            icon: "✅",
            questions: [
              { type: "choice", prompt: "¿Los puntos que quedan entre los que marcaste también cumplen la regla?", options: ["Sí, también están en la recta", "No, solo los que marqué"], answer: 0, hint: "Prueba con 1,5 km: ¿qué da f(1,5)? ¿Queda sobre la línea?", explanation: "Por ejemplo, f(1,5) = 2.500 · 1,5 = 3.750, y ese punto cae sobre la línea. Todos los puntos de la recta cumplen la regla." }
            ]
          },
          {
            type: "table",
            title: "Sin taxi: la regla también acepta negativos",
            icon: "🧮",
            text: "No existen kilómetros negativos, pero una regla sí puede recibir entradas negativas. Prueba con la máquina «el doble menos 1» de la Sesión 2: **f(x) = 2x − 1**.",
            hint: "Multiplica x por 2 y luego réstale 1. Ojo con los negativos.",
            explanation: "Por ejemplo, f(−1) = 2 · (−1) − 1 = −3 y f(3) = 2 · 3 − 1 = 5. Los valores son −3, −1, 1, 3 y 5.",
            columns: { name: "x", values: [-1, 0, 1, 2, 3] },
            rows: [{ name: "f(x)", values: [-3, -1, 1, 3, 5], editable: true, signed: true }]
          },
          {
            type: "plane",
            mode: "build",
            title: "Ubica esos puntos",
            icon: "📍",
            text: "Fíjate en que ahora algunos puntos quedan a la izquierda o por debajo de los ejes.",
            x: { name: "x", unit: "", min: -2, max: 4, step: 1 },
            y: { name: "y", unit: "", min: -4, max: 6, step: 2, snap: 1 },
            targets: [[-1, -3], [0, -1], [1, 1], [2, 3], [3, 5]],
            connect: true,
            hint: "Usa los selectores: elige x y luego el valor de f(x) de tu tabla.",
            explanation: "Cada pareja de la tabla es un punto: (−1, −3), (0, −1), (1, 1), (2, 3) y (3, 5)."
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
              { term: "Representación", definition: "Forma de expresar una función: verbal, tabla de valores, diagrama sagital, gráfica o expresión algebraica." },
              { term: "Tabla de valores", definition: "Organiza parejas (x, y): cada entrada con su salida." },
              { term: "Abscisa y ordenada", definition: "Primera (x) y segunda (y) coordenada de un punto del plano." },
              { term: "Gráfica de una función", definition: "Conjunto de todos los puntos (x, y) que cumplen la regla." },
              { term: "Expresión algebraica", definition: "Regla escrita con números, operaciones y letras. Ejemplo: f(x) = 2x + 3." },
              { term: "Variable x", definition: "Letra que representa cualquier valor de la entrada." },
              { term: "Evaluar", definition: "Reemplazar x por un número y calcular. Ejemplo: f(10) = 2 · 10 + 3 = 23." }
            ]
          },
          { type: "bridge", text: "Y justo cuando todo se calmaba, Santi llega pálido al salón: «Muchachos… mi primo quiere subir lo que cobra por kilómetro»." }
        ]
      }
    ]
  };
})();
