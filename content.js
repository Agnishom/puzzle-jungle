const audio = new Audio(chrome.runtime.getURL("strut.mp3"));

const connectionsObserver = new MutationObserver(() => {
        const element = document.querySelector('#default-choices > fieldset > article > p');
        if (element === null) return;
        if (element === undefined) return;
        const digitStr = element.innerHTML[0];
        const digit = parseInt(digitStr);
        if (digit === 4) {
            console.log("Time to celebrate! 🎉");
            audio.play();
            connectionsObserver.disconnect();
        }
        else {
            console.log("Not yet time to celebrate. 😢");
        }
    });

const strandsObserver = new MutationObserver(() => {
        // console.log("Checking if puzzle is solved...");
        const localData = JSON.parse(localStorage['nyt-strands-beta']);
        if (localData['solved'] === true) {
            console.log("Time to celebrate! 🎉");
            audio.play();
            strandsObserver.disconnect();
        }
    });

if (document.URL.includes("connections")) {
    connectionsObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
} else if (document.URL.includes("strands")) {
    strandsObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

console.log("Puzzle Jingle plugin loaded.");