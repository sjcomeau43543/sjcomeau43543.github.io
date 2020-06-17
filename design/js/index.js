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
----------------------------------------- HOME PAGE
*/

/*
loadHome
loads the home page
*/
function loadHome(){
    var container = document.getElementById("homecontainer");
    var timeout = setInterval(function(){
        if(container !== null){
            clearInterval(timeout);

            console.log(container);
            loadFile("home/resume.json", function(response) {
                var objects = JSON.parse(response);
        
                // create the objects
                for(var i=0; i<objects.length; i++){
                    var div = document.createElement("div");

                    div.setAttribute("class", "resumecontainer");
                    if (objects[i].link !== ""){
                        div.setAttribute("onclick", "loadpage('"+objects[i].link+"')");
                    }
        
                    var header = document.createElement("h3");
                    header.setAttribute("class", "resumeh3");
                    var textnode = document.createTextNode(objects[i].header);
                    header.appendChild(textnode);
                    div.appendChild(header);
        
                    var location = document.createTextNode(objects[i].location);
                    div.appendChild(location);
        
                    var date = document.createTextNode(objects[i].date);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(date);
        
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
        container = document.getElementById("homecontainer");

        console.log(container);
    }, 150);

    
}

/* 
beginning
*/
loadPage("home/home.html");
loadHome();