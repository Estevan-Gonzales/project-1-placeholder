
var ingredientListOneEl = document.getElementById('ingredient-list-one');
var ingredientListTwoEl = document.getElementById('ingredient-list-two');
var ingredientListThreeEl = document.getElementById('ingredient-list-three');
var buttonSearchEl = document.getElementById('btn-search');

var mealListEl = document.getElementById('meal-list');

var mealDetailsEl = document.getElementById('meal-details');

function populateIngredientsLists() {
    var requestUrl = 'https://www.themealdb.com/api/json/v2/9973533/list.php?i=list';
    localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(i = 0; i < data.meals.length; i++) {
            localStorage.setItem(i, data.meals[i].strIngredient);
            var listItemOne = document.createElement('option');
            listItemOne.textContent = data.meals[i].strIngredient;
            ingredientListOneEl.appendChild(listItemOne);
            var listItemTwo = document.createElement('option');
            listItemTwo.textContent = data.meals[i].strIngredient;
            ingredientListTwoEl.appendChild(listItemTwo);
            var listItemThree = document.createElement('option');
            listItemThree.textContent = data.meals[i].strIngredient;
            ingredientListThreeEl.appendChild(listItemThree);
        }
    });
}

function getMeals(event) {

    event.preventDefault();

    mealListEl.innerHTML = "";
    mealDetailsEl.innerHTML = "";

    var baseUrl = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?i='

    var ingredientOne = ingredientListOneEl.value;
    var ingredientTwo = ingredientListTwoEl.value;
    var ingredientThree = ingredientListThreeEl.value;

    requestUrl = baseUrl + ingredientOne

    if (ingredientTwo !== "No Selection") {
        requestUrl += ("," + ingredientTwo);
    }
    if (ingredientThree !== "No Selection") {
        requestUrl += ("," + ingredientThree);
    }

    requestUrl = requestUrl.split(' ').join('_');

    console.log(requestUrl);


    //localStorage.clear();
  // replace `octocat` with anyone else's GitHub username
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        if (!data) {
            var listItem = document.createElement('div');
            listItem.textContent = "Sorry, no meals found :("
            mealListEl.append(listItem);
        } else {
            for(i = 0; i < data.meals.length; i++) {
                //localStorage.setItem(i, data.meals[i].strMeal);
                var listItem = document.createElement('div');
                //listItem.textContent = data.meals[i].strMeal;
                listItem.textContent = data.meals[i].strMeal;
                mealListEl.addEventListener('click', retrieveMealDetails);
                localStorage.setItem(data.meals[i].strMeal, data.meals[i].idMeal)
                mealListEl.appendChild(listItem);
        
            }
        }
    });
}

function retrieveMealDetails(event) {

    mealDetailsEl.innerHTML = "";
    var mealId = localStorage.getItem(event.srcElement.textContent);
    //mealDetailsEl.textContent = localStorage.getItem(event.srcElement.textContent);

    requestUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealId;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        var unorderedList = document.createElement('ul');

        for (i = 1; i < 21; i++) {
            var parameter = "strIngredient" + i;
            var listItem = document.createElement('li');
            listItem.textContent = data.meals[0][parameter];
            unorderedList.append(listItem);
        }

        mealDetailsEl.append(unorderedList);



        var listItem = document.createElement('div');

        listItem.textContent = data.meals[0].strInstructions;
        console.log(data);

        mealDetailsEl.appendChild(listItem);




        //listItem.textContent = data.meals[0].
    })
};

populateIngredientsLists();

buttonSearchEl.addEventListener('click', getMeals);



