/*
Author:        Samantha
Last modified: 5.5.2020 by sjc
Status:        In progress

*/

var production = true;

/*
loadFile
loads files
*/
function loadFile(filename, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    if(production) {
        xobj.open("GET", "https://sjcomeau43543.github.io/"+filename, true);
    } else {
        xobj.open("GET", "../../"+filename, true);
    }
    xobj.onreadystatechange = function () {
        if(xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }

    };
    xobj.send(null);
}

/*
loadExterior
loads exterior page
*/
function loadExterior(url, callback){
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function () {
        if(xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }

    };
    xobj.send(null);

}

/*
loadPage
loads a page
*/
function loadPage(url){
    // load content
    var page = document.getElementById("pageContainerMain");
    loadFile(url, function(response) {
        page.innerHTML = response;
    });
}

/* 
----------------------------------------- STICKY NAVBAR
*/

// Get the navbar
var navbar = document.getElementById("navbar-container");

/*
sticky
sticky navbar
*/
function sticky() {
    if (window.pageYOffset >= document.getElementById("first-bar").offsetTop - 150) {
        navbar.classList.add("stick")
    } else {
        navbar.classList.remove("stick");
    }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {sticky()};

/* 
----------------------------------------- HOME PAGE
*/

/*
loadHome
loads the home page
*/
function loadHome(){
    //loadPage("home/home.html");
    var container = document.getElementById("extracurricular-container");

    var timeout = setInterval(function(){
        if(container !== null){
            clearInterval(timeout);
            loadFile("home/resume.json", function(response) {
                var objects = JSON.parse(response);
        
                // create the objects
                for(var i=0; i<objects.length; i++){
                    // get container
                    var container = document.getElementById(objects[i].class + "-container");

                    //  div
                    var div = document.createElement("div");


                    div.setAttribute("class", "column box");
                    if (objects[i].link !== ""){
                        div.setAttribute("onclick", "loadpage('"+objects[i].link+"')");
                    }
        
                    // title
                    var header = document.createElement("h2");
                    var textnode = document.createTextNode(objects[i].header);
                    header.appendChild(textnode);
                    div.appendChild(header);
        
                    // location
                    var header = document.createElement("h3");
                    var textnode = document.createTextNode(objects[i].location);
                    header.appendChild(textnode);
                    div.appendChild(header);
        
                    // dates
                    var header = document.createElement("h4");
                    var textnode = document.createTextNode(objects[i].date);
                    header.appendChild(textnode);
                    div.appendChild(header);
        
                    // tags
                    var tagtext = "";
                    for(j=0; j<objects[i].tags.length; j++){
                        tagtext = tagtext + "#" + objects[i].tags[j] + " ";
                    }
                    var tags = document.createTextNode(tagtext);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(tags);
                
                    container.appendChild(div);
                }
            });
        }
        container = document.getElementById("extracurricular-container");
    }, 150);

    
}

/* 
----------------------------------------- RECIPES PAGE
*/

var allrecipes = [];
var filteredrecipes = [];


/*
createRecipeDiv
creates a recipe div
*/
function createRecipeDiv(recipe) {
    //  div
    var div = document.createElement("div");
    div.setAttribute("class", "column box");

    //tags, category, serves, ingredients {}, instructions []

    // image
    var image = document.createElement("img");
    image.setAttribute("src", recipe.photo);
    div.appendChild(image);

    // title
    var header = document.createElement("h2");
    var textnode = document.createTextNode(recipe.title);
    header.appendChild(textnode);
    div.appendChild(header);

    return div;
}

/*
loadRecipes
loads the recipes page
*/
function loadRecipes(){
    loadPage("recipes/recipes.html");

    // load recipes
    var container = document.getElementById("recipes-container");

    var timeout = setInterval(function(){
        if(container !== null){
            clearInterval(timeout);

            
            document.getElementById("search_ingredient").addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    filter(document.getElementById("search_ingredient").value);
                    document.getElementById("search_ingredient").value = "";
                }
            });

            loadFile("recipes/recipes.json", function(response) {

                var objects = JSON.parse(response);
        
                // create the objects
                for(var i=0; i<objects.length; i++){
                    allrecipes.push(objects[i]);

                    var div = createRecipeDiv(objects[i]);
                
                    container.appendChild(div);


                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ high protein
                    for(var j=0; j<objects[i].tags.length; j++){
                        if(objects[i].tags[j] === "protein"){
                        }
                    }
                }


            });
        }
        container = document.getElementById("recipes-container");
    }, 150);

    
}

function filterbytag(tag) {
    var filtered = [];

    for(var j=0; j<allrecipes.length; j++){
        for(var k = 0; k<allrecipes[j].tags.length; k++){
            if(allrecipes[j].tags[k] === tag){
                filtered.push(allrecipes[j]);
            }
        }        
    }

    return filtered;
}

function filterbyingredient(ingredient) {
    var filtered = [];

    for(var j=0; j<allrecipes.length; j++){
        var ingredients = Object.keys(allrecipes[j].ingredients);
        
        for(var k = 0; k<ingredients.length; k++){
            if(ingredients[k] === ingredient){
                filtered.push(allrecipes[j]);
            }
        }        
    }

    return filtered;

}

/*
filter
filters all recipes
*/
function filter(filteringredient){
    var filteredrecipes = document.getElementById("recipes-container");

    //removeall
    while (filteredrecipes.firstChild) {
        filteredrecipes.removeChild(filteredrecipes.firstChild);
    }

    //random
    if(filteringredient === "random"){
        var randomnumber = Math.floor(allrecipes.length * Math.random());

        var randomrecipe = allrecipes[randomnumber];

        var div = createRecipeDiv(randomrecipe);
        filteredrecipes.appendChild(div);
    } else if(filteringredient === "reset") {
        for(var j=0; j<allrecipes.length; j++){
            var div = createRecipeDiv(allrecipes[j]);
            filteredrecipes.appendChild(div);
        }
    } else if(filteringredient === "protein" || filteringredient === "easy" || filteringredient === "recreation") {
        var filtered = filterbytag(filteringredient);
        for(var f=0; f<filtered.length; f++){
            var div = createRecipeDiv(filtered[f]);
            filteredrecipes.appendChild(div);
        }

    } else {
        var filtered = filterbyingredient(filteringredient);

        for(var f=0; f<filtered.length; f++){
            var div = createRecipeDiv(filtered[f]);
            filteredrecipes.appendChild(div);
        }
    }

}