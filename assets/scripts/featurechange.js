document.addEventListener("DOMContentLoaded", function () {
    let currentFeature = 1;

    function showFeature(featureNumber) {
        // Hide all features
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`feature${i}`).style.opacity = "0";
            document.getElementById(`feature${i}`).style.transition = "opacity 2s ease-in-out"; // Add a smooth opacity transition
        }

        // Show the selected feature
        document.getElementById(`feature${featureNumber}`).style.opacity = "1";
        document.getElementById("featureCounter").innerText = featureNumber;
    }

    function switchFeature() {
        currentFeature = (currentFeature % 4) + 1; // Cycle through 1 to 4
        showFeature(currentFeature);
    }

    // Show the initial feature
    showFeature(currentFeature);

    // Set an interval to switch features every 6 seconds
    setInterval(switchFeature, 6000);
});