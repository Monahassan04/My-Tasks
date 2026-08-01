const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function addGrade(studentName, subject, grade) {
    const grades = readGrades();
    const newGrade = {
        id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
        studentName,
        subject,
        grade
    };
    grades.push(newGrade);
    saveGrades(grades);
    console.log(`Grade added for ${studentName} (${subject}): ${grade}`);
    return newGrade;
}

module.exports = addGrade;