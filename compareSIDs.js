const { sidRead } = require("./read-sid");
const { SHEETS } = require("./static");
const fs = require("fs");

console.log("Start SIDs comparer app...");

const logDiffs =
  !!process.argv.slice(2).length && process.argv.slice(2)[0] === "log";
console.log("Log diff =", logDiffs);

const sidsDir = "../SIDS";
const fileNames = fs.readdirSync(sidsDir);
console.log("find SIDs:", fileNames);

if (!fileNames || fileNames.length < 2)
  return console.log("Nothing to compare...");

const sids = fileNames.map((file) => sidRead("../SIDS/" + file));

Object.keys(SHEETS).forEach((sheet) => {
  const sheet1 = sids[0][sheet];
  sids.forEach((sid, index) => {
    if (!index) return;
    const isSameLength = sheet1.length === sid[sheet].length;

    let isSame = true;
    sheet1.forEach((el, i) => {
      if (el !== sid[sheet][i]) {
        isSame = false;
        if (logDiffs && isSameLength) console.log("ERROR: ", el);
      }
    });

    console.log(
      SHEETS[sheet],
      " ===>>> ",
      !isSameLength ? "Different SIZES" : isSame ? "OK" : "Different VALUES"
    );
  });
});
