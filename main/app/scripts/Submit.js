const Add_btn = document.getElementById('add_author_btn');
const Authors =document.getElementById('all-authors-information-field');


Add_btn.addEventListener('click',addAuthor);

let author_count = 1;
function addAuthor() {

    console.log("button clicked");
    const newAuthor = document.createElement('fieldset');
    author_count=author_count+1;
    newAuthor.id = 'author#'; // assign an id to the new fieldset
    newAuthor.innerHTML = ` 
              <legend><b>Author ${author_count}</b></legend>
              <label for="author-name"><b>Name</b></label>
              <input type="text" id="author-name" name="author-name" required />
  
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

}