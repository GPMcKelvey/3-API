/* NOTE
    WHAT IS AN API?

        - API stands for Application Program Interface

        - in basic terms, APIs just allow applications to communicate with one another.
        - the API is not the database or even the server, it is the code that allows us access point(s) to the server.
            - those access points come in the form of an endpoint, which directs us to different sets of data we can access

    ASYNCHRONOUS PROGRAMMING

        - Generally, code is read and implemented line by line - this is known as synchronous programming
            - in the case of fetching data from an outside source like we do with an API, if JavaScript did not have the ability to run code asynchronously, it would have to run each line of code > wait for the response from the API > and then finish running the rest of our code.
            - in basic terms, asynchronous programming allows a program to do more than one thing at a time

        - Asynchronous programming allows our code to continue to run while we're waiting on a response from an API. Once the fetch has finished retrieving the data, it then presents us with that data, without having to wait on any other processes

        - the fetch() method is an asynchronous method, and is part of the browser window, not JavaScript
        - the fetch() method starts the process of fetching a resource from the network, and will return a promise which is fulfilled once the response is available.
            - a promise represents a value that is unknown when the promise is created, but represents the eventual fulfilled value or rejection (error)
                - a promise is always one these states:
                    - pending: initial state, neither fulfilled or rejected
                    - fulfilled: meaning the operation completed successfully
                    - rejected: meaning the operation failed
            - in the case of a fetch request, a promise will resolve into a Response object that represents the response of the request made.
*/

const baseURL = "https://api.spacexdata.com/v4";

const searchForm = document.querySelector("form")
// console.log(searchForm); (console.log's used to make sure our commands are working properly)
const rocketsList = document.querySelector("ul");
// console.log(rocketsList); (again, used to make sure your calling the right tag)

searchForm.addEventListener("submit", fetchSpace) // function reference - we only want the fetchSpace function to run when the click event happens; otherwise, it will be invoked and ran immediately.
//The addEventListener method will automatically send the event object to the referenced function of fetchSpace

function fetchSpace (event) {
    event.preventDefault(); // the default action of a form is to reload th webpage on submission. We can prevent the default action of forms by using the preventDefault() method.
    // console.log(event);

 // fetch starts the process of fetching a resource from a network. The fetch will return a promise which is either fulfilled once the response is available - returning us a response object -or the promise will be rejected, meaning the fetch failed to return us any data.

    fetch(`${baseURL}/rockets`).then(function(response){
            console.log(response);

            return response.json();
        })
        .then(function(json) {
            // console.log(json);

            displayRockets(json);
        })   
}

function displayRockets(data) {
    console.log("this is coming from displayRockets", data);
    
    data.forEach(rocket => {
        console.log(rocket);
        let listItem = document.createElement("li");
        listItem.innerText = rocket.name;
        rocketsList.appendChild(listItem);

        let cost = document.createElement("li");
        cost.innerText = rocket.cost_per_launch;
        rocketsList.appendChild(cost);
    })
}

// John Ducketts books java and HTML/CSS

//   OR
//we can use a fat arrow function
//let fetchSpace() => {}