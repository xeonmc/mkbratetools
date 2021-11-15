'use strict';

var keyCodes = {
  3 : "break",
  8 : "backspace / delete",
  9 : "tab",
  12 : 'clear',
  13 : "enter",
  16 : "shift",
  17 : "ctrl ",
  18 : "alt",
  19 : "pause/break",
  20 : "caps lock",
  27 : "escape",
  32 : "spacebar",
  33 : "page up",
  34 : "page down",
  35 : "end",
  36 : "home ",
  37 : "left arrow ",
  38 : "up arrow ",
  39 : "right arrow",
  40 : "down arrow ",
  41 : "select",
  42 : "print",
  43 : "execute",
  44 : "Print Screen",
  45 : "insert ",
  46 : "delete",
  48 : "0",
  49 : "1",
  50 : "2",
  51 : "3",
  52 : "4",
  53 : "5",
  54 : "6",
  55 : "7",
  56 : "8",
  57 : "9",
  59 : "semicolon (firefox), equals",
  61 : "equals (firefox)",
  65 : "a",
  66 : "b",
  67 : "c",
  68 : "d",
  69 : "e",
  70 : "f",
  71 : "g",
  72 : "h",
  73 : "i",
  74 : "j",
  75 : "k",
  76 : "l",
  77 : "m",
  78 : "n",
  79 : "o",
  80 : "p",
  81 : "q",
  82 : "r",
  83 : "s",
  84 : "t",
  85 : "u",
  86 : "v",
  87 : "w",
  88 : "x",
  89 : "y",
  90 : "z",
  91 : "Windows Key / Left ⌘",
  92 : "right window key ",
  93 : "Windows Menu / Right ⌘",
  96 : "numpad 0 ",
  97 : "numpad 1 ",
  98 : "numpad 2 ",
  99 : "numpad 3 ",
  100 : "numpad 4 ",
  101 : "numpad 5 ",
  102 : "numpad 6 ",
  103 : "numpad 7 ",
  104 : "numpad 8 ",
  105 : "numpad 9 ",
  106 : "multiply ",
  107 : "add",
  109 : "subtract ",
  110 : "decimal point",
  111 : "divide ",
  112 : "f1 ",
  113 : "f2 ",
  114 : "f3 ",
  115 : "f4 ",
  116 : "f5 ",
  117 : "f6 ",
  118 : "f7 ",
  119 : "f8 ",
  120 : "f9 ",
  121 : "f10",
  122 : "f11",
  123 : "f12",
  124 : "f13",
  125 : "f14",
  126 : "f15",
  127 : "f16",
  128 : "f17",
  129 : "f18",
  130 : "f19",
  144 : "num lock ",
  145 : "scroll lock",
  173 : "minus (firefox), mute/unmute",
  174 : "decrease volume level",
  175 : "increase volume level",
  176 : "next",
  177 : "previous",
  178 : "stop",
  179 : "play/pause",
  181 : "mute/unmute (firefox)",
  182 : "decrease volume level (firefox)",
  183 : "increase volume level (firefox)",
  186 : "semi-colon ",
  187 : "equal sign ",
  188 : "comma",
  189 : "dash ",
  190 : "period ",
  191 : "forward slash",
  192 : "grave accent ",
  219 : "open bracket ",
  220 : "back slash ",
  221 : "close bracket ",
  222 : "single quote ",
  224 : "left or right ⌘ key (firefox)",
  225 : "altgr",
  226 : "< /git >",
  255 : "toggle touchpad"
};

window.performance = window.performance || {};
performance.now = (function() {
    return performance.now       ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||
        Date.now * 1.0; /*none found - fallback to browser default */
})();

(function() {
  var body = document.querySelector('body');

  var bestKeyTime = 10000;
  var keyDownTime = [];
  var isKeyDown = [];
  for (var i = 0, len = 256; i < len; i++) {
    isKeyDown[i] = false;
    keyDownTime[i] = 0;
  }


  body.onkeydown = function (e) {
    if ( !e.metaKey ) {
      e.preventDefault();
    }

    if (!isKeyDown[e.keyCode]) {
      isKeyDown[e.keyCode] = true;
      keyDownTime[e.keyCode] = performance.now();
    }
  };

  body.onkeyup = function (e) {
    if ( !e.metaKey ) {
      e.preventDefault();
    }
    isKeyDown[e.keyCode] = false;
    var upTime = performance.now();
    var heldTime = Math.ceil(upTime - keyDownTime[e.keyCode]);
    bestKeyTime = Math.min(bestKeyTime, heldTime);
    var scanRate = Math.min(1000 / (bestKeyTime), 1000);

    document.querySelector('#best-time').innerHTML = bestKeyTime + "ms";
    document.querySelector('#scan-rate').innerHTML = scanRate + "Hz";
    var keyEventElem = document.createElement('li');
    var keyEventContent = document.createTextNode(keyCodes[e.keyCode] + ": " + heldTime + "ms");
    keyEventElem.appendChild(keyEventContent);
    var outputArea = document.querySelector('#event-history');
    outputArea.insertBefore(keyEventElem, outputArea.firstChild)
  };
})();
