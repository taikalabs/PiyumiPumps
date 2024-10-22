// Define the pumping session plan (pumping/resting intervals in minutes)
let pumpingSession = [
    { type: "Pump", duration: 20 }, { type: "Rest", duration: 10 },
    { type: "Pump", duration: 6 }, { type: "Rest", duration: 15 },
    { type: "Pump", duration: 8 }, { type: "Rest", duration: 20 },
    { type: "Pump", duration: 7 }, { type: "Rest", duration: 15 },
    { type: "Pump", duration: 9 }
];

// Function to start the pumping session
function startPumpingSession() {
    const sessionPlan = document.getElementById("session-plan");
    sessionPlan.innerHTML = ""; // Clear previous session plan
    let sessionIndex = 0;

    // Play the start session sound
    document.getElementById("startsession-sound").play();

    displaySessionPlan(sessionIndex);

    // Start the countdown for the first interval
    runInterval(sessionIndex);
}

// Function to display the session plan (all intervals)
function displaySessionPlan(currentIndex) {
    const sessionPlan = document.getElementById("session-plan");

    pumpingSession.forEach((interval, index) => {
        const intervalDiv = document.createElement("div");
        intervalDiv.classList.add("interval");

        // Apply different styles based on whether it's a Pump or Rest interval
        if (interval.type === "Pump") {
            intervalDiv.classList.add("pump");
        } else {
            intervalDiv.classList.add("rest");
        }

        // Highlight the current interval
        if (index === currentIndex) {
            intervalDiv.classList.add("highlight");
        }

        intervalDiv.innerHTML = `${interval.type} for ${interval.duration} minutes`;
        sessionPlan.appendChild(intervalDiv);
    });
}

// Function to handle the countdown for each interval
function runInterval(sessionIndex) {
    if (sessionIndex >= pumpingSession.length) {
        document.getElementById("timer-display").innerHTML = "All sessions completed!";
        
        // Play the cheer sound when the whole session is finished
        document.getElementById("cheer-sound").play();
        return;
    }

    const interval = pumpingSession[sessionIndex];
    const timerDisplay = document.getElementById("timer-display");
    let remainingTime = interval.duration * 60; // Convert minutes to seconds

    // Update the timer every second
    const countdown = setInterval(() => {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        timerDisplay.innerHTML = `${interval.type} for ${minutes}:${seconds < 10 ? "0" + seconds : seconds} minutes`;

        remainingTime--;

        // When the time for this interval is up, move to the next interval
        if (remainingTime < 0) {
            clearInterval(countdown);
            // Play notification sound
            document.getElementById("notification-sound").play();

            // Move to the next interval and update the session plan display
            sessionIndex++;
            document.getElementById("session-plan").innerHTML = ""; // Clear previous plan
            displaySessionPlan(sessionIndex);

            // Start the next interval
            runInterval(sessionIndex);
        }
    }, 1000);
}
