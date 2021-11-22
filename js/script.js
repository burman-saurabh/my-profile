// Get the current year for the copyright
document.getElementById('year').innerHTML = new Date().getFullYear();

// Navbar toggle.
function toggleNav(e) {
    // console.log(e.target.parentNode.className);
    let navlinks = document.getElementsByClassName('navlink');
    // console.log(navlinks);

    let topnav = document.getElementById("topnavId");

    if (e.target.parentNode.className === 'icon' || e.target.className == 'icon') {
        if (topnav.className === "topnav") {
            topnav.className += " responsive";
        } else {
            topnav.className = "topnav";
        }
    } else {
        if (topnav.className.indexOf("responsive") > -1) {
            topnav.className = "topnav";
        }

        [...navlinks].forEach(navlink => {
            if (navlink.className.indexOf('active') > -1) {
                navlink.className = 'navlink';
                // break;
            }
        });

        e.target.className = 'navlink active';
    }
}

// Smooth Scrolling for browsers that do not support the scroll-behavior property.
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});


// Main Heading animation
// let heading1 = 'Hello, I\'m Saurabh Burman';
let heading1 = '👋 Hi, I’m Saurabh Burman';
let heading2 = 'I\'m a full-stack web developer';

// let animationDuration = 0.3;
let animationDelay = 0.08;
totalAnimationTime = (heading1.length + heading2.length + 1) * animationDelay

$(document).ready(function () {
    let heading1Element = document.getElementById('heading1');
    let heading2Element = document.getElementById('heading2');

    for (let i = 0; i < heading1.length; i++) {
        let el = document.createElement('span');
        el.innerHTML = heading1.charAt(i);
        el.style.animationDelay = (animationDelay * i) + 's';
        // el.style.animationDuration = animationDuration + 's';
        heading1Element.appendChild(el);
    }

    for (let i = 0; i < heading2.length; i++) {
        let el = document.createElement('span');
        el.style.animationDelay = (heading1Element.children.length * animationDelay) + (animationDelay * i) + 's';
        // el.style.animationDuration = animationDuration + 's';
        el.innerHTML = heading2.charAt(i);
        heading2Element.appendChild(el);
    }

});

// About animation
window.addEventListener('scroll', function () {
    if (this.pageYOffset > document.getElementById('about').offsetTop - 400) {

        document.querySelector('#about > p.section-heading').style.animationName = "aboutHeadingAnimation";
        document.getElementById('about-left').style.animationName = "aboutLeftAnimation";
        document.getElementById('about-right').style.animationName = "aboutRightAnimation";
    }
})

let updatePercentageCalled = false;
window.addEventListener('scroll', function () {
    if (this.pageYOffset > document.getElementById('about-bottom').offsetTop - 400) {

        document.getElementById('about-bottom').style.animationName = "aboutBottomAnimation";

        document.getElementById('javascript-progress').style.animationName = "javascriptProgressAnimation";
        document.getElementById('html5-progress').style.animationName = "html5ProgressAnimation";
        document.getElementById('css3-progress').style.animationName = "css3ProgressAnimation";
        document.getElementById('bootstrap4-progress').style.animationName = "bootstrap4ProgressAnimation";
        document.getElementById('nodejs-progress').style.animationName = "nodejsProgressAnimation";
        document.getElementById('express-progress').style.animationName = "expressProgressAnimation";
        document.getElementById('mongodb-progress').style.animationName = "mongodbProgressAnimation";
        document.getElementById('angular-progress').style.animationName = "angularProgressAnimation";

        if (!updatePercentageCalled) { //called this function just once on scroll
            updatePercentageCalled = true;
            updateSkillPercentage();
        }
    }
})

// Hard coding the skill rating. Just changing it here reflect changes everywhere required dynamically including css vars.
let skillMap = new Map();
skillMap.set('javascript-progress', 90);
skillMap.set('html5-progress', 90);
skillMap.set('css3-progress', 90);
skillMap.set('bootstrap4-progress', 90);
skillMap.set('nodejs-progress', 80);
skillMap.set('express-progress', 90);
skillMap.set('mongodb-progress', 85);
skillMap.set('angular-progress', 85);

// Dynamically setting the css variables for the skill ratings.
let root = document.documentElement;
for ([key, value] of skillMap.entries()) {
    root.style.setProperty(`--${key}`, value + '%');
}

let intialPercentage = 25;
let skillRatingSpans = document.getElementsByClassName('skillRating');
[...skillRatingSpans].forEach((el) => {
    el.firstChild.textContent = intialPercentage; // intialize skill percent to 25%
})

let interval = 2000 / 75; //total time 2s divided by the 75% as 25 is the initial base percent.
let setPercentageInterval;

function updateSkillPercentage() {
    setTimeout(() => {
        setPercentageInterval = setInterval(increasePercent, interval); // to sync with the animation time delay.
    }, 800);
}

