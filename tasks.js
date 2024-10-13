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
    { department: 'מחלקה א1', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה א2', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ו1', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ו2', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ב\'', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ה\'', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ד1', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ד2', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]},
    { department: 'מחלקה ג\'', tasks: [
        { name: 'טיטולים', completed: false },
        { name: 'ציוד רפואי', completed: false },
        { name: 'מזון', completed: false }
    ]}
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

// Rest of the code remains the same...
