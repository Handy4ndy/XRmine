document.addEventListener("DOMContentLoaded", function () {
    let currentFeature = 1;

    function showFeature(featureNumber) {
        // Hide all features
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`feature${i}`).classList.remove("active");
        }

        // Show the selected feature
        document.getElementById(`feature${featureNumber}`).classList.add("active");
        document.getElementById("featureCounter").innerText = featureNumber;
    }

    function switchFeature() {
        currentFeature = (currentFeature % 3) + 1; // Cycle through 1 to 4
        showFeature(currentFeature);
    }

    // Show the initial feature
    showFeature(currentFeature);

    // Set an interval to switch features every 10 seconds
    setInterval(switchFeature, 10000);
});
