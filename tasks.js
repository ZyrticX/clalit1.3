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
    { department: 'מחלקה א1', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה א1', task: 'טיטולים', completed: false },
    { department: 'מחלקה א1', task: 'מזון', completed: false },
    { department: 'מחלקה א2', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה א2', task: 'טיטולים', completed: false },
    { department: 'מחלקה א2', task: 'מזון', completed: false },
    { department: 'מחלקה ו1', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ו1', task: 'טיטולים', completed: false },
    { department: 'מחלקה ו1', task: 'מזון', completed: false },
    { department: 'מחלקה ו2', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ו2', task: 'טיטולים', completed: false },
    { department: 'מחלקה ו2', task: 'מזון', completed: false },
    { department: 'מחלקה ב\'', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ב\'', task: 'טיטולים', completed: false },
    { department: 'מחלקה ב\'', task: 'מזון', completed: false },
    { department: 'מחלקה ה\'', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ה\'', task: 'טיטולים', completed: false },
    { department: 'מחלקה ה\'', task: 'מזון', completed: false },
    { department: 'מחלקה ד1', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ד1', task: 'טיטולים', completed: false },
    { department: 'מחלקה ד1', task: 'מזון', completed: false },
    { department: 'מחלקה ד2', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ד2', task: 'טיטולים', completed: false },
    { department: 'מחלקה ד2', task: 'מזון', completed: false },
    { department: 'מחלקה ג\'', task: 'ציוד רפואי', completed: false },
    { department: 'מחלקה ג\'', task: 'טיטולים', completed: false },
    { department: 'מחלקה ג\'', task: 'מזון', completed: false },
];

const tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];

const populateTasks = () => {
    tasksTable.innerHTML = '';
    tasksData.forEach((task, index) => {
        const row = tasksTable.insertRow();
        row.insertCell(0).textContent = task.department;
        row.insertCell(1).textContent = task.task;
        const statusCell = row.insertCell(2);
        statusCell.textContent = task.completed ? 'בוצע' : 'לא בוצע';
        statusCell.className = task.completed ? 'completed' : '';
        const actionCell = row.insertCell(3);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.disabled = (currentUser === 'גיל' || currentUser === 'ארתור');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            statusCell.textContent = task.completed ? 'בוצע' : 'לא בוצע';
            statusCell.className = task.completed ? 'completed' : '';
            updateProgress();
        });
        actionCell.appendChild(checkbox);
    });
    updateProgress();
};

const progressBar = document.getElementById('progress');
const updateProgress = () => {
    const completedTasks = tasksData.filter(task => task.completed).length;
    const totalTasks = tasksData.length;
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
