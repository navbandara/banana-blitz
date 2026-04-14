// meal.js
async function fetchMeal() {
    try {
        const dtDiv = document.createElement('div');
        dtDiv.id = 'meal-widget';
        dtDiv.innerHTML = '🍲 Cooking...';
        document.body.appendChild(dtDiv);

        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        
        if (!response.ok) {
            dtDiv.innerHTML = '🍲 Kitchen Closed';
        } else {
            const data = await response.json();
            const meal = data.meals[0];
            dtDiv.innerHTML = `
                <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}" />
                <div class="meal-info">
                    <b>Banana Recipe?</b><br/>
                    ${meal.strMeal}
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching meal:', error);
        const widget = document.getElementById('meal-widget');
        if(widget) widget.innerHTML = '🍲 Error';
    }
}

fetchMeal();
