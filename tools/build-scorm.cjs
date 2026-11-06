// Writes imsmanifest.xml (SCORM 1.2) listing every file of the OVA. Run it again whenever files change.
// With --zip it also packs the file to upload to the platform.
// Usage: node tools/build-scorm.cjs [--zip [output.zip]]
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const SKIP = new Set([".git", "tools", "imsmanifest.xml"]);
const TITLE = "Funciones: explorando cambios";
const AUTHOR = "Laura Daniela Pumarejo García";

function listFiles(dir, prefix) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (SKIP.has(entry.name)) return [];
    const relative = prefix ? prefix + "/" + entry.name : entry.name;
    return entry.isDirectory() ? listFiles(path.join(dir, entry.name), relative) : [relative];
  });
}

const files = listFiles(root, "").sort();
const entries = files.map((file) => `      <file href="${file}"/>`).join("\n");

const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="OVA-FUNCIONES-LINEALES" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    <imsmd:lom>
      <imsmd:general>
        <imsmd:title><imsmd:langstring xml:lang="es-CO">${TITLE}</imsmd:langstring></imsmd:title>
        <imsmd:language>es-CO</imsmd:language>
        <imsmd:description><imsmd:langstring xml:lang="es-CO">Objeto virtual de aprendizaje de matemáticas para grado 9.º sobre funciones lineales y afines, f(x) = mx + b. Funciona sin conexión.</imsmd:langstring></imsmd:description>
        <imsmd:keyword><imsmd:langstring xml:lang="es-CO">función lineal; función afín; pendiente; intercepto; grado 9</imsmd:langstring></imsmd:keyword>
      </imsmd:general>
      <imsmd:lifecycle>
        <imsmd:contribute>
          <imsmd:role><imsmd:source><imsmd:langstring xml:lang="x-none">LOMv1.0</imsmd:langstring></imsmd:source><imsmd:value><imsmd:langstring xml:lang="x-none">Author</imsmd:langstring></imsmd:value></imsmd:role>
          <imsmd:centity><imsmd:vcard>BEGIN:VCARD VERSION:2.1 FN:${AUTHOR} END:VCARD</imsmd:vcard></imsmd:centity>
        </imsmd:contribute>
      </imsmd:lifecycle>
      <imsmd:rights>
        <imsmd:description><imsmd:langstring xml:lang="es-CO">Creative Commons Atribución 4.0 Internacional (CC BY 4.0). https://creativecommons.org/licenses/by/4.0/deed.es</imsmd:langstring></imsmd:description>
      </imsmd:rights>
    </imsmd:lom>
  </metadata>
  <organizations default="ORG-1">
    <organization identifier="ORG-1">
      <title>${TITLE}</title>
      <item identifier="ITEM-1" identifierref="RES-1">
        <title>${TITLE}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-1" type="webcontent" adlcp:scormtype="sco" href="index.html">
${entries}
    </resource>
  </resources>
</manifest>
`;

fs.writeFileSync(path.join(root, "imsmanifest.xml"), manifest);
console.log("imsmanifest.xml: " + files.length + " files");

const zipFlag = process.argv.indexOf("--zip");
if (zipFlag !== -1) {
  const output = path.resolve(process.argv[zipFlag + 1] || path.join(root, "..", "OVA-documentos", "ova-funciones-scorm.zip"));
  fs.rmSync(output, { force: true });
  execFileSync("tar", ["-a", "-c", "-f", output, "-C", root, "imsmanifest.xml", ...files], { stdio: "inherit" });
  console.log(output);
}
