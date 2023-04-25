// Default DOM Method
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));
 
  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@author.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  // Add Author
  const addBtn = document.getElementById("add_author_btn");
  const authorsGroup = document.getElementById('authors-collections');

  addBtn.addEventListener("click", () => {
    const newAuthor = document.createElement('fieldset');
    const count = authorsGroup.childElementCount;
    
    newAuthor.id = `author${count + 1}`;

    const legend = document.createElement("legend");
    legend.setAttribute("class", "author-card-header");

      const paragraph = document.createElement("p");
      paragraph.innerHTML = `Author ${count + 1}`;

      const hr = document.createElement("hr");
      hr.setAttribute("class", "divider");

      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("type", "button");
      removeBtn.setAttribute("class", "button_minus");
      removeBtn.setAttribute("onclick", `removeAuthor(author${count + 1})`);
      removeBtn.setAttribute("id", `removeBtn${count + 1}`);
      removeBtn.innerHTML = "Remove";

    legend.appendChild(paragraph);
    legend.appendChild(hr);
    legend.appendChild(removeBtn);

    const firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "author-first-name");

      const firstNameBreak = document.createElement("b");
      firstNameBreak.innerHTML = "First Name";

    firstNameLabel.appendChild(firstNameBreak);

    const firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("id", `author-first-name-${count}`);
    firstNameInput.setAttribute("name", "author-first-name");
    firstNameInput.required = true;

    const lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "author-last-name");

      const lastNameBreak = document.createElement("b");
      lastNameBreak.innerHTML = "Last Name";

    lastNameLabel.appendChild(lastNameBreak);

    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("id", `author-last-name-${count}`);
    lastNameInput.setAttribute("name", "author-last-name");
    lastNameInput.required = true;

    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "author-email");

      const emailBreak = document.createElement("b");
      emailBreak.innerHTML = "Email";

    emailLabel.appendChild(emailBreak);

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("id", `author-email-${count}`);
    emailInput.setAttribute("name", "author-email");
    emailInput.required = true;

  });

  // Form on Submission Section
  const paperTitle = document.getElementById("paper-title").value;
  const paperAbstract = document.getElementById("abstract-label").value;
  
  // TODO: grab the form
  
});




// // Prior Dev
// const Add_btn = document.getElementById('add_author_btn');
// const Remove_btn = document.getElementById('remove_author_btn');
// const Authors =document.getElementById('all-authors-information-field');


// Add_btn.addEventListener('click',addAuthor);
// // Remove_btn.addEventListener('click',removeAuthor);

// let author_count = 1;
// function addAuthor() {

//     console.log("button clicked");
//     const newAuthor = document.createElement('fieldset');
//     author_count=author_count+1;
//     newAuthor.id = `author${author_count}`; // assign an id to the new fieldset
//     newAuthor.innerHTML = ` 
//               <legend class="author-card-header">
//               <p> Author ${author_count} </p>
//               <hr class="divider">
//               <button type="button" class="button_minus" onclick="removeAuthor('${newAuthor.id}')" id="remove${author_count}"> Remove</button>
//               </legend>
              
//               <label for="author-first-name"><b>First Name</b></label>
//               <input type="text" id="author-first-name" name="author-first-name" required />

//               <label for="author-last-name"><b>Last Name</b></label>
//               <input type="text" id="author-last-name" name="author-last-name" required />
  
//               <label for="author-email"><b>Email</b></label>
//               <input type="email" id="author-email" name="author-email" required />
  
//               <label for="author-affiliation"><b>Affiliation</b></label>
//               <input type="text" id="author-affiliation" name="author-affiliation-1" required />
//               <div id="presenter-declaration">
//                 <label for="presenter"><b>Presenter</b></label>
//                 <input type="checkbox" id="presenter-checkbox" name="presenter" value="2" />
//               </div>           
// `
//     Authors.insertBefore(newAuthor, Add_btn);
//     if(author_count>2){
//       const removebutton = document.getElementById(`remove${author_count-1}`);
//       removebutton.remove();}
// }

// function removeAuthor(authorID) {
//   const authorFieldset = document.getElementById(authorID);
//   authorFieldset.remove();
//   author_count--;
//   if (author_count > 1) {
//     const prevAuthorID = `author${author_count}`;
//     const prevAuthor = document.getElementById(prevAuthorID);
//     const removeBtn = prevAuthor.querySelector('button');

//     if (!removeBtn) {
//       const newRemoveBtn = document.createElement('button');
//       newRemoveBtn.type = "button";
//       newRemoveBtn.className = "button_minus";
//       newRemoveBtn.id = `remove${author_count}`;
//       newRemoveBtn.textContent = "Remove";
//       newRemoveBtn.addEventListener('click', () => {
//         removeAuthor(prevAuthorID);
//       });

//       const legend = prevAuthor.querySelector('legend');
//       legend.appendChild(newRemoveBtn);
//     }
//   }
// }
