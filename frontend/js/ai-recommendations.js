
document.addEventListener('DOMContentLoaded', function() {
    const recommendationSections = document.querySelectorAll('.ai-recommendation');


    const recommendations = [
        "Recommended for you based on your past purchases",
        "You might like these organic vegetables",
        "Popular among buyers in your area",
        "Best deals on your favorite products",
        "Seasonal specials just for you"
    ];

    recommendationSections.forEach(section => {
        const randomIndex = Math.floor(Math.random() * recommendations.length);
        section.textContent = recommendations[randomIndex];
    });

 
    setInterval(() => {
        recommendationSections.forEach(section => {
            const randomIndex = Math.floor(Math.random() * recommendations.length);
            section.textContent = recommendations[randomIndex];
        });
    }, 10000); 
});
