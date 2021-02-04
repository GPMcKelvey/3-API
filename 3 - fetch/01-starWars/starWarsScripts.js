//step 1 - allows the API to select where to send info

// let starWarsPeopleList = document.querySelectorAll("ul");

//step 2 - fetch - GETs (GET is a very common HTTP verb) info from API

// fetch() sends the request to the api we want info from. Also, the start of a promise.

// fetch("https://swapi.dev/api/people")
//     .then(function(response) {

//.then method can take up two functions (success, failure) but failure is optional. Here we do not use it.
        //console.log(response);
//this gets a response as shown with the console.log but it is not readable, yet, we need to jsonify it with the .json() method.
//     return response.json();
// })
//     .then(function(json) {
        //console.log(json);
        //can check if it's working properly with a console.log() and see that we've got an array of 10 people now we capture that by assigning it to a variable
        // let people = json.results;
     // now we use a for loop to translate that data into our html
    //first we'll use a couple console.log's to check we're using the right for method (in or of)
        // for(p in people){
    //     console.log(p);
        // for in returns a list of indicies 
    // }
        // for(p of people) {
        //console.log(p); 
        // for of returns our list of people

        //now we need to use this loop to populate our html by using the .createElement method which we first assign to a variable, in this case listItem
        // let listItem = document.createElement("li");
        //then we need to insert the results into our HTML using .innerHTML and .appendChild()
//         listItem.innerHTML = "<p>" + p.name + "</p>";
//         starWarsPeopleList.appendChild(listItem);
//     }


// });

let starWarsPeopleList = document.querySelector("ul");

fetch("https://swapi.dev/api/people").then(function(response) {
        return response.json();
}).then(function(json) {
        let people = json.results;
        for(p of people) {
            let listItem = document.createElement("li");
            listItem.innerHTML = "<p>" + p.name + "</p>";
            starWarsPeopleList.appendChild(listItem);
        }
    });

