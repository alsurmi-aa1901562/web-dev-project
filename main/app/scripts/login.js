// Global Variables
const usersURL = "http://localhost:3000/api/user";

// Method to Handle Page Direction
async function goToPage(num, user, pass) {
    if(num === 0) {

    }
    else if(num === 1) {

    }
    else if(num === 2) {
        // Saving ID and Password Locally

        const data = {
            username: `${user}`,
            password: `${pass}`
        }

        localStorage.setItem("logger", JSON.stringify(data));

        window.location.href = "submit-paper.html"  
    }
}

// Method to Handle Creation of Error Message
function errorCreate(type){
    // Predefined Variables
    let errorMessage;
    let errorStatus;

    // Define which type of error message.
    if(type === 0) {
        errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Hmm.. Seems that the API Status is ";
        errorMessage.setAttribute("id", "error-message");

        errorStatus = document.createElement("a");
        errorStatus.innerHTML = "DOWN";
        errorStatus.setAttribute("id", "error-status");
        errorStatus.style.pointerEvents = "none"; 
    }
    else if(type === 1) {
        errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Uh Oh! The password you entered seems to be ";
        errorMessage.setAttribute("id", "error-message");

        errorStatus = document.createElement("a");
        errorStatus.innerHTML = "INCORRECT";
        errorStatus.setAttribute("id", "error-status"); 
        errorStatus.style.pointerEvents = "none";

        errorMessage.style.fontSize = "xx-small";
        errorStatus.style.fontSize = "xx-small";
    }
    else if(type === 2) {
        errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Uh Oh! This user seems to ";
        errorMessage.setAttribute("id", "error-message");

        errorStatus = document.createElement("a");
        errorStatus.innerHTML = "NOT EXIST";
        errorStatus.setAttribute("id", "error-status"); 
        errorStatus.style.pointerEvents = "none";

        errorMessage.style.fontSize = "xx-small";
        errorStatus.style.fontSize = "xx-small";
    }

    errorMessage.appendChild(errorStatus);
    document.getElementById("error-text").appendChild(errorMessage); 
}


// Default DOM Loaded Method 
document.addEventListener("DOMContentLoaded", async () =>{
    // Predefined Variables
    let res;

    // Try to fetch api. If not notify front end with a spawnable message
    try {
        res = await fetch(usersURL, {
            method: 'GET'
        });
    } catch (error) {
        errorCreate(0);
    }

    // Initializing Variables
    let users = await res.json();

    // Event Listener upon form submission
    document.getElementById("login-form").addEventListener("submit", async (event) =>{
        // Prevent Refresh of Page
        event.preventDefault();
        
        // Grabbing form data
        const form = event.target;
        const data = new FormData(form);

        // Defining Variables
        const username = data.get("username").replace(/\s/g, '');
        const password = data.get("password");
        let exists = false;


        // Validation of User Input of Login
        users.forEach((u, i) => {
            if(u.email === username) {
                exists = true;
                if(u.password === password) {
                    username.toLowerCase();
                    if(username.includes("reviewer")) {
                        
                    }
                    else if(username.includes("organizer")) {
                        
                    }
                    else if(username.includes("author")) {
                       goToPage(2);
                    }
                }
                else {
                    // Removing previous error messages
                    const element = document.getElementById("error-message");

                    if(element) {
                        element.remove();
                    }

                    // Creating Error Message
                    document.getElementById("password").value = "";
                    errorCreate(1);
                }
            }
        });

        if(!exists) {
            // Removing previous error messages
            const element = document.getElementById("error-message");

            if(element) {
                element.remove();
            }

            // Creating Error message
            document.getElementById("password").value = "";
            document.getElementById("username").value = "";
            errorCreate(2);
        }
        
    });

    // Animation Section for Pointer

    let pointer = document.getElementById("pointer-follow");

    // Event Listener for Mouse Movements
    document.addEventListener("mousemove", (e) => {
        pointer.style.top = e.pageY + "px";
        pointer.style.left = e.pageX + "px";
    });

    // Event Listener for Touch Movements
    document.addEventListener("touchmove", (e) => {
        pointer.style.top = e.pageY + "px";
        pointer.style.left = e.pageX + "px";
    });
});

