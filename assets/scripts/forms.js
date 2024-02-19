document.addEventListener("DOMContentLoaded", function () {
    // Select all form sections
    const formSections = document.querySelectorAll('.form-section');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
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
