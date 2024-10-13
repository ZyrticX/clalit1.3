document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    const loadingMessage = document.getElementById('loadingMessage');
    const funMessage = document.getElementById('funMessage');

    if (username === 'ארתור') {
        loadingMessage.textContent = 'שבוע טוב ארתור! כאן תוכל לעקוב אחרי התקדמות הפיזורים במחלקות';
    } else if (username === 'גיל') {
        loadingMessage.textContent = 'בוקר טוב גיל! המשך יום נעים';
    } else if (username === 'ערן') {
        loadingMessage.textContent = 'יום טוב, ערן!';
    } else if (username === 'ולרי') {
        loadingMessage.textContent = 'קום לעבוד מניאק';
    } else if (username === 'יבגני') {
        const motivationalQuotes = [
            'אל תוותר!',
            'כוח הרצון יוביל אותך קדימה!',
            'הצלחה מחכה מעבר לפינה!',
            'זה הזמן לשבור את כל המחסומים!',
            'כל יום הוא הזדמנות חדשה!'
        ];
        loadingMessage.textContent = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }

    const funMessages = [
        '🌟 מכין את הקסם...',
        '🚀 מתכונן להמראה...',
        '🎉 מארגן את המסיבה...',
        '🌈 צובע את היום שלך...',
        '🏃‍♂️ רץ להביא לך את הנתונים...'
    ];
    funMessage.textContent = funMessages[Math.floor(Math.random() * funMessages.length)];

    updateDateTime();
    setInterval(updateDateTime, 1000);

    setTimeout(() => {
        window.location.href = 'tasks.html';
    }, 3000);
});

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = now.toLocaleDateString('he-IL', options);
    document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('he-IL');
}
