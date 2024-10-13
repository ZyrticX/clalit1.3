function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const managers = ['ארתור', 'גיל'];
    const workers = ['יבגני', 'ולרי', 'ערן'];

    if (username === '') {
        alert('נא לבחור שם משתמש');
        return;
    }

    if (managers.includes(username)) {
        if (password !== '1234') {
            alert('סיסמה שגויה');
            return;
        }
    }

    localStorage.setItem('currentUser', username);
    window.location.href = 'loading.html?user=' + encodeURIComponent(username);
}

document.addEventListener("DOMContentLoaded", () => {
    const usernameSelect = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    usernameSelect.addEventListener('change', function() {
        if (this.value === 'ארתור' || this.value === 'גיל') {
            passwordInput.style.display = 'block';
        } else {
            passwordInput.style.display = 'none';
        }
    });

    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = now.toLocaleDateString('he-IL', options);
    document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('he-IL');
}
