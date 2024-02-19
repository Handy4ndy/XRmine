document.addEventListener("DOMContentLoaded", function () {
    // Select all form sections
    const formSections = document.querySelectorAll('.form-section');

    // Function to check if an element is in the viewport
    function isInViewport(element, threshold = 0.2) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const topVisible = rect.top <= windowHeight * (1 - threshold);
        const bottomVisible = rect.bottom >= windowHeight * threshold;
        return topVisible && bottomVisible;
    }

    // Function to handle visibility of form sections
    function handleVisibility() {
        formSections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = 1;
            } else {
                section.style.opacity = 0;
            }
        });
    }

    // Initial visibility check
    handleVisibility();

    // Listen for scroll events
    window.addEventListener('scroll', handleVisibility);
});
