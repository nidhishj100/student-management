// Simulating an ArrayList linear data structure in JS
let studentList = [
    { id: 101, name: "Nidhish J", department: "CSE", marks: 88.5 },
    { id: 102, name: "Mohammed S", department: "CSE", marks: 91.0 }
];

const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');

function renderTable() {
    tableBody.innerHTML = '';
    if (studentList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888;">No student records found in memory.</td></tr>`;
        return;
    }
    studentList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('studentId').value);
    const name = document.getElementById('studentName').value;
    const department = document.getElementById('studentDept').value;
    const marks = parseFloat(document.getElementById('studentMarks').value);

    // Linear insertion
    studentList.push({ id, name, department, marks });
    renderTable();
    form.reset();
});

function deleteStudent(index) {
    // Linear deletion by index
    studentList.splice(index, 1);
    renderTable();
}

function clearSystem() {
    studentList = [];
    renderTable();
}

// Initial render
renderTable();