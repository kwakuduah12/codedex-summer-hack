/*!
 // Bubble.js - v0.0.1
 // kurisubrooks.com
 */

// Amount of Bubbles
var bubbleMax = 65;

// Bubble Colors
var bubbleColor = ["#FFCC00", "#FF9900", "#FF6600"];

// Bubble Entity
var bubbleEntity = "&#x25CF;";

// Rising Velocity
var bubbleSpeed = 0.75;

// Minimum Bubble Size
var bubbleMinSize = 8;

// Maximum Bubble Size
var bubbleMaxSize = 24;

// Refresh Rate (in milliseconds)
var bubbleRefresh = 50;

// Additional Styles
var bubbleStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var bubbles = [],
    pos = [],
    coords = [],
    lefr = [],
    marginBottom,
    marginRight;

function randomise(range) {
    rand = Math.floor(range * Math.random());
    return rand;
}

function initBubbles() {
    var bubbleSize = bubbleMaxSize - bubbleMinSize;
    marginBottom = document.body.scrollHeight - 5;
    marginRight = document.body.clientWidth - 15;

    for (i = 0; i <= bubbleMax; i++) {
        coords[i] = 0;
        lefr[i] = Math.random() * 15;
        pos[i] = 0.03 + Math.random() / 10;
        bubbles[i] = document.getElementById("bubble" + i);
        bubbles[i].style.fontFamily = "inherit";
        bubbles[i].size = randomise(bubbleSize) + bubbleMinSize;
        bubbles[i].style.fontSize = bubbles[i].size + "px";
        bubbles[i].style.color = bubbleColor[randomise(bubbleColor.length)];
        bubbles[i].style.zIndex = 1000;
        bubbles[i].rise = bubbleSpeed * bubbles[i].size / 5;
        bubbles[i].posX = randomise(marginRight - bubbles[i].size);
        bubbles[i].posY = marginBottom - randomise(marginBottom) - bubbles[i].size;
        bubbles[i].style.left = bubbles[i].posX + "px";
        bubbles[i].style.top = bubbles[i].posY + "px";
    }

    moveBubbles();
}

function resize() {
    marginBottom = document.body.scrollHeight - 5;
    marginRight = document.body.clientWidth - 15;
}

function moveBubbles() {
    for (i = 0; i <= bubbleMax; i++) {
        coords[i] += pos[i];
        bubbles[i].posY -= bubbles[i].rise;
        bubbles[i].style.left = bubbles[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
        bubbles[i].style.top = bubbles[i].posY + "px";

        if (bubbles[i].posY <= 0 || parseInt(bubbles[i].style.left) > (marginRight - 3 * lefr[i])) {
            bubbles[i].posX = randomise(marginRight - bubbles[i].size);
            bubbles[i].posY = marginBottom - randomise(marginBottom) - bubbles[i].size;
        }
    }

    setTimeout("moveBubbles()", bubbleRefresh);
}

for (i = 0; i <= bubbleMax; i++) {
    document.write("<span id='bubble" + i + "' style='" + bubbleStyles + "position:absolute;top:-" + bubbleMaxSize + "'>" + bubbleEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initBubbles);
