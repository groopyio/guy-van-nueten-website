const fs = require("fs");
const path = require("path");
const { parse } = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputDir = path.join(__dirname, "..", "content/samples");
const outputFile = path.join(__dirname, "..", "content/samples_export.csv");

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".json"));

const rows = [];
let allKeys = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(inputDir, file), "utf8");
  const data = JSON.parse(content);

  if (Array.isArray(data.genres)) {
    data.genres = data.genres.join(",");
  }

  rows.push(data);
  Object.keys(data).forEach((k) => allKeys.add(k));
}

allKeys = Array.from(allKeys);

const csvWriter = createCsvWriter({
  path: outputFile,
  header: allKeys.map((key) => ({ id: key, title: key })),
});

csvWriter.writeRecords(rows).then(() => {
  console.log(`✅ CSV geëxporteerd naar ${outputFile}`);
});
