const sections = document.getElementsByClassName('section');
const certificateSection = document.getElementById('certifications');
const certificationsText = document.getElementById('certifications-text');
const conclusionSection = document.getElementById('conclusion');
const footer = document.getElementById('footer');
const contactButton = document.getElementsByClassName('contact-me')[0];
const goBackButton = document.getElementsByClassName('go-back-button');
const sideBar = document.getElementById('sidebar');
const expandedList = document.getElementById('sections');
const certificateList = document.getElementById('certificate-list');
const leftFrame = document.getElementById('php');
const rightFrame = document.getElementById('oop-php');
let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
let screenRatio = screenWidth / screenHeight;

function isMobile() {
    if (screenHeight > screenWidth) return true;
}

function isInPortrait() {
    if (window.innerHeight > window.innerWidth) return true;
}

let niceDate = new Date("Jun 24 2004 13:15");
let state1 = "up to help developing something";
let state2 = "working on something";
let state3 = "probably not up to work anymore";
let languages = "Portuguese, English and German";
let codingLanguages = "Python, Shell Script, PHP, MySQL (MariaDB), Javascript, C and C++";
let visibleSectionNumber = 0;

// Yes, this algorithm is required to get the time difference
function getAge() {
    let randomNumber = Date.now() - niceDate.getTime();
    let hiddenAge = new Date(randomNumber);
    let year = hiddenAge.getUTCFullYear();
    let realAge = Math.abs(year - 1970);
    return realAge;
}

function updateTexts() {
    let age = getAge();
    document.getElementById('age').innerHTML = age;
    document.getElementById('languages').innerHTML = languages;
    document.getElementById('code-langs').innerHTML = codingLanguages;
    if (age == 18) {
        document.getElementById('work-state').innerHTML = state1;
    }
    else if (age > 18 && age < 74) {
        document.getElementById('work-state').innerHTML = state2;
    }
    else if (age >= 74) {
        document.getElementById('work-state').innerHTML = state3;
    }
}

function isInView(sectionNumber) {
    if (window.scrollY >= sections[sectionNumber].offsetTop - 2) return true;
}

function sectionUnhide(section) {
    if (section !== sections[0] && section !== sections[1]) {
        setTimeout(function() {
            section.querySelector('h1').style.opacity = 1;
            section.querySelector('h2').style.opacity = 1;
            if (section.querySelector('.project-box') != null) section.querySelector('.project-box').style.opacity = 1;
            section.querySelector('.image-box').style.opacity = 1;
            section.querySelector('.project-text-box').style.opacity = 1;
        }, 750);
    }
}

function sectionHide(section) {
    section.querySelector('.project-text-box').style.opacity = 0;
    if (section.querySelector('.project-box') != null) section.querySelector('.project-box').style.opacity = 0;
    section.querySelector('.image-box').style.opacity = 0;
    section.querySelector('h2').style.opacity = 0;
    section.querySelector('h1').style.opacity = 0;
}

function touchScrollEvent(sectionNumber) {
    let past = sectionNumber - 1;
    let next = sectionNumber + 1;
    let touchStartPosition = 0;
    sections[sectionNumber].addEventListener('touchstart', function(event) {
        touchStartPosition = event.touches[0].pageY;
    });
    sections[sectionNumber].addEventListener('touchmove', function(event) {
        if (event.touches[0].pageY < touchStartPosition) {
            setTimeout(function() { sections[next].scrollIntoView(); }, 150);
            sectionHide(sections[sectionNumber]);
            sectionUnhide(sections[next]);
        }
        else if (event.touches[0].pageY > touchStartPosition) {
            setTimeout(function() { sections[past].scrollIntoView(); }, 150);
            sectionHide(sections[sectionNumber]);
            sectionUnhide(sections[past]);
        }
        event.preventDefault();
    }, { passive: false });
}

function computerScrollEvent(sectionNumber) {
    let past = sectionNumber - 1;
    let next = sectionNumber + 1;
    sections[sectionNumber].addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            sections[next].scrollIntoView();
            sectionHide(sections[sectionNumber]);
            sectionUnhide(sections[next]);
            visibleSectionNumber = next;
        }
        else if (event.deltaY < 0) {
            sections[past].scrollIntoView();
            sectionHide(sections[sectionNumber]);
            sectionUnhide(sections[past]);
            visibleSectionNumber = past;
        }
        event.preventDefault();
    }, { passive: false });
}

let eventFunction = isMobile() ? touchScrollEvent : computerScrollEvent;

