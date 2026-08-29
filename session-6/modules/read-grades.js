const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/grades.json");

function readGrades() {
    try {
        const data = fs.readFileSync(dataPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

module.exports = readGrades;