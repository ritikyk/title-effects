pageTitle = document.title.replace(/ /g, '\u00A0');
attentionMessage = "Ritik Misses YOU!".replace(/ /g, '\u00A0');
let cancelled = false;

function changeFavicon(src) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.href = src;
}

document.addEventListener("visibilitychange", function () {
    isPageActive = !document.hidden;
    cancelled = true; // Cancel any ongoing typing

    if (!isPageActive) {
        cancelled = false; // Reset the flag for typing
        document.title = '';
        typewriteTitle(attentionMessage);
        changeFavicon("https://cdn-icons-png.flaticon.com/512/260/260182.png");
    } else {    
        document.title = pageTitle; // Set the original title immediately
        changeFavicon("https://cdn-icons-png.flaticon.com/512/7218/7218647.png");
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

str = document.title.replace(/ /g, '\u00A0');
async function typewriteTitle(str) {
    document.title = '';
    for (let i = 0; i < str.length; i++) {
        if (cancelled) return; // Stop typing if cancelled
        document.title += str.charAt(i);
        await sleep(250);
    }
}

typewriteTitle(str);

window.addEventListener("load", (event) => {
    // new cursoreffects.emojiCursor({ emoji: ["💦", "🍒", "🍑"] });
    new cursoreffects.springyEmojiCursor({ emoji: "🍒" });
});
