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

let pageNumber = 0; 
console.log("Page Number:", pageNumber);
let displayNav = false; // not really needed for this application but is basically ensuring our nav buttons do not appear until we want them to.

const previousBtn = document.querySelector(".prev"); //defining html tags
const nav = document.querySelector("nav");

//results section
const section = document.querySelector("section");

nav.style.display = "none";//hides buttons until there are enough results to need navigation will call back to this later when we make the buttons visible

        //1                 //2
searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage); //3
previousBtn.addEventListener("click", previousPage); //3

                    // 1
function fetchResults(e){
    console.log(e); // 2
    e.preventDefault(); // make sure the browser doesnt auto refresh after an event
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
        return result.json(); //2 - this function jsonifies the data
    }).then (function(json){
        // console.log(json);
        displayResults(json); // this puts the jsonied data into our displayResults function to be used later
    });
};

function displayResults(json) {
    // console.log("displayResults", json.response.docs);
    while (section.firstChild){ 
        section.removeChild(section.firstChild); // this allows us to make a second search without refreshing the page. It removes the first search and adds the second.
    }
    let articles = json.response.docs; // this "drills down" our response from our fetch request to get one step deeper into the array
    console.log(articles);

    if(articles.length === 10) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }

    if(articles.length == 0) {
        console.log("No results"); // what will happen if we find no results
    } else {
        //display data
        for(let i = 0; i < articles.length; i++){
            console.log(i);
            let article = document.createElement("article");
            let heading = document.createElement("h2");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let para = document.createElement("p"); //1
            let clearfix = document.createElement("div"); //2

            let current = articles[i];
            console.log("current:", current);

            link.href= current.web_url;
            link.textContent = current.headline.main;

            para.textContent = "keywords: "; //3
            //4
            for(let j = 0; j < current.keywords.length; j++){
                //5
                let span = document.createElement("span");
                //6
                span.textContent += current.keywords[j].value + "";
                //7
                para.appendChild(span);
            }

            if(current.multimedia.length > 0) {
                img.src = "http://www.nytimes.com/" + current.multimedia[0].url;
                img.alt = current.headline.main
            }

            //8
            clearfix.setAttribute("class", "clearfix");

            //9
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log("Page Number:", pageNumber);
};    // 5

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page", pageNumber);
}; 

