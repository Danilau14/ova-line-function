/* Session 4: content only. Sources: ASF Act. 49, 53–58 · TXT8 Lineal, Ej. 3, Afín Ej. 2 · MAT8 L27 Sit. 2. Zero slope: own content. */
(function () {
  var LAURA = "👩🏻", SANTI = "🧑🏻", CAMILO = "🧑🏽", VALENTINA = "👧🏾";
  var KM = { name: "Distancia", unit: "km", min: 0, max: 10, step: 2 };

  OVA.data.session4 = {
    title: "La pendiente: ¿qué tan inclinada?",
    minutes: 55,
    pages: [
      {
        id: "intro",
        title: "Antes de pelear: pongamos las reglas en fila",
        minutes: 7,
        contexts: ["valentina", "taxi", "minibus", "jairo"],
        teacherKey: "f(0): 0, 0, 4.000, 10.000. Don Jairo: 5.000 y 10.000, se duplica. Taxi: 7.000 y 10.000, no se duplica. m y b: 2.500 y 0; 1.500 y 4.000. Clasificar: por el origen 6x, 2.500x y −3x; fuera del origen 1.500x + 4.000, 1.000x + 10.000 y 2x + 3. Nota: el DBA llama lineales a todas las de la forma mx + b; aquí se distingue lineal de afín, como en ASF y MAT8.",
        blocks: [
          { type: "box", title: "La historia hasta aquí", icon: "📖", text: "Ya están los dos precios para la votación final. Taxi: $4.000 al subirse y $1.500 por km. Buseta: $10.000 al subirse y $1.000 por km. Y don Jairo apareció en la conversación. Todo iba tranquilo, hasta que Santi llegó pálido con una noticia de su primo." },
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Muchachos… mi primo quiere subir lo que cobra por km." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Calma. Para saber si es grave, primero pongamos todas las reglas en fila." },
              { who: "Camilo", avatar: CAMILO, text: "¿Y qué tienen en común?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Míralas: todas dan una recta. Pero unas arrancan en 0 y otras no 🤔" }
            ]
          },
          {
            type: "box",
            title: "Las reglas que llevamos",
            icon: "📋",
            text: "- Valentina: f(x) = 6x\n- Don Jairo: f(x) = 2.500x\n- Taxi del primo: f(x) = 1.500x + 4.000\n- Buseta: f(x) = 1.000x + 10.000"
          },
          {
            type: "line-lab",
            title: "Dos rectas, dos arranques",
            icon: "📈",
            text: "La línea continua es don Jairo; la punteada, el taxi del primo. Lleva el punto a 0 km y fíjate dónde arranca cada una.",
            x: { name: "Distancia", unit: "km", min: 0, max: 8, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 20000, step: 5000 },
            lines: [{ name: "Don Jairo", m: 2500, b: 0 }, { name: "Taxi del primo", m: 1500, b: 4000 }],
            probe: { initial: 4, step: 1 }
          },
          {
            type: "quiz",
            title: "¿Dónde arranca cada una?",
            icon: "🔍",
            text: "Evalúa cada regla en x = 0.",
            questions: [
              { type: "numeric", prompt: "Don Jairo: f(0) = ___", label: "Don Jairo en x igual a 0", answer: 0, hint: "Reemplaza x por 0 en f(x) = 2.500x.", explanation: "f(0) = 2.500 · 0 = 0: arranca en (0, 0)." },
              { type: "numeric", prompt: "Taxi del primo: f(0) = ___", label: "Taxi en x igual a 0", answer: 4000, hint: "Reemplaza x por 0: lo que multiplica a x desaparece.", explanation: "f(0) = 1.500 · 0 + 4.000 = 4.000: no arranca en 0." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa: ¿el doble de km cuesta el doble?",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "Don Jairo, 2 km: $___", label: "Don Jairo en 2 kilómetros", answer: 5000, hint: "Usa f(x) = 2.500x.", explanation: "f(2) = 2.500 · 2 = 5.000." },
              { type: "choice", prompt: "Con don Jairo, ¿el doble de km cuesta el doble?", options: ["Sí", "No"], answer: 0, hint: "Compara 5.000 con 10.000.", explanation: "10.000 es el doble de 5.000: el doble de km cuesta el doble." },
              { type: "numeric", prompt: "Taxi del primo, 2 km: $___", label: "Taxi en 2 kilómetros", answer: 7000, hint: "Usa f(x) = 1.500x + 4.000.", explanation: "f(2) = 1.500 · 2 + 4.000 = 7.000." },
              { type: "numeric", prompt: "Taxi del primo, 4 km: $___", label: "Taxi en 4 kilómetros", answer: 10000, hint: "Usa f(x) = 1.500x + 4.000.", explanation: "f(4) = 1.500 · 4 + 4.000 = 10.000." },
              { type: "choice", prompt: "Con el taxi del primo, ¿el doble de km cuesta el doble?", options: ["Sí", "No"], answer: 1, hint: "¿10.000 es el doble de 7.000?", explanation: "El doble de 7.000 sería 14.000, y 4 km cuestan 10.000. Los $4.000 de subirse se pagan una sola vez, por eso no se duplica." }
            ]
          },
          {
            type: "quiz",
            title: "¿Con qué números se arma cada regla?",
            icon: "🔍",
            text: "Todas tienen un número que **multiplica a x** y uno que **se suma**. Si no se suma nada, ese número es 0.",
            questions: [
              { type: "numeric", prompt: "Taxi, f(x) = 1.500x + 4.000: multiplica a x el ___", label: "Número que multiplica a x con el taxi", answer: 1500, hint: "Es el que está pegado a la x.", explanation: "El número pegado a la x es 1.500." },
              { type: "numeric", prompt: "Taxi, f(x) = 1.500x + 4.000: se suma ___", label: "Número que se suma con el taxi", answer: 4000, hint: "Es el que va solo.", explanation: "El número que va solo es 4.000." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Acabas de ver que **todas estas reglas dan una línea recta** y que todas se arman con dos números: uno que multiplica a x y otro que se suma. Para no repetir eso cada vez, les ponemos letras: el que multiplica es **m** y el que se suma es **b**. Toda recta se escribe entonces como **f(x) = mx + b**.\n\nSegún b, hay dos casos:\n\n- **Función lineal:** b = 0, así que f(x) = mx. La recta pasa por el origen y es proporcional: el doble de x da el doble de f(x). Ejemplos: Valentina, f(x) = 6x, y don Jairo, f(x) = 2.500x.\n- **Función afín:** b distinto de 0, así que f(x) = mx + b. La recta no pasa por el origen y no es proporcional. Ejemplos: el taxi del primo y la buseta.\n\n**¿Para qué sirven m y b?** Con esos dos números puedes dibujar una recta y compararla con otra, sin hacer una tabla entera. Hoy estudiamos m, y en la próxima sesión, b."
          },
          { type: "bridge", text: "«Ahora sí, Santi: ¿qué número quiere cambiar tu primo?». «El de $1.500». «O sea, m». Laura ya está dibujando." }
        ]
      },
      {
        id: "p1",
        title: "¡El primo subió la tarifa!",
        minutes: 8,
        contexts: ["taxi"],
        teacherKey: "$10.000 · $12.000 · a los 10 km: $19.000 y $24.000, diferencia $5.000. La tarifa nueva queda más inclinada y cada km suma $2.000.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Tranquilos, solo sube un poquito: de $1.500 a $2.000 por km." },
              { who: "Laura", avatar: LAURA, side: "me", text: "¿Un poquito? ¿Y en un viaje largo?" },
              { who: "Santi", avatar: SANTI, text: "Eh… casi ni se nota." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Eso lo vemos en la gráfica 😤" }
            ]
          },
          {
            type: "line-lab",
            title: "Las dos tarifas",
            icon: "📈",
            text: "La línea continua es la tarifa de hoy; la punteada, la nueva. Mueve el punto para leer las coordenadas.",
            x: KM,
            y: { name: "Valor", unit: "$", min: 0, max: 30000, step: 5000 },
            lines: [{ name: "Hoy", m: 1500, b: 4000 }, { name: "Nueva", m: 2000, b: 4000 }],
            probe: { initial: 4, step: 1 }
          },
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Con la tarifa de hoy, 4 km cuestan $___", label: "Valor de 4 km con la tarifa de hoy", answer: 10000, hint: "Mueve el punto hasta 4 km.", explanation: "1.500 × 4 + 4.000 = 10.000." },
              { type: "numeric", prompt: "Con la tarifa nueva, 4 km cuestan $___", label: "Valor de 4 km con la tarifa nueva", answer: 12000, hint: "Mira la coordenada de la línea punteada.", explanation: "2.000 × 4 + 4.000 = 12.000." },
              { type: "numeric", prompt: "A los 10 km, la tarifa nueva cuesta $___ más.", label: "Diferencia a los 10 kilómetros", answer: 5000, hint: "Lee los dos valores en 10 km y réstalos.", explanation: "A los 10 km, hoy cuesta $19.000 y con la nueva, $24.000: 24.000 − 19.000 = 5.000." }
            ]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "¿Cuál recta queda más inclinada?", options: ["La de hoy", "La nueva", "Son iguales"], answer: 1, hint: "¿Cuál sube más en el mismo trayecto?", explanation: "La nueva suma $2.000 por km y la de hoy, $1.500. La que más sube es la nueva." },
              { type: "numeric", prompt: "Con la tarifa nueva, cada km adicional suma $___", label: "Lo que suma cada kilómetro", answer: 2000, hint: "Compara el valor en dos kilómetros seguidos.", explanation: "La tarifa nueva cobra $2.000 por km, así que cada km adicional suma 2.000." },
              { type: "choice", prompt: "¿Santi tiene razón en que «casi ni se nota»?", options: ["Sí, la diferencia siempre es igual", "No, entre más largo el viaje, más se nota"], answer: 1, hint: "Compara la diferencia a los 2 km con la de los 10 km.", explanation: "A los 2 km la diferencia es $1.000 y a los 10 km, $5.000. Entre más largo el viaje, más se nota." }
            ]
          },
          { type: "bridge", text: "Laura quiere entender exactamente qué le pasa a la recta. Le quita el celular a Santi y empieza a mover la tarifa." }
        ]
      },
      {
        id: "p2",
        title: "Laura mueve la tarifa",
        minutes: 7,
        contexts: ["taxi"],
        teacherKey: "Más inclinada; horizontal. m = 1.500 en el taxi de hoy.",
        blocks: [
          {
            type: "line-lab",
            title: "Mueve lo que cobran por km",
            icon: "🎚️",
            text: "Lo que cobran al subirse no cambia. Mira qué le pasa a la recta.",
            x: KM,
            y: { name: "Valor", unit: "$", min: 0, max: 35000, step: 5000 },
            lines: [{ name: "Taxi", m: 1500, b: 4000, controls: { m: { label: "Cobro por km ($)", min: 0, max: 3000, step: 500 } } }]
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "Si aumentas lo que cobran por km, la recta queda…", options: ["más inclinada", "menos inclinada", "igual"], answer: 0, hint: "Mueve el control hacia la derecha.", explanation: "Si cada km cuesta más, la recta sube más en el mismo trayecto: queda más inclinada." },
              { type: "choice", prompt: "Si el cobro por km fuera $0, la recta quedaría…", options: ["muy inclinada", "horizontal", "cayendo"], answer: 1, hint: "Lleva el control hasta 0.", explanation: "Sin cobro por km, el valor no cambia con la distancia: la recta es horizontal." },
              { type: "numeric", prompt: "En f(x) = 1.500x + 4.000, el número que dice cuánto sube por cada km es ___", label: "Número que dice cuánto sube", answer: 1500, hint: "Es el que acompaña a la x.", explanation: "El número que acompaña a la x es 1.500: cada km suma $1.500." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "El número m se llama **pendiente**: es la variación de y por cada unidad que aumenta x.\n\nm = [[variación de y|variación de x]]\n\n**¿Para qué sirve?** Dice qué tan rápido cambia la función. Es el **cambio constante** de la Sesión 1: en el taxi, m = 1.500 porque cada km suma $1.500. En la gráfica se ve como la **inclinación** de la recta, es decir, qué tan rápido sube o baja: si m es positiva, entre más grande, más rápido sube."
          },
          { type: "bridge", text: "Santi intenta borrar la evidencia: elimina la tarifa de su chat. Pero Laura todavía tiene dos recibos." }
        ]
      },
      {
        id: "p3",
        title: "Dos recibos delatan al primo",
        minutes: 9,
        contexts: ["taxi"],
        teacherKey: "Recibos: m = 6.000/4 = 1.500. Con cualquier par de puntos del taxi, m = 1.500. Práctica: m = 3.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Ya no hay manera de saber cuánto cobraba por km 😎" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Tengo dos recibos: 2 km por $7.000 y 6 km por $13.000." },
              { who: "Camilo", avatar: CAMILO, text: "Uy, ¿con eso alcanza?" }
            ]
          },
          {
            type: "receipts",
            title: "Los recibos de Laura",
            icon: "🧾",
            items: [
              { number: "0142", who: "Beto", route: "Colegio → Centro", km: 2, total: 7000 },
              { number: "0187", who: "Ana", route: "Colegio → Terminal", km: 6, total: 13000 }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            title: "Investiga los recibos",
            icon: "🔍",
            text: "Cada recibo es un punto: (km, valor). Escribe los datos en la fracción, resta arriba y abajo, y después divide.",
            x: { name: "Distancia", unit: "km", min: 0, max: 8, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 16000, step: 4000 },
            points: [[2, 7000], [6, 13000]],
            hint: "Arriba van los valores: 13.000 − 7.000. Abajo van los km: 6 − 2. Luego resta y divide.",
            explanation: "Arriba: 13.000 − 7.000 = 6.000. Abajo: 6 − 2 = 4. Entonces m = [[6.000|4]] = 1.500: cada km costó $1.500."
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "Con dos puntos (x₁, y₁) y (x₂, y₂) de una recta se calcula la **pendiente**:\n\nm = [[y₂ − y₁|x₂ − x₁]]\n\nArriba va cuánto cambia y; abajo, cuánto cambia x. Con los recibos del taxi: m = [[13.000 − 7.000|6 − 2]] = [[6.000|4]] = 1.500."
          },
          {
            type: "slope",
            mode: "explore",
            title: "¿Importa cuáles puntos elijas?",
            icon: "🎚️",
            text: "Esta es la recta del taxi. Mueve los dos puntos y mira qué le pasa a la fracción.",
            x: { name: "Distancia", unit: "km", min: 0, max: 10, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 20000, step: 5000 },
            points: [[2, 7000], [6, 13000]],
            line: { m: 1500, b: 4000 }
          },
          {
            type: "quiz",
            variant: "think",
            questions: [
              { type: "choice", prompt: "Si eliges otros dos puntos de la misma recta, la pendiente…", options: ["cambia", "no cambia"], answer: 1, hint: "Mueve los puntos varias veces y mira el resultado final de la fracción.", explanation: "Arriba y abajo cambian, pero en la misma proporción: [[6.000|4]] y [[3.000|2]] dan 1.500. Por eso una recta tiene una sola pendiente." }
            ]
          },
          { type: "bridge", text: "Camilo mira su cuaderno: «A mí en una me dio negativo. ¿Está mal?». Laura le quita el lápiz: «Eso no es un error. Vamos a ver qué significa»." }
        ]
      },
      {
        id: "p3b",
        title: "¿De dónde sale el signo?",
        minutes: 7,
        contexts: [],
        teacherKey: "m = 2 (sube) · m = −2 (baja) · m = 0 (horizontal). Arriba queda positivo si sube, negativo si baja y cero si es horizontal; abajo siempre queda positivo al leer de izquierda a derecha.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "¿Una pendiente negativa? ¿Eso existe?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Miremos tres rectas: una que sube, una que baja y una plana." },
              { who: "Santi", avatar: SANTI, text: "¿Y una plana tiene pendiente?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Calcúlala y me cuentas 😏" }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            variant: "think",
            title: "Una que sube: (1, 3) y (3, 7)",
            icon: "🧩",
            x: { name: "x", unit: "", min: 0, max: 4, step: 1 },
            y: { name: "y", unit: "", min: 0, max: 8, step: 2 },
            points: [[1, 3], [3, 7]],
            hint: "Arriba van las y: y₂ − y₁. Abajo van las x: x₂ − x₁. Luego resta y divide.",
            explanation: "m = [[7 − 3|3 − 1]] = [[4|2]] = 2."
          },
          {
            type: "slope",
            mode: "solve",
            variant: "think",
            title: "Una que baja: (0, 5) y (2, 1)",
            icon: "🧩",
            x: { name: "x", unit: "", min: 0, max: 3, step: 1 },
            y: { name: "y", unit: "", min: 0, max: 6, step: 2 },
            points: [[0, 5], [2, 1]],
            hint: "Cuidado con el orden: arriba es 1 − 5, y eso da un número negativo.",
            explanation: "m = [[1 − 5|2 − 0]] = [[−4|2]] = −2. El signo − dice que la recta baja."
          },
          {
            type: "slope",
            mode: "solve",
            variant: "think",
            title: "Una plana: (1, 4) y (3, 4)",
            icon: "🧩",
            x: { name: "x", unit: "", min: 0, max: 4, step: 1 },
            y: { name: "y", unit: "", min: 0, max: 6, step: 2 },
            points: [[1, 4], [3, 4]],
            hint: "Los dos puntos tienen la misma y. ¿Cuánto da arriba?",
            explanation: "m = [[4 − 4|3 − 1]] = [[0|2]] = 0. La recta no sube ni baja."
          },
          {
            type: "quiz",
            variant: "think",
            title: "¿Qué tienen en común?",
            icon: "🧩",
            text: "Mira tus resultados: 2, −2 y 0. En los tres, de izquierda a derecha, x aumenta, así que abajo quedó un número positivo.",
            questions: [
              { type: "choice", prompt: "Si la recta **sube**, arriba en la fracción queda un número…", options: ["positivo", "negativo", "cero"], answer: 0, hint: "Mira el ejercicio de (1, 3) y (3, 7): ¿qué te dio arriba?", explanation: "Si sube, y₂ es mayor que y₁: la resta da positiva. Con (1, 3) y (3, 7), arriba da 7 − 3 = 4." },
              { type: "choice", prompt: "Si la recta **baja**, arriba queda un número…", options: ["positivo", "negativo", "cero"], answer: 1, hint: "Mira el ejercicio de (0, 5) y (2, 1): ¿qué te dio arriba?", explanation: "Si baja, y₂ es menor que y₁: la resta da negativa. Con (0, 5) y (2, 1), arriba da 1 − 5 = −4." },
              { type: "choice", prompt: "Si la recta es **horizontal**, arriba queda…", options: ["un número positivo", "un número negativo", "cero"], answer: 2, hint: "Mira el ejercicio de (1, 4) y (3, 4).", explanation: "Si es horizontal, y₂ es igual a y₁: la resta da 0. Con (1, 4) y (3, 4), arriba da 4 − 4 = 0." }
            ]
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "**¿De dónde sale el signo de la pendiente?** De la fracción. Si lees la recta de izquierda a derecha, x aumenta y abajo siempre queda un número positivo. Entonces el signo lo decide lo de arriba:\n\n- ▲ **Si y aumenta,** arriba queda positivo y m es **positiva**: [[4|2]] = 2. La recta sube.\n- ▼ **Si y disminuye,** arriba queda negativo y m es **negativa**: [[−4|2]] = −2. La recta baja.\n- ■ **Si y no cambia,** arriba queda 0 y **m = 0**: [[0|2]] = 0. La recta es horizontal."
          },
          { type: "bridge", text: "¿Una recta que baja? Eso mismo le está pasando a la plata del curso." }
        ]
      },
      {
        id: "p4",
        title: "La plata del curso se está acabando",
        minutes: 9,
        contexts: ["fund", "raffle"],
        teacherKey: "$40.000 · semana 12 · m = −20.000/4 = −5.000 · negativa. Clasificar: suben 3x + 1 y 0,5x; bajan −2x + 5 y −x + 4; horizontales f(x) = 5 y f(x) = 7.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Camilo", avatar: CAMILO, text: "Con la rifa juntamos $60.000 para el fondo." },
              { who: "Valentina", avatar: VALENTINA, side: "me", text: "Sí, pero cada semana sacamos $5.000 para refrigerios 😬" },
              { who: "Camilo", avatar: CAMILO, text: "¿Y hasta cuándo alcanza?" }
            ]
          },
          {
            type: "line-lab",
            title: "El fondo del curso",
            icon: "📉",
            x: { name: "Tiempo", unit: "sem", min: 0, max: 14, step: 2 },
            y: { name: "Plata", unit: "$", min: 0, max: 70000, step: 10000 },
            lines: [{ name: "Fondo", m: -5000, b: 60000 }],
            probe: { initial: 2, step: 1 }
          },
          {
            type: "quiz",
            title: "Lectura rápida",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "En la semana 4 quedan $___", label: "Plata en la semana 4", answer: 40000, hint: "Mueve el punto hasta 4 semanas.", explanation: "60.000 − 5.000 × 4 = 40.000." },
              { type: "numeric", prompt: "La plata se acaba en la semana ___", label: "Semana en que se acaba", answer: 12, hint: "Busca dónde la recta toca el eje horizontal.", explanation: "60.000 ÷ 5.000 = 12 semanas." }
            ]
          },
          {
            type: "slope",
            mode: "solve",
            title: "Calcula la pendiente del fondo",
            icon: "🧮",
            text: "Toma dos momentos del fondo: la semana 0 y la semana 4.",
            x: { name: "Tiempo", unit: "sem", min: 0, max: 8, step: 2 },
            y: { name: "Plata", unit: "$", min: 0, max: 70000, step: 10000 },
            points: [[0, 60000], [4, 40000]],
            hint: "Arriba: la plata de la semana 4 menos la de la semana 0. Abajo: 4 − 0.",
            explanation: "m = [[40.000 − 60.000|4 − 0]] = [[−20.000|4]] = −5.000. Cada semana el fondo baja $5.000."
          },
          {
            type: "quiz",
            variant: "think",
            title: "Ahora piensa",
            icon: "🧩",
            questions: [
              { type: "choice", prompt: "La pendiente de esta recta es…", options: ["positiva", "negativa", "cero"], answer: 1, hint: "¿La recta sube o baja de izquierda a derecha?", explanation: "La plata baja a medida que pasan las semanas: la recta baja y su pendiente es negativa." }
            ]
          },
          {
            type: "line-lab",
            title: "Mueve la pendiente",
            icon: "🎚️",
            text: "Pon m en un número positivo, luego en uno negativo y luego en 0. Mira qué hace la recta.",
            x: { name: "x", unit: "", min: -4, max: 4, step: 2 },
            y: { name: "y", unit: "", min: -8, max: 8, step: 4 },
            lines: [{ name: "Tu recta", m: 1, b: 1, controls: { m: { label: "m", min: -3, max: 3, step: 1 } } }]
          },
          {
            type: "classify",
            title: "¿Y en la vida diaria?",
            icon: "🎮",
            text: "Clasifica cada situación según lo que pasa al avanzar la variable independiente.",
            hint: "Pregúntate: mientras pasa el tiempo o aumenta la cantidad, ¿el valor aumenta, disminuye o no cambia?",
            explanation: "Aumentan los ahorros y el valor de la carrera. Disminuyen la batería en uso y el agua de un tanque que se desocupa. No cambian el pago mensual de internet según los días y el pasaje fijo según los km.",
            cards: [
              { id: "s1", text: "Ahorros en la alcancía, si guardas lo mismo cada semana" },
              { id: "s2", text: "Valor de la carrera de taxi, según los km" },
              { id: "s3", text: "Batería del celular mientras lo usas" },
              { id: "s4", text: "Agua en un tanque que se desocupa" },
              { id: "s5", text: "Pago mensual de internet, según los días que lo uses" },
              { id: "s6", text: "Pasaje de bus de tarifa fija, según los km" }
            ],
            bins: [
              { id: "up", title: "▲ Sube" },
              { id: "down", title: "▼ Baja" },
              { id: "flat", title: "■ Se mantiene" }
            ],
            solution: { s1: "up", s2: "up", s3: "down", s4: "down", s5: "flat", s6: "flat" }
          },
          {
            type: "box",
            variant: "naming",
            title: "Concepto clave",
            icon: "🧠",
            text: "- **Función creciente:** cuando x aumenta, f(x) aumenta. Ocurre si **m > 0**.\n- **Función decreciente:** cuando x aumenta, f(x) disminuye. Ocurre si **m < 0**.\n- **Función constante:** cuando x aumenta, f(x) no cambia. Ocurre si **m = 0**, y su gráfica es una recta horizontal."
          },
          { type: "bridge", text: "Con las gráficas en la mano, el curso va a hablar con el primo de Santi." }
        ]
      },
      {
        id: "p5",
        title: "Laura le muestra la gráfica al primo",
        minutes: 8,
        contexts: ["taxi", "jairo", "trip"],
        teacherKey: "4 km: $12.000 con la tarifa nueva, $10.000 con don Jairo. Cuestan igual en 8 km. Hasta 8 km conviene don Jairo. Preguntas de cierre: orales.",
        blocks: [
          {
            type: "chat",
            messages: [
              { who: "Laura", avatar: LAURA, side: "me", text: "Santi, llámalo. Tu primo tiene que ver esto." },
              { who: "Santi", avatar: SANTI, text: "¿Qué cosa?" },
              { who: "Laura", avatar: LAURA, side: "me", text: "Con $2.000 por km, en los viajes cortos le gana don Jairo." }
            ]
          },
          {
            type: "line-lab",
            title: "La tarifa nueva contra don Jairo",
            icon: "📈",
            text: "La línea continua es el primo con la tarifa nueva; la punteada, don Jairo. Mueve el punto y lee las coordenadas.",
            x: { name: "Distancia", unit: "km", min: 0, max: 10, step: 2 },
            y: { name: "Valor", unit: "$", min: 0, max: 30000, step: 5000 },
            lines: [{ name: "Primo, tarifa nueva", m: 2000, b: 4000 }, { name: "Don Jairo", m: 2500, b: 0 }],
            probe: { initial: 4, step: 1 }
          },
          {
            type: "quiz",
            variant: "think",
            title: "¿Quién gana?",
            icon: "🧩",
            questions: [
              { type: "numeric", prompt: "Con 4 km, la tarifa nueva cuesta $___", label: "Tarifa nueva en 4 kilómetros", answer: 12000, hint: "Mueve el punto hasta 4 km.", explanation: "2.000 · 4 + 4.000 = 12.000." },
              { type: "numeric", prompt: "Con 4 km, don Jairo cobra $___", label: "Don Jairo en 4 kilómetros", answer: 10000, hint: "Mira la coordenada de la línea punteada.", explanation: "2.500 · 4 = 10.000." },
              { type: "numeric", prompt: "Los dos cobran lo mismo con ___ km.", label: "Kilómetros donde cobran igual", answer: 8, hint: "Mueve el punto hasta que las dos coordenadas coincidan.", explanation: "Con 8 km: 2.000 · 8 + 4.000 = 20.000 y 2.500 · 8 = 20.000." },
              { type: "choice", prompt: "En un viaje de menos de esa distancia, ¿quién sale más barato?", options: ["El primo, con la tarifa nueva", "Don Jairo"], answer: 1, hint: "Mira cuál recta va por debajo en 2 km o en 4 km.", explanation: "Antes de 8 km, la recta de don Jairo va por debajo: cobra menos." }
            ]
          },
          {
            type: "chat",
            messages: [
              { who: "Santi", avatar: SANTI, text: "Mi primo vio la gráfica y se quedó callado. Dice que deja los $1.500 por km… para no perder carreras." },
              { who: "Laura", avatar: LAURA, side: "me", text: "Una recta menos inclinada, un cliente más contento 😌" },
              { who: "Camilo", avatar: CAMILO, text: "¿Y si votamos por don Jairo?" },
              { who: "Santi", avatar: SANTI, text: "No se puede: él solo trabaja dentro de la ciudad. Solo nos queda elegir entre el taxi y la buseta." }
            ]
          },
          {
            type: "box",
            title: "Para cerrar",
            icon: "🏁",
            text: "- ¿Qué te dice la pendiente de una recta? Explícalo con el taxi.\n- Inventa una situación con pendiente positiva y otra con pendiente negativa.\n- ¿Qué fue lo más fácil y lo más difícil de hoy?"
          },
          { type: "mission", id: "trip", hintsUpTo: 4 }
        ]
      },
      {
        id: "independent",
        title: "Trabajo independiente",
        minutes: 0,
        contexts: [],
        teacherKey: "f(0): Valentina 0, buseta 10.000. Don Jairo: multiplica 2.500, se suma 0. Clasificar: por el origen 6x, 2.500x y −3x. Pendiente de (−1, −2) y (1, 4): 3. Don Jairo en 4 km: $10.000.",
        blocks: [
          { type: "box", title: "Para practicar por tu cuenta", icon: "🏠", text: "Esta parte es para fuera de clase: refuerza lo que viste hoy. No hace falta para seguir con la siguiente sesión." },
          { type: "box", title: "Las reglas que llevamos", icon: "📋", text: "- Valentina: f(x) = 6x\n- Don Jairo: f(x) = 2.500x\n- Taxi del primo: f(x) = 1.500x + 4.000\n- Buseta: f(x) = 1.000x + 10.000" },
          {
            type: "quiz",
            title: "Sigue con las reglas",
            icon: "🔍",
            questions: [
              { type: "numeric", prompt: "Valentina: f(0) = ___", label: "Valentina en x igual a 0", answer: 0, hint: "Reemplaza x por 0 en f(x) = 6x.", explanation: "f(0) = 6 · 0 = 0: arranca en (0, 0)." },
              { type: "numeric", prompt: "Buseta: f(0) = ___", label: "Buseta en x igual a 0", answer: 10000, hint: "Reemplaza x por 0: lo que multiplica a x desaparece.", explanation: "f(0) = 1.000 · 0 + 10.000 = 10.000: no arranca en 0." },
              { type: "numeric", prompt: "Don Jairo, f(x) = 2.500x: multiplica a x el ___", label: "Número que multiplica a x con don Jairo", answer: 2500, hint: "Es el que está pegado a la x.", explanation: "El número pegado a la x es 2.500." },
              { type: "numeric", prompt: "Don Jairo, f(x) = 2.500x: se suma ___", label: "Número que se suma con don Jairo", answer: 0, hint: "¿Se le está sumando algo?", explanation: "No se le suma nada: ese número es 0." },
              { type: "numeric", prompt: "Don Jairo, 4 km: $___", label: "Don Jairo en 4 kilómetros", answer: 10000, hint: "Usa f(x) = 2.500x.", explanation: "f(4) = 2.500 · 4 = 10.000." }
            ]
          },
          {
            type: "classify",
            title: "¿Pasa por el origen?",
            icon: "🎮",
            hint: "Evalúa cada regla en x = 0: ¿da 0?",
            explanation: "Si no se le suma nada, f(0) = 0 y la recta pasa por el origen: 6x, 2.500x y −3x. Si se le suma un número, f(0) es ese número: 1.500x + 4.000, 1.000x + 10.000 y 2x + 3.",
            cards: [
              { id: "l1", text: "f(x) = 6x" },
              { id: "a1", text: "f(x) = 1.500x + 4.000" },
              { id: "l2", text: "f(x) = 2.500x" },
              { id: "a2", text: "f(x) = 1.000x + 10.000" },
              { id: "l3", text: "f(x) = −3x" },
              { id: "a3", text: "f(x) = 2x + 3" }
            ],
            bins: [
              { id: "linear", title: "Sí pasa por (0, 0)" },
              { id: "affine", title: "No pasa por (0, 0)" }
            ],
            solution: { l1: "linear", l2: "linear", l3: "linear", a1: "affine", a2: "affine", a3: "affine" }
          },
          {
            type: "slope",
            mode: "solve",
            variant: "think",
            title: "Ahora tú: (−1, −2) y (1, 4)",
            icon: "🧩",
            x: { name: "x", unit: "", min: -2, max: 2, step: 1 },
            y: { name: "y", unit: "", min: -4, max: 6, step: 2 },
            points: [[-1, -2], [1, 4]],
            hint: "Restar un negativo es sumar: 4 − (−2) = 4 + 2.",
            explanation: "m = [[4 − (−2)|1 − (−1)]] = [[6|2]] = 3."
          },
          {
            type: "classify",
            title: "¿Sube, baja o se queda?",
            icon: "🎮",
            hint: "Mira el número que acompaña a la x, con su signo. Si no hay x, ese número es 0.", explanation: "Se mira el número que acompaña a la x. 3 y 0,5 son positivos: suben. −2 y −1 son negativos: bajan. f(x) = 5 y f(x) = 7 no tienen x: son horizontales.",
            cards: [
              { id: "u1", text: "f(x) = 3x + 1" },
              { id: "d1", text: "f(x) = −2x + 5" },
              { id: "f1", text: "f(x) = 5" },
              { id: "u2", text: "f(x) = 0,5x" },
              { id: "d2", text: "f(x) = −x + 4" },
              { id: "f2", text: "f(x) = 7" }
            ],
            bins: [
              { id: "up", title: "▲ Sube" },
              { id: "down", title: "▼ Baja" },
              { id: "flat", title: "■ Horizontal" }
            ],
            solution: { u1: "up", u2: "up", d1: "down", d2: "down", f1: "flat", f2: "flat" }
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
              { term: "Función lineal", definition: "Forma f(x) = mx. Recta que pasa por el origen y es proporcional. Ejemplo: f(x) = 6x." },
              { term: "Función afín", definition: "Forma f(x) = mx + b, con b distinto de 0. Recta que no pasa por el origen. Ejemplo: f(x) = 1.500x + 4.000." },
              { term: "Pendiente (m)", definition: "Variación de y por cada unidad que aumenta x. En la gráfica, es la inclinación de la recta." },
              { term: "Cálculo con dos puntos", definition: "m = [[y₂ − y₁|x₂ − x₁]]" },
              { term: "Función creciente", definition: "Cuando x aumenta, f(x) aumenta: m > 0." },
              { term: "Función decreciente", definition: "Cuando x aumenta, f(x) disminuye: m < 0." },
              { term: "Función constante", definition: "Cuando x aumenta, f(x) no cambia: m = 0." }
            ]
          },
          { type: "bridge", text: "Al otro día, Santi llega feliz con una noticia: «¡Mi primo tiene una oferta!». Y Laura ya tiene las cejas levantadas." }
        ]
      }
    ]
  };
})();