window.onload = function() {
    updateTexts();
    if (checkDarkMode())
        enableDarkMode();
    
    if (Math.abs(window.innerWidth - window.innerHeight) <= 600) {
        document.querySelector('#slogan').style.width = "60%";
        document.querySelector('#close-button').style.width = "min(4vw, 20px)";
        document.querySelector('#close-button').style.height = "min(4vw, 20px)";
        document.querySelector('#expand-button').style.width = "min(4vw, 20px)";
        document.querySelector('#expand-button').style.height = "min(4vw, 20px)";
        document.querySelector('#text-div').style.width = "90vw";
        document.querySelector('#text-div').style.left = "50vw";
        document.querySelector('#aboutme-text').style.width = "fit-content";
        document.querySelector('#aboutme-text').style.fontSize = "1.77vw";
        document.querySelector('#wrapper').style.display = "none";
        document.querySelector('#certifications-text').style.fontSize = "1.7vw";
        document.querySelector('#certifications-text').style.width = "60vw";
        document.querySelector('#certificate-list').style.width = "70%";
        document.querySelector('#certificate-list').style.height = "24.1vw";
        document.querySelector('#certificate-list').style.gap = "10vw";
        document.querySelectorAll('.certificate-frame')[0].style.width = "24vw";
        document.querySelectorAll('.certificate-frame')[0].style.height = "19vw";
        document.querySelectorAll('.certificate-frame')[1].style.width = "24vw";
        document.querySelectorAll('.certificate-frame')[1].style.height = "19vw";
        goBackButton[0].style.fontSize = "min(1.2vh, 12px)";
        goBackButton[0].style.width = "min(10vw, 72px)";
        goBackButton[1].style.fontSize = "min(1.2vh, 12px)";
        goBackButton[1].style.width = "min(10vw, 72px)";

        for (let index = 2; index < sections.length; index++) {
            sections[index].querySelector('.project-text-box').style.fontSize = isInPortrait() ? "1.27vh" : "1.47vw";
            sections[index].querySelector('.project-aspects').style.left = "10vw";
            sections[index].querySelector('.image-box').style.width = "24vw";
            sections[index].querySelector('.image-box').style.height = "24vw";
            sections[index].querySelector('.image-box').style.borderRadius = "3.6vw";
        }
    }

    for (let scrollIndex = 2; scrollIndex < (sections.length - 1); scrollIndex++) {
        eventFunction(scrollIndex);
    }
    for (let item = 0; item < sections.length; item++) {
        if (isInView(item)) {
            sections[item].scrollIntoView();
            sectionUnhide(sections[item]);
            if(!isMobile()) visibleSectionNumber = item;
        }
    }
}

if (isMobile()) {
    let touchStartPosition = 0;
    let touchXPosition = 0;

    certificateSection.addEventListener('touchstart', function(event) {
        touchStartPosition = event.touches[0].clientY;
        touchXPosition = event.touches[0].clientX;
    });
    certificateSection.addEventListener('touchmove', function(event) {
        if (event.touches[0].target == certificateSection || event.touches[0].target == certificationsText) {
            if (event.touches[0].clientY < touchStartPosition) {
                setTimeout(function() { sections[2].scrollIntoView(); }, 150);
                sectionUnhide(sections[2]);
            }
            if (event.touches[0].clientY > touchStartPosition) {
                setTimeout(function() { sections[0].scrollIntoView(); }, 150);
            }
        }
        event.preventDefault();
    }, { passive: false });

    certificateList.addEventListener('touchstart', function(event) {
        touchXPosition = event.touches[0].clientX;
    });
    certificateList.addEventListener('touchmove', function(event) {
        if (event.touches[0].clientX < touchXPosition) {
            certificateList.scrollLeft = rightFrame.offsetLeft;
        }
        else if (event.touches[0].clientX > touchXPosition) {
            certificateList.scrollLeft = 0;
        }
        event.preventDefault();
    }, { passive: false });

    conclusionSection.addEventListener('touchstart', function(event) {
        touchStartPosition = event.touches[0].clientY;
    });
    conclusionSection.addEventListener('touchmove', function(event) {
        if (event.touches[0].clientY < touchStartPosition) {
            setTimeout(function() { footer.scrollIntoView(); }, 150);
        }
        if (event.touches[0].clientY > touchStartPosition) {
            setTimeout(function() { sections[19].scrollIntoView(); }, 150);
            sectionHide(conclusionSection);
            sectionUnhide(sections[19]);
        }
        event.preventDefault();
    }, { passive: false });
}
else {
    window.addEventListener('keydown', function(event) {
        if (event.code == 'Space') {
            event.preventDefault();
        }
        else if (event.code == 'ArrowDown') {
            if (visibleSectionNumber == 0) {
                window.scrollBy(0, 100);
                if (isInView(1)) {
                    visibleSectionNumber = 1;
                }
            }
            else if (visibleSectionNumber == 20) {
                footer.scrollIntoView();
    
            }
            else {
                visibleSectionNumber += 1;
                sections[visibleSectionNumber].scrollIntoView();
                if (visibleSectionNumber != 2) sectionHide(sections[visibleSectionNumber - 1]);
                sectionUnhide(sections[visibleSectionNumber]);
            }
            event.preventDefault();
        }
        else if (event.code == 'ArrowUp') {
            if (visibleSectionNumber == 1) {
                visibleSectionNumber = 0;
                sections[visibleSectionNumber].scrollIntoView();
            }
            else if (visibleSectionNumber == 0) {
                window.scrollBy(0, -100);
            }
            else {
                visibleSectionNumber -= 1;
                sections[visibleSectionNumber].scrollIntoView();
                sectionHide(sections[visibleSectionNumber + 1]);
                sectionUnhide(sections[visibleSectionNumber]);    
            }
            event.preventDefault();
        }
    });
    certificateSection.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            sections[2].scrollIntoView();
            sectionUnhide(sections[2]);
            visibleSectionNumber = 2;
            event.preventDefault();
        }
    });
    conclusionSection.addEventListener('wheel', function(event) {
        if (event.deltaY < 0) {
            sections[19].scrollIntoView();
            sectionHide(conclusionSection);
            sectionUnhide(sections[19]);
            visibleSectionNumber = 19;
            event.preventDefault();
        }
    });
}

