module.exports.getSheetData = (data) => {
  if (!data) return;
  const headerIndex = data.findIndex((raw) => raw[0] == "Equipment");
  if (headerIndex === -1) return data;
  return data.splice(headerIndex);
};
