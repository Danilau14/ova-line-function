/* Course sessions and the presentation shown on the home page. Set available:true once data/sessionN.js exists. */
OVA.data.course = {
  sessions: [
    { id: 1, title: "Variables, gráficas y cambio", available: true },
    { id: 2, title: "Concepto de función", available: true },
    { id: 3, title: "Las caras de una función", available: true },
    { id: 4, title: "La pendiente: ¿qué tan inclinada?", available: true },
    { id: 5, title: "El intercepto: ¿desde dónde arranca?", available: true },
    { id: 6, title: "La votación: comparar y decidir", available: true },
    { id: 7, title: "Cierre: la regla y la evaluación", available: true }
  ],
  about: "¿Taxi o buseta? El curso de 9.º planea una salida y nadie se pone de acuerdo. Sigue la historia y usa las **funciones lineales y afines** para leer gráficas, comparar costos y ayudar a decidir.",
  objectives: [
    {
      icon: "🧩",
      title: "Objetivo 1 · Concepto de función",
      text: "Reconocer el concepto general de función como una regla de correspondencia unívoca (a cada entrada le corresponde exactamente una salida), diferenciando las variables dependiente e independiente en contextos cotidianos o tabulares.",
      expected: "Explicar qué es una función y señalar sus entradas y salidas.",
      sessions: [1, 2, 3]
    },
    {
      icon: "📐",
      title: "Objetivo 2 · Parámetros *m* y *b*",
      text: "Relacionar los cambios en los parámetros *m* y *b* de f(x) = mx + b con las modificaciones visuales y geométricas de su gráfica, mediante exploración interactiva.",
      expected: "Explicar qué le pasa a la gráfica cuando la pendiente o el intercepto aumentan, disminuyen o se vuelven negativos.",
      sessions: [4, 5]
    },
    {
      icon: "🚌",
      title: "Objetivo 3 · Modelación",
      text: "Resolver situaciones problemáticas contextualizadas modelándolas con f(x) = mx + b, con apoyo del recurso interactivo.",
      expected: "Plantear la función de una situación, resolverla y argumentar si el resultado es válido.",
      sessions: [6, 7]
    }
  ],
  objectivesNote: "La evaluación final de la Sesión 7 revisa los tres objetivos.",
  organization: {
    intro: "Son 7 sesiones y una sola historia, así que lo mejor es seguirlas en orden. En cada sesión encontrarás:",
    steps: [
      { icon: "💬", title: "La historia", text: "Lo que le va pasando al curso, contado en chats y escenas." },
      { icon: "✏️", title: "Actividades", text: "Respondes y revisas, sin cronómetro. Si te equivocas, recibes una pista y, si sigues sin lograrlo, puedes ver cómo se resuelve." },
      { icon: "🧠", title: "Concepto clave", text: "La definición formal de lo que acabas de trabajar." },
      { icon: "🎒", title: "Trabajo independiente", text: "Más práctica para hacer por tu cuenta (en todas las sesiones, menos en la 6)." },
      { icon: "📌", title: "Resumen de conceptos", text: "Lo más importante de la sesión, al final." }
    ],
    note: "El OVA funciona sin internet. Tus respuestas no se guardan; solo el resultado de la evaluación final puede quedar registrado, si entras desde la plataforma del colegio."
  }
};
