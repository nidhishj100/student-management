let studentList = [
    { id: 101, name: "Nidhish J", department: "CSE", marks: 92.5 },
    { id: 102, name: "Mohammed S", department: "CSE", marks: 88.0 },
    { id: 103, name: "Razal Ahammed", department: "CSE", marks: 95.5 }
];

const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const totalCountEl = document.getElementById('totalCount');
const avgMarksEl = document.getElementById('avgMarks');
const topStudentEl = document.getElementById('topStudent');
const terminalLog = document.getElementById('terminalLog');
const searchInput = document.getElementById('searchInput');

function logAction(msg, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const cls = type === 'success' ? 'log-success' : 'log-info';
    terminalLog.innerHTML += `<div class="terminal-line ${cls}">[${time}] ${msg}</div>`;
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

function updateMetrics(data) {
    totalCountEl.textContent = data.length;
    if (data.length === 0) {
        avgMarksEl.textContent = "0.0%";
        topStudentEl.textContent = "None";
        return;
    }
    const sum = data.reduce((acc, curr) => acc + curr.marks, 0);
    const avg = (sum / data.length).toFixed(1);
    avgMarksEl.textContent = avg + "%";

    const top = data.reduce((prev, curr) => (prev.marks > curr.marks) ? prev : curr);
    topStudentEl.textContent = `${top.name} (${top.marks}%)`;
}

function renderTable(data = studentList) {
    tableBody.innerHTML = '';
    updateMetrics(data);

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b; padding: 25px;">No records located in linear memory pool.</td></tr>`;
        return;
    }

    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${student.id}</strong></td>
            <td>${student.name}</td>
            <td><span class="badge">${student.department}</span></td>
            <td>${student.marks}%</td>
            <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
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

    // Check duplicate ID
    if(studentList.some(s => s.id === id)) {
        alert("Student ID already exists in linear storage!");
        return;
    }

    studentList.push({ id, name, department, marks });
    logAction(`ArrayList.add({id: ${id}, name: "${name}"}) executed. Size: ${studentList.length}`, 'success');
    
    renderTable();
    form.reset();
});

function deleteStudent(id) {
    const index = studentList.findIndex(s => s.id === id);
    if (index !== -1) {
        studentList.splice(index, 1);
        logAction(`ArrayList.remove(index: ${index}) executed. Node deleted successfully.`, 'info');
        renderTable();
    }
}

function filterStudents() {
    const query = searchInput.value.toLowerCase();
    const filtered = studentList.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.id.toString().includes(query) ||
        s.department.toLowerCase().includes(query)
    );
    logAction(`Linear Search O(n) scan matched ${filtered.length} records for query: "${query}"`, 'info');
    renderTable(filtered);
}

function sortById() {
    studentList.sort((a, b) => a.id - b.id);
    logAction(`Sorted ArrayList elements sequentially by ID using O(n log n) comparison.`, 'success');
    renderTable();
}

function sortByMarks() {
    studentList.sort((a, b) => b.marks - a.marks);
    logAction(`Sorted ArrayList elements by Highest Marks performance.`, 'success');
    renderTable();
}

function clearSystem() {
    if (confirm("Clear all rows from linear memory storage?")) {
        studentList = [];
        logAction(`Memory wiped completely. ArrayList cleared.`, 'info');
        renderTable();
    }
}

// Initial render
renderTable();
