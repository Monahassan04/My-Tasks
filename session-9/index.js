const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, "data", "courses-data.json");

app.use(express.json());

function readCourses() {
    try {
        return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    } catch {
        return [];
    }
}

function writeCourses(courses) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(courses, null, 2));
}


app.get("/api/v1/courses", (req, res) => {
    const courses = readCourses();
    res.status(200).json({
        status: "success",
        count: courses.length,
        data: courses,
    });
});


app.get("/api/v1/courses/:id", (req, res) => {
    const courses = readCourses();
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);

    if (!course) {
        return res.status(404).json({ status: "error", message: "Course not found" });
    }

    res.status(200).json({ status: "success", data: course });
});

app.post("/api/v1/courses", (req, res) => {
    const { title, instructor, price } = req.body;

    if (!title || !instructor || price === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields: title, instructor, price",
        });
    }

    const courses = readCourses();
    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        title,
        instructor,
        price,
    };

    courses.push(newCourse);
    writeCourses(courses);

    res.status(201).json({
        status: "success",
        message: "Course added",
        data: newCourse,
    });
});
app.put("/api/v1/courses/:id", (req, res) => {
    const courses = readCourses();
    const id = parseInt(req.params.id);
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ status: "error", message: "Course not found" });
    }

    const { title, instructor, price } = req.body;
    courses[index] = {
        id: courses[index].id,
        title: title || courses[index].title,
        instructor: instructor || courses[index].instructor,
        price: price !== undefined ? price : courses[index].price,
    };

    writeCourses(courses);

    res.status(200).json({
        status: "success",
        message: "Course updated",
        data: courses[index],
    });
});

app.patch("/api/v1/courses/:id", (req, res) => {
    const courses = readCourses();
    const id = parseInt(req.params.id);
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ status: "error", message: "Course not found" });
    }

    courses[index] = { ...courses[index], ...req.body };
    writeCourses(courses);

    res.status(200).json({
        status: "success",
        message: "Course updated",
        data: courses[index],
    });
});

app.delete("/api/v1/courses/:id", (req, res) => {
    const courses = readCourses();
    const id = parseInt(req.params.id);
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ status: "error", message: "Course not found" });
    }

    const deleted = courses.splice(index, 1);
    writeCourses(courses);

    res.status(200).json({
        status: "success",
        message: "Course deleted",
        data: deleted[0],
    });
});

app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`GET/api/v1/courses - Get all courses`);
    console.log(`GET/api/v1/courses/:id - Get a course by ID`);
    console.log(`POST/api/v1/courses - Add a new course`);
    console.log(`PUT/api/v1/courses/:id - Update a course (full)`);
    console.log(`PATCH/api/v1/courses/:id - Update a course (partial)`);
    console.log(`DELETE/api/v1/courses/:id - Delete a course`);
});