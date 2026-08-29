const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/grades.json");

function saveGrades(grades) {
    fs.writeFileSync(dataPath, JSON.stringify(grades, null, 2), "utf-8");
}

module.exports = saveGrades;