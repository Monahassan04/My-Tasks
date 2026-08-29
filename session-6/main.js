const addGrade = require("./modules/add.grade");
const readGrades = require("./modules/read.grades");
const updateGrade = require("./modules/update.grade");
const deleteGrade = require("./modules/delete.grade");

console.log("=== Student Grades Manager ===\n");

addGrade("Esraa", "Math", 95);
addGrade("Ahmed", "Science", 88);
addGrade("Sara", "English", 92);

console.log("\n All Grades:");
console.log(readGrades());

updateGrade(2, { grade: 90 });

deleteGrade(3);

console.log("\n Final Grades:");
console.log(readGrades());