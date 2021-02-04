const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = "x8PXDV7Ne4BoGZoMZQ6DR57zWTjk7ugl"; //2
let url; //3

//search form
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

//results navigation
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//results section
const section = document.querySelector("section");

nav.style.display = "none";

let pageNumber = 0;
let displayNav = false;

        //1                 //2
searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage); //3
previousBtn.addEventListener("click", previousPage); //3

                    // 1
function fetchResults(e){
    console.log(e); // 2
    e.preventDefault();
    //assemble the full URL
    url = baseURL + "?api-key=" + key + "&page=" + pageNumber + "&q=" + searchTerm.value; //3
    // console.log(url); //4

    if(startDate.value !== "") {
        console.log(startDate.value);
        url += "&begin_date=" + startDate.value;
    };

    if(endDate.value){
        url += "&end_date=" + endDate.value;
    };

    fetch(url)
    .then(function (result){
        console.log(result);
        return result.json(); //2
    }).then (function(json){
        // console.log(json);
        displayResults(json);
    });
};

function displayResults(json) {
    // console.log("displayResults", json.response.docs);
    let articles = json.response.docs;
    // console.log(articles);
    if(articles.length == 0){
        console.log("No results");
    } else {
        //display data
        for(let i = 0; i < articles.length; i++){
            console.log(i);
        }
    }
};

function nextPage(){
    console.log("Next button clicked");
};    // 5

function previousPage(){
    console.log("Previous button clicked");
}; // 5 NOTE module had "Next button clicked" in the previousPage console.log


