document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    const loadingMessage = document.getElementById('loadingMessage');

    if (username === 'ארתור') {
        loadingMessage.textContent = 'שבוע טוב ארתור! כאן תוכל לעקוב אחרי התקדמות הפיזורים במחלקות';
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#FFFFFF';
    } else if (username === 'גיל') {
        loadingMessage.textContent = 'בוקר טוב גיל! המשך יום נעים';
        document.body.style.backgroundColor = '#FFD700';
    } else if (username === 'ערן') {
        loadingMessage.textContent = 'יום טוב, ערן!';
    } else if (username === 'ולרי') {
        loadingMessage.textContent = 'ברוך הבא, ולרי!';
    } else if (username === 'יבגני') {
        const motivationalQuotes = [
            'אל תוותר!',
            'כוח הרצון יוביל אותך קדימה!',
            'הצלחה מחכה מעבר לפינה!',
            'זה הזמן לשבור את כל המחסומים!',
            'כל יום הוא הזדמנות חדשה!'
        ];
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        loadingMessage.textContent = randomQuote;
    } else {
        loadingMessage.textContent = 'ברוך הבא!';
    }

    setTimeout(() => {
        window.location.href = 'tasks.html';
    }, 3000);  // Redirect after 3 seconds
});
