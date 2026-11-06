Cómo abrirlo: doble clic en index.html. No necesita internet ni instalar nada.
Modo docente (muestra las claves y todas las explicaciones): no tiene botón, para que los estudiantes no lo encuentren. Abre index.html y agrega ?teacher=1 a la dirección, o guárdala en favoritos. Dentro del modo aparece «Salir».
Añadir una página: agrega un objeto a "pages" en data/sessionN.js (ver data/session1.js).
Añadir un componente: crea js/components/name.js con OVA.register("name", { render(data, services) }), su css y sus etiquetas en session.html.
Autora y licencia: Laura Daniela Pumarejo García, CC BY 4.0 (css/images/cc-by.png es el logo oficial de Creative Commons).
SCORM: para Moodle, cuando el OVA esté terminado, ejecuta node tools/build-scorm.cjs --zip: actualiza imsmanifest.xml y crea el paquete ova-funciones-scorm.zip en la carpeta OVA-documentos, listo para subir. La evaluación final de la Sesión 7 tiene un solo botón de envío: manda el porcentaje de aciertos y marca la actividad como completada.
Fuente: Didact Gothic, licencia SIL OFL (css/fonts/OFL.txt).
