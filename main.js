let sensitivity = 20;
let threshold = 0.05;
let X  = 2;
const LT = 6;
const RT = 7;
let LB = 4;
let RB = 5;

function connecthandler(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    var handler = () => {
        var gamepad = navigator.getGamepads()[e.gamepad.index];
        var axes = gamepad.axes;
        if (gamepad.buttons.some((button) => {return button.pressed})) {
            if (gamepad.buttons[LT].pressed) {
                chrome.runtime.sendMessage({command: "movel"});
            }
            if (gamepad.buttons[RT].pressed) {
                chrome.runtime.sendMessage({command: "mover"});
            }
            if (gamepad.buttons[LB].pressed) {
                chrome.runtime.sendMessage({command: "prev"});
            }
            if (gamepad.buttons[RB].pressed) {
                chrome.runtime.sendMessage({command: "next"});
            }
            if (gamepad.buttons[X].pressed) {
                chrome.runtime.sendMessage({command: "close"});
            }
        }
        var dx = Math.abs(axes[0]) > threshold ? axes[0] * sensitivity : 0;
        var dy = Math.abs(axes[1]) > threshold ? axes[1] * sensitivity : 0;
        window.scrollBy(dx, dy);
        requestAnimationFrame(handler);
    };
    requestAnimationFrame(handler);
}

window.addEventListener("gamepadconnected", connecthandler);
