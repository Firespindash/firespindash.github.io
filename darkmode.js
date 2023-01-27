const darkModeButton = document.getElementById('dark-mode-button');
const arrowButton = document.getElementById('arrow');
const closeButton = document.getElementById('close');
const listIcon = document.getElementById('list');

function checkDarkMode() {
    if (window.location.search == '?dark') return true;
}

function enableDarkMode() {
    document.body.classList.add('darkmode');
    arrowButton.style.filter = 'invert(1) brightness(0.95) hue-rotate(90deg)';
    closeButton.style.filter = 'invert(1) brightness(0.95) hue-rotate(90deg)';
    listIcon.style.filter = 'invert(1) brightness(0.95) hue-rotate(90deg)';
    darkModeButton.innerText = "Light Mode";
}

function disableDarkMode() {
    document.body.classList.remove('darkmode');
    arrowButton.style.filter = '';
    closeButton.style.filter = '';
    listIcon.style.filter = '';
    darkModeButton.innerText = "Dark Mode";
}

function switchMode() {
    if (checkDarkMode()) {
        window.location.href = window.location.href.replace('?dark', '');
        disableDarkMode();
    }
    else {
        window.location.search += 'dark';
        enableDarkMode();
    }
}