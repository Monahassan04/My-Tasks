const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function deleteGrade(id) {
    const grades = readGrades();
    const index = grades.findIndex(g => g.id === id);
    
    if (index === -1) {
        console.log(`Grade with ID ${id} not found`);
        return false;
    }
    
    const removed = grades.splice(index, 1);
    saveGrades(grades);
    console.log(`Grade for ${removed[0].studentName} deleted successfully`);
    return true;
}

module.exports = deleteGrade;