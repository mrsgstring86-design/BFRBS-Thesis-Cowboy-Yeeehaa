let clicked = 0;
let isReady = false; // Flag to prevent dialogue advancement during sequence timing

const dialouge = [
    "Fight", "Fight", "Confuse with weapon", "Angry", "Headache", 
    "Default", "Default", "Default", "Headache", "Headache", 
    "Default", "Default", "Default", "Default", "Default"
];

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "z") {
        
        // 1. Initial trigger sequence
        if (clicked === 0) {
            clicked = 1;

            document.querySelector(".ClickWindow").classList.add("fade-out");
            const dialougeWindow = document.querySelector(".DialougeWindow");
            const emergencyAlert = document.querySelector(".Emergency-Alert");
            const dialougeWrapper = document.querySelector(".dialouge-wrapper");
            const warnsfx = document.querySelector(".Warn-Sound");

            dialougeWindow.classList.add("fade-in");
            
            setTimeout(() => {
                emergencyAlert.classList.add("show"); 
                warnsfx.play();
            }, 4500);

            setTimeout(() => {
                dialougeWrapper.classList.add("show");
                warnsfx.pause();
                warnsfx.currentTime = 0;
                isReady = true; // Unlock dialogue cycling once window is visible
                
                // Load first dialogue image
                updateDialogue();
            }, 7550);

            return; // Exit early during initial setup
        }

        // 2. Advance dialogue only after sequence finishes
        if (isReady) {
            clicked++;
            updateDialogue();
        }
    }
});

function updateDialogue() {
    const dialougeWrapper = document.querySelector(".dialouge-wrapper");

    if (dialougeWrapper && dialougeWrapper.classList.contains("show")) {
        const characterElement = document.querySelector(".character");
        const dialougeElement = document.querySelector(".dialouge");

        if (clicked <= 15) {
            dialougeElement.src = `Images/Asset/Dialogue/Part 1/Part 1/${clicked}-P1Dialogue.png`;
            
            if (dialouge[clicked - 1]) { 
                characterElement.src = `Images/Asset/Farmer/Farmer ${dialouge[clicked - 1]}.png`;
            }
        } else {
            localStorage.setItem("dialogueCompleted", "true");

            const overlay = document.querySelector(".page-transition-overlay");
            if (overlay) {
                overlay.classList.add("fade-out");
            }

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        }
    }
}