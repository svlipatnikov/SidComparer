const xlsx = require("xlsx");
const { SHEETS } = require("./static");
const { getSheetData } = require("./helpers");

module.exports.sidRead = (path) => {
  console.log(`Reading ${path}`);

  const excelData = xlsx.readFile(path);
  const resultData = {};

  Object.entries(SHEETS).forEach(([key, name]) => {
    const sheetData = getSheetData(
      xlsx.utils.sheet_to_json(excelData.Sheets[name], { header: 1 })
    ).map((r) => r.join(" "));

    if (sheetData && sheetData.length) {
      const headerIndex = sheetData.findIndex((r) => r.includes("Application"));
      resultData[key] = sheetData.slice(headerIndex);
    }
  });

  return resultData;
};
