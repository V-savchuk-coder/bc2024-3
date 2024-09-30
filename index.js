const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .requiredOption("-i, --input <file>", "input file path")
  .option("-o, --output <file>", "output file path")
  .option("-d, --display", "display result in console");

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читання даних з JSON
const data = JSON.parse(fs.readFileSync(options.input, "utf-8"));

// Знаходження максимального курсу
let maxRate = Math.max(...data.map(item => item.rate));

// Форматування результату
const result = `Максимальний курс: ${maxRate}`;

// Виведення результату у консоль, якщо задано параметр -d
if (options.display) {
  console.log(result);
}

// Запис результату у файл, якщо задано параметр -o
if (options.output) {
  fs.writeFileSync(options.output, result);
}
