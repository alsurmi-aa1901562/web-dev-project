// Default DOM Method
document.addEventListener("DOMContentLoaded", async () => {
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));
 
  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@author.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  
});




// Prior Dev
const Add_btn = document.getElementById('add_author_btn');
const Remove_btn = document.getElementById('remove_author_btn');
const Authors =document.getElementById('all-authors-information-field');


Add_btn.addEventListener('click',addAuthor);
// Remove_btn.addEventListener('click',removeAuthor);

let author_count = 1;
function addAuthor() {

    console.log("button clicked");
    const newAuthor = document.createElement('fieldset');
    author_count=author_count+1;
    newAuthor.id = `author${author_count}`; // assign an id to the new fieldset
    newAuthor.innerHTML = ` 
              <legend class="author-card-header">
              <p> Author ${author_count} </p>
              <hr class="divider">
              <button type="button" class="button_minus" onclick="removeAuthor('${newAuthor.id}')" id="remove${author_count}"> Remove</button>
              </legend>
              
              <label for="author-first-name"><b>First Name</b></label>
              <input type="text" id="author-first-name" name="author-first-name" required />

              <label for="author-last-name"><b>Last Name</b></label>
              <input type="text" id="author-last-name" name="author-last-name" required />
  
              <label for="author-email"><b>Email</b></label>
              <input type="email" id="author-email" name="author-email" required />
  
              <label for="author-affiliation"><b>Affiliation</b></label>
              <input type="text" id="author-affiliation" name="author-affiliation-1" required />
              <div id="presenter-declaration">
                <label for="presenter"><b>Presenter</b></label>
                <input type="checkbox" id="presenter-checkbox" name="presenter" value="2" />
              </div>           
`
    Authors.insertBefore(newAuthor, Add_btn);
    if(author_count>2){
      const removebutton = document.getElementById(`remove${author_count-1}`);
      removebutton.remove();}
}

function removeAuthor(authorID) {
  const authorFieldset = document.getElementById(authorID);
  authorFieldset.remove();
  author_count--;
  if (author_count > 1) {
    const prevAuthorID = `author${author_count}`;
    const prevAuthor = document.getElementById(prevAuthorID);
    const removeBtn = prevAuthor.querySelector('button');

    if (!removeBtn) {
      const newRemoveBtn = document.createElement('button');
      newRemoveBtn.type = "button";
      newRemoveBtn.className = "button_minus";
      newRemoveBtn.id = `remove${author_count}`;
      newRemoveBtn.textContent = "Remove";
      newRemoveBtn.addEventListener('click', () => {
        removeAuthor(prevAuthorID);
      });

      const legend = prevAuthor.querySelector('legend');
      legend.appendChild(newRemoveBtn);
    }
  }
}
