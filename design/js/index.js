/*
Author:        Samantha
Last modified: 5.5.2020 by sjc
Status:        In progress

*/

var production = false;
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
var navbar = document.getElementById("navbar-top");

/*
sticky
sticky navbar
*/
function sticky() {
    if (window.pageYOffset >= 0) {
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
    loadPage("home/home.html");
    var container = document.getElementById("work-container");

    var timeout = setInterval(function(){
        if(container !== null){
            clearInterval(timeout);
            loadFile("home/resume.json", function(response) {
                var objects = JSON.parse(response);
        
                // create the objects
                for(var i=0; i<objects.length; i++){
                    // get container
                    var container = document.getElementById(objects[i].class + "-container");
                    console.log(container);

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
        container = document.getElementById("work-container");
    }, 150);

    
}

/* 
beginning
*/
loadHome();


/* 
----------------------------------------- RECIPES PAGE
*/

/*
loadRecipes
loads the recipes page
*/
function loadRecipes(){
    loadPage("recipes/recipes.html");


    // load recipes

    
}

