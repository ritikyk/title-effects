// Original title and favicon settings
pageTitle = document.title.replace(/ /g, '\u00A0');
normalFavicon = 'https://cdn-icons-png.flaticon.com/512/7218/7218647.png'; // Real Favicon Of The Page
attentionMessage = "Ritik Misses YOU!".replace(/ /g, '\u00A0'); // Message to show when tab is changed
attentionFavicon = 'https://cdn-icons-png.flaticon.com/512/260/260182.png'; // Favicon to show when tab is changed
time = 250; // Typing speed
marqueeSpeed = 300; // Speed for marquee effect

//Non-Customisation
let cancelled = false;
let marqueeInterval;
let scrollDirection = 'left'; // Initial scroll direction
const titleTag = document.querySelector('title');

// Function to change favicon
function changeFavicon(src) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.href = src;
}

// Sleep helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typewriter function for typing text character by character
async function typewriteTitle(str) {
    document.title = '';
    for (let i = 0; i < str.length; i++) {
        if (cancelled) return; // Stop typing if cancelled
        document.title += str.charAt(i);
        await sleep(time);
    }
}

// Marquee function for scrolling the title text
function marqueeTitle(str) {
    cancelled = true; // Stop any ongoing typing effect
    clearInterval(marqueeInterval); // Clear previous marquee if any

    let marqueeText = str + " "; // Add space for smooth scrolling
    marqueeInterval = setInterval(() => {
        marqueeText = marqueeText.substring(1) + marqueeText.charAt(0); // Shift characters
        document.title = marqueeText;
    }, marqueeSpeed);
}

function marqueeRightTitle(str) {
    cancelled = true; // Stop any ongoing typing effect
    clearInterval(marqueeInterval); // Clear previous marquee if any

    let marqueeText = str + " "; // Add space for smooth scrolling
    marqueeInterval = setInterval(() => {
        marqueeText = marqueeText.charAt(marqueeText.length - 1) + marqueeText.slice(0, -1); // Shift characters right
        document.title = marqueeText;
    }, marqueeSpeed);
}

// Ping-pong marquee function for alternating scrolling direction
function pingPongMarquee(str) {
    cancelled = true; // Stop any ongoing typing effect
    clearInterval(marqueeInterval); // Clear previous marquee if any

    let marqueeText = str + " "; // Add space for smooth scrolling
    marqueeInterval = setInterval(() => {
        // Check direction and adjust marquee text accordingly
        if (scrollDirection === 'left') {
            marqueeText = marqueeText.substring(1) + marqueeText.charAt(0); // Shift left
        } else {
            marqueeText = marqueeText.charAt(marqueeText.length - 1) + marqueeText.slice(0, -1); // Shift right
        }
        
        document.title = marqueeText;

        // Change direction at the edges (length of original text)
        if (marqueeText === str + " " || marqueeText === " " + str) {
            scrollDirection = (scrollDirection === 'left') ? 'right' : 'left';
        }
    }, marqueeSpeed);
}

// Visibility change listeners based on class
if (titleTag && titleTag.classList.contains('type-write')) {
    document.addEventListener("visibilitychange", function () {
        isPageActive = !document.hidden;
        cancelled = true; // Cancel any ongoing typing

        if (!isPageActive) {
            cancelled = false; // Reset the flag for typing
            document.title = '';
            typewriteTitle(attentionMessage);
            changeFavicon(attentionFavicon);
        } else {
            clearInterval(marqueeInterval); // Stop marquee if running
            document.title = pageTitle; // Set the original title immediately
            changeFavicon(normalFavicon);
            typewriteTitle(pageTitle); // Restart typewriter effect
        }
    });

    typewriteTitle(pageTitle);
}

if (titleTag && titleTag.classList.contains('marquee-left')) {
    document.addEventListener("visibilitychange", function () {
        isPageActive = !document.hidden;
        cancelled = true; // Cancel any ongoing typing

        if (!isPageActive) {
            cancelled = false; // Reset the flag for typing
            document.title = '';
            marqueeTitle(attentionMessage);
            changeFavicon(attentionFavicon);
        } else {
            clearInterval(marqueeInterval); // Stop marquee if running
            document.title = pageTitle; // Set the original title immediately
            changeFavicon(normalFavicon);
        }
    });

    marqueeTitle('\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+pageTitle);
}

if (titleTag && titleTag.classList.contains('marquee-right')) {
    document.addEventListener("visibilitychange", function () {
        isPageActive = !document.hidden;
        cancelled = true; // Cancel any ongoing typing

        if (!isPageActive) {
            cancelled = false; // Reset the flag for typing
            document.title = '';
            marqueeRightTitle(attentionMessage); // Start marquee to the right
            changeFavicon(attentionFavicon);
        } else {
            clearInterval(marqueeInterval); // Stop marquee if running
            document.title = pageTitle; // Set the original title immediately
            changeFavicon(normalFavicon);
        }
    });

    marqueeRightTitle('\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+pageTitle); // Start right marquee effect
}

// Visibility change listeners for ping-pong marquee
if (titleTag && titleTag.classList.contains('marquee-pingpong')) {
    document.addEventListener("visibilitychange", function () {
        isPageActive = !document.hidden;
        cancelled = true; // Cancel any ongoing typing

        if (!isPageActive) {
            cancelled = false; // Reset the flag for typing
            document.title = '';
            pingPongMarquee(attentionMessage); // Start ping-pong marquee
            changeFavicon(attentionFavicon);
        } else {
            clearInterval(marqueeInterval); // Stop marquee if running
            document.title = pageTitle; // Set the original title immediately
            changeFavicon(normalFavicon);
        }
    });

    pingPongMarquee('\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+pageTitle); // Start the ping-pong effect
}
