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
    { department: 'מחלקה א', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ב', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    // Add more departments as needed
];

const tasksContainer = document.getElementById('tasksContainer');

const populateTasks = () => {
    tasksContainer.innerHTML = '';
    tasksData.forEach((dept, deptIndex) => {
        const deptElement = document.createElement('div');
        deptElement.className = 'department';
        deptElement.innerHTML = `<h2>${dept.department}</h2>`;
        
        dept.tasks.forEach((task, taskIndex) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <span>${task.name}</span>
                <label class="checkbox-container">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                           ${currentUser === 'גיל' || currentUser === 'ארתור' ? 'disabled' : ''}
                           data-dept="${deptIndex}" data-task="${taskIndex}">
                    <span class="checkmark"></span>
                </label>
                <span class="status ${task.completed ? 'completed' : 'not-completed'}">
                    ${task.completed ? 'בוצע' : 'לא בוצע'}
                </span>
            `;
            deptElement.appendChild(taskElement);
        });
        tasksContainer.appendChild(deptElement);
    });
    updateProgress();
};

tasksContainer.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const deptIndex = event.target.dataset.dept;
        const taskIndex = event.target.dataset.task;
        tasksData[deptIndex].tasks[taskIndex].completed = event.target.checked;
        const statusSpan = event.target.parentElement.nextElementSibling;
        statusSpan.textContent = event.target.checked ? 'בוצע' : 'לא בוצע';
        statusSpan.className = `status ${event.target.checked ? 'completed' : 'not-completed'}`;
        updateProgress();
    }
});

const progressBar = document.getElementById('progress');
const updateProgress = () => {
    const totalTasks = tasksData.reduce((sum, dept) => sum + dept.tasks.length, 0);
    const completedTasks = tasksData.reduce((sum, dept) => 
        sum + dept.tasks.filter(task => task.completed).length, 0);
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
