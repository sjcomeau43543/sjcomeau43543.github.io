/*
Author:        Samantha
Last modified: 5.5.2020 by sjc
Status:        In progress

TODO
*/

var production = false;
/*
loadFile
loads files
*/
function loadFile(filename, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
     // change to ../../ for local https://sjcomeau43543.githu.io/TravelDome/ bfor online
    if(production) {
        xobj.open("GET", "https://sjcomeau43543.github.io/TravelDome/"+filename, true);
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

loadPage("home/home.html");