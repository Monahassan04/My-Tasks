const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function updateGrade(id, newGrade) {
    const grades = readGrades();
    const index = grades.findIndex(g => g.id === id);
    
    if (index === -1) {
        console.log(`Grade with ID ${id} not found`);
        return null;
    }
    
    grades[index] = { ...grades[index], ...newGrade };
    saveGrades(grades);
    console.log(`Grade ID ${id} updated successfully`);
    return grades[index];
}

module.exports = updateGrade;