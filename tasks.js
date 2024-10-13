const currentUser = localStorage.getItem('currentUser');
const usernameDisplay = document.getElementById('usernameDisplay');
usernameDisplay.textContent = currentUser;

const dateDisplay = document.getElementById('dateDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('he-IL', options);
    timeDisplay.textContent = now.toLocaleTimeString('he-IL');
};
setInterval(updateDateTime, 1000);
updateDateTime();

const tasksData = [
    { department: 'מחלקה א1', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה א2', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ו1', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ו2', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ב\'', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ה\'', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ד1', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ד2', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } },
    { department: 'מחלקה ג\'', tasks: { טיטולים: false, 'ציוד רפואי': false, מזון: false } }
];

const tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];

const populateTasks = () => {
    tasksTable.innerHTML = '';
    tasksData.forEach((dept, deptIndex) => {
        const row = tasksTable.insertRow();
        row.insertCell(0).textContent = dept.department;
        
        ['טיטולים', 'ציוד רפואי', 'מזון'].forEach((taskName, taskIndex) => {
            const cell = row.insertCell(taskIndex + 1);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = dept.tasks[taskName];
            checkbox.disabled = (currentUser === 'גיל' || currentUser === 'ארתור');
            checkbox.dataset.dept = deptIndex;
            checkbox.dataset.task = taskName;
            
            const label = document.createElement('label');
            label.className = 'checkbox-container';
            label.appendChild(checkbox);
            
            const span = document.createElement('span');
            span.className = 'checkmark';
            label.appendChild(span);
            
            const status = document.createElement('span');
            status.className = `status ${dept.tasks[taskName] ? 'completed' : 'not-completed'}`;
            status.textContent = dept.tasks[taskName] ? 'בוצע' : 'לא בוצע';
            
            cell.appendChild(label);
            cell.appendChild(status);
        });
    });
    updateProgress();
};

tasksTable.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const deptIndex = event.target.dataset.dept;
        const taskName = event.target.dataset.task;
        tasksData[deptIndex].tasks[taskName] = event.target.checked;
        const statusSpan = event.target.closest('td').querySelector('.status');
        statusSpan.textContent = event.target.checked ? 'בוצע' : 'לא בוצע';
        statusSpan.className = `status ${event.target.checked ? 'completed' : 'not-completed'}`;
        updateProgress();
    }
});

const progressBar = document.getElementById('progress');
const updateProgress = () => {
    const totalTasks = tasksData.length * 3;  // 3 tasks per department
    const completedTasks = tasksData.reduce((sum, dept) => 
        sum + Object.values(dept.tasks).filter(Boolean).length, 0);
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage}%`;
};

document.getElementById('saveButton').addEventListener('click', () => {
    alert('השינויים נשמרו בהצלחה!');
    localStorage.setItem('tasksData', JSON.stringify(tasksData));
});

function checkBreakTimes() {
    const now = new Date();
    const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const breakMessage = document.getElementById('breakMessage');

    if (currentTime >= '10:30' && currentTime < '10:45') {
        breakMessage.textContent = 'הפסקה עד 10:45';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '12:00' && currentTime < '12:20') {
        breakMessage.textContent = 'הפסקת אוכל עד 12:20';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '13:45' && currentTime < '14:00') {
        breakMessage.textContent = 'הפסקה עד 14:00';
        breakMessage.style.display = 'block';
    } else {
        breakMessage.style.display = 'none';
    }
}

setInterval(checkBreakTimes, 60000);
checkBreakTimes();

const savedTasksData = localStorage.getItem('tasksData');
if (savedTasksData) {
    tasksData.splice(0, tasksData.length, ...JSON.parse(savedTasksData));
}

populateTasks();
