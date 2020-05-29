/*
Author:        Samantha
Last modified: 5.5.2020 by sjc
Status:        In progress

TODO
1. fix old code
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
    console.log(url);
    var page = document.getElementById("pageContainerMain");
    loadFile(url, function(response) {
        page.innerHTML = response;
    });
}

loadPage("home/home.html");

/*/ w3

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("projectDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) {
      w3AddClass(x[i], "show");
    }
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var mainContainer = document.getElementById("mainContainer");
var btnContainer = document.getElementsByClassName("myBtnContainer");
var btns = btnContainer[0].getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    console.log(this.className);
  });
}
*/