function copyNotification() {
    let copied = document.createElement('div');
    copied.setAttribute('class', 'notification copied');
    copied.innerHTML = "Copied to clipboard: firespindash@gmail.com";
    document.body.appendChild(copied);
    let firedNotification = document.getElementsByClassName('copied')[document.getElementsByClassName('copied').length - 1];
    setTimeout(function() { firedNotification.style.top = "2.5vmax"; }, 150);
    setTimeout(function() {
        firedNotification.style.top = "-5vmax";
        setTimeout(function() { document.body.removeChild(copied); }, 1000);
    }, 2000);
    navigator.clipboard.writeText("firespindash@gmail.com");
}

function fireNotification() {
    let notification = document.createElement('div');
    notification.setAttribute('class', 'notification');
    notification.innerHTML = "Contact me by email, send one to: firespindash@gmail.com";
    document.body.appendChild(notification);
    let createdNotification = document.getElementsByClassName('notification')[document.getElementsByClassName('notification').length - 1];
    createdNotification.addEventListener('click', function() {
        copyNotification();
    });
    setTimeout(function() { createdNotification.style.top = "5.729vmax"; }, 100);
    setTimeout(function() {
        createdNotification.style.top = "-5vmax";
        setTimeout(function() { document.body.removeChild(notification); }, 1000);
    }, 5000);
}

function showSideBar() {
    if (isInPortrait()) {
        sideBar.addEventListener('touchend', function(event) {
            setTimeout(function() { hideSideBar(); }, 100);
        });
    }
    else if (screenRatio != 16/9) {
        if (expandedList.style.display != 'none') expandList();
    }
    sideBar.style.display = 'block';
    setTimeout(function() { sideBar.style.right = '0'; }, 100);
}

function hideSideBar() {
    setTimeout(function() { sideBar.style.display = 'none'; }, 800);
}

function expandList() {
    if (expandedList.style.display == 'none') {
        setTimeout(function() { expandedList.style.display = 'flex';}, 100);
        arrowButton.style.transform = 'rotate(90deg)';
    }
    else {
        expandedList.style.display = 'none';
        arrowButton.style.transform = 'rotate(0)';
    }
}

function redirectToSection(listNumber) {
    visibleSectionNumber = listNumber;
    if (visibleSectionNumber != 0 && visibleSectionNumber != 1)
        sectionHide(sections[visibleSectionNumber]);

    sections[visibleSectionNumber].scrollIntoView();
    sectionUnhide(sections[visibleSectionNumber]);
}

function up(itemNumber) {
    if (itemNumber == 1)
        goBackButton[itemNumber].style.boxShadow = "0 0 0 1px #e0e0e0";
    else
        goBackButton[itemNumber].style.boxShadow = "0 0 0 1px var(--foreground)";

    setTimeout(function() {goBackButton[itemNumber].style.boxShadow = '';}, 800);
    setTimeout(function() {window.location.href = '';}, 1000);
}