function increasePercent() {
    intialPercentage += 1;
    // console.log(intialPercentage);

    if (intialPercentage >= 100) {
        clearInterval(setPercentageInterval);
    }

    for ([key, value] of skillMap) {
        // console.log(key, value);
        if (intialPercentage <= value) {
            document.getElementById(key).children[1].children[0].textContent = intialPercentage;
        }
    }
}

// adding delay to the arrow down button as well
document.getElementById('arrow-down').style.animationDelay = (heading1.length + heading2.length + 1) * animationDelay + 's';

// arrow up button display
window.addEventListener('scroll', function () {
    if (this.pageYOffset > document.getElementById('about').offsetTop - 20) {
        document.getElementById('arrow-up').style.display = 'block';
    } else {
        document.getElementById('arrow-up').style.display = 'none';
    }
})

//  Scroll Spy
let navLinks = document.getElementsByClassName('navlink');
let activeNavLink = 'home';
window.addEventListener('scroll', function () {
    if (this.pageYOffset < document.getElementById('about').offsetTop - 80 && activeNavLink != 'home') {
        activeNavLink = 'home';
        updateActiveNavLink('home');
        // console.log('home');
        // console.log(document.getElementById('topnavId').children);
        // console.log(document.getElementById('topnavId').childNodes);
    } else if (this.pageYOffset > document.getElementById('about').offsetTop - 80 && this.pageYOffset < document.getElementById('projects').offsetTop - 80 && activeNavLink != 'about') {
        activeNavLink = 'about';
        updateActiveNavLink('about');
        // console.log('about');
    } else if (this.pageYOffset > document.getElementById('projects').offsetTop - 80 && this.pageYOffset < document.getElementById('contact').offsetTop - 80 && activeNavLink != 'projects') {
        activeNavLink = 'projects';
        updateActiveNavLink('projects');
        // console.log('projects');
    } else if (this.pageYOffset > document.getElementById('contact').offsetTop - 80 && activeNavLink != 'contact') {
        activeNavLink = 'contact';
        updateActiveNavLink('contact');
        // console.log('contact');
    }
})

function updateActiveNavLink(activeNavLink) {
    [...navLinks].forEach(function (link) {
        if (link.classList.contains('active')) {
            link.classList.remove('active');
        }
        if (link.hash.indexOf(activeNavLink) > 0) {
            link.classList.add('active');
        }
    })
}

// toggle tabs
let allTabs = document.getElementsByClassName('tab-item');

for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener('click', updateTab);
}

function updateTab(e) {
    // console.log(this);
    removePreviousBorder();
    this.classList.add('tab-border');
    addTabContent(this.id);
}

function removePreviousBorder() {
    for (let i = 0; i < allTabs.length; i++) {
        if (allTabs[i].classList.contains('tab-border')) {
            allTabs[i].classList.remove('tab-border');
            removeTabContent(allTabs[i].id);
        }

    }
}

function addTabContent(tabId) {
    document.getElementById(`${tabId}-content`).classList.add('show');
}

function removeTabContent(tabId) {
    document.getElementById(`${tabId}-content`).classList.remove('show');
}

// Open Window for Game Play
var windowObjectReference = null; // global variable
var PreviousUrl;
/* global variable that will store the
                   url currently in the secondary window */

function openRequestedSinglePopup(url) {
    if (windowObjectReference == null || windowObjectReference.closed) {
        windowObjectReference = window.open(url, "SingleSecondaryWindowName",
            "resizable,scrollbars,status");
    } else if (PreviousUrl != url) {
        windowObjectReference = window.open(url, "SingleSecondaryWindowName",
            "resizable=yes,scrollbars=yes,status=yes");
        /* if the resource to load is different,
           then we load it in the already opened secondary window and then
           we bring such window back on top/in front of its parent window. */
        windowObjectReference.focus();
    } else {
        windowObjectReference.focus();
    };

    PreviousUrl = url;
    /* explanation: we store the current url in order to compare url
       in the event of another call of this function. */
}

// Email handle
function sendEmail(elem, event) {
    event.preventDefault();
    document.getElementsByClassName('errorMsg')[0].style.display = 'none';
    let email = 'burman.saurabh123@gmail.com';

    if (elem.elements.namedItem('firstname').value == '' || elem.elements.namedItem('lastname').value == '' || elem.elements.namedItem('subject').value == '') {
        document.getElementsByClassName('errorMsg')[0].style.display = 'block';
    } else {
        let mailLink = `mailto:${email}?subject=query%20from%20${elem.elements.namedItem('firstname').value}%20Location%20-%20${elem.elements.namedItem('country').value}&body=${elem.elements.namedItem('subject').value}`;
        window.location.href = mailLink;
    }
}