document.addEventListener("DOMContentLoaded", function () {
    let currentFeature = 1;

    function showFeature(featureNumber) {
        // Hide all features
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`feature${i}`).style.display = "none";
        }

        // Show the selected feature
        document.getElementById(`feature${featureNumber}`).style.display = "block";
        document.getElementById("featureCounter").innerText = featureNumber;
    }

    function switchFeature() {
        currentFeature = (currentFeature % 4) + 1; // Cycle through 1 to 4
        showFeature(currentFeature);
    }

    // Show the initial feature
    showFeature(currentFeature);

    // Set an interval to switch features every 5 seconds
    setInterval(switchFeature, 5000);
});
