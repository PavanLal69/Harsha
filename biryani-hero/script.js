document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.biryani-img');
    const ingredients = document.querySelectorAll('.ingredient');
    
    // Slight Parallax Effect on Mouse Move
    document.addEventListener('mousemove', (e) => {
        // Calculate the mouse position relative to the center of the screen
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        
        // Apply smooth transform to the main hero image
        if (heroImage) {
            heroImage.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        }
        
        // Apply subtle micro-parallax to ingredients
        ingredients.forEach((ingredient, index) => {
            // Give each ingredient a slightly different movement speed
            const speed = (index % 4) * 0.5 + 0.3; 
            ingredient.style.transform = `translate(${-xAxis * speed}px, ${-yAxis * speed}px) rotate(var(--r))`;
        });
    });

    // Reset transformations when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        if (heroImage) {
            heroImage.style.transform = `translate(0px, 0px)`;
        }
    });
});
