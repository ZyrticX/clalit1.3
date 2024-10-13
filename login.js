function login() {
    const username = document.getElementById('username').value.toLowerCase();
    const managers = ['arthur', 'gil'];
    const workers = ['evgeniy', 'valery', 'eran'];

    if (username === '') {
        alert('נא להזין שם משתמש');
        return;
    }

    localStorage.setItem('currentUser', username);

    if (managers.includes(username) || workers.includes(username)) {
        window.location.href = 'loading.html?user=' + encodeURIComponent(username);
    } else {
        alert('שם משתמש לא מוכר');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });
});
