// Global Variables
const institutionsURL = "http://localhost:3000/api/institutions";
const uploadURL = "http://localhost:3000/api/file";
const paperURL = "http://localhost:3000/api/paper";
const usersURL = "http://localhost:3000/api/user";

// Add Author Method
async function addAuthor() {
    const authorsGroup = document.getElementById('authors-collections');
    const newAuthor = document.createElement('fieldset');
    const count = authorsGroup.childElementCount;

    const res = await fetch(institutionsURL);
    let institutions = await res.json();
    
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
      removeBtn.setAttribute("onclick", `removeAuthor("author${count + 1}")`);
      removeBtn.setAttribute("id", `removeBtn${count + 1}`);
      removeBtn.innerHTML = "Remove";

    legend.appendChild(paragraph);
    legend.appendChild(hr);

    if(authorsGroup.childElementCount >= 1){
      legend.appendChild(removeBtn);
    }

    const firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "author-first-name");

      const firstNameBreak = document.createElement("b");
      firstNameBreak.innerHTML = "First Name";

    firstNameLabel.appendChild(firstNameBreak);

    const firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("id", `author-first-name-${count + 1}`);
    firstNameInput.setAttribute("name", `author-first-name-${count + 1}`);
    firstNameInput.required = true;

    const lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "author-last-name");

      const lastNameBreak = document.createElement("b");
      lastNameBreak.innerHTML = "Last Name";

    lastNameLabel.appendChild(lastNameBreak);

    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("id", `author-last-name-${count + 1}`);
    lastNameInput.setAttribute("name", `author-last-name-${count + 1}`);
    lastNameInput.required = true;

    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "author-email");

      const emailBreak = document.createElement("b");
      emailBreak.innerHTML = "Email";

    emailLabel.appendChild(emailBreak);

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", `author-email-${count + 1}`);
    emailInput.setAttribute("name", `author-email-${count + 1}`);
    emailInput.required = true;

    const affiliationSelectionLabel = document.createElement("label");
    affiliationSelectionLabel.setAttribute("for", "author-affiliation");

      const affiliationSelectionBreak = document.createElement("b");
      affiliationSelectionBreak.innerHTML = "Affiliation";

    affiliationSelectionLabel.appendChild(affiliationSelectionBreak);

    const affiliationSelectionInput = document.createElement("select");
    affiliationSelectionInput.setAttribute("id", `author-affiliation-${count + 1}`);
    affiliationSelectionInput.setAttribute("name", `author-affiliation-${count + 1}`);
    affiliationSelectionInput.required = true;

    institutions.forEach((e) => {
      const option = document.createElement("option");
      option.setAttribute("id", `${e.name}-${count + 1}`);
      option.setAttribute("value", `${e.id}`);
      option.innerHTML = `${e.name}`;

      affiliationSelectionInput.appendChild(option);
    });

    const presentorDiv = document.createElement("div");
    presentorDiv.setAttribute("id", "presenter-declaration");

      const presenterLabel = document.createElement("label");
      presenterLabel.setAttribute("for", "presenter");

        const presenterBreak = document.createElement("b");
        presenterBreak.innerHTML = "Presenter";

      presenterLabel.appendChild(presenterBreak);

      const presenterInput = document.createElement("input");
      presenterInput.setAttribute("type", "checkbox");
      presenterInput.setAttribute("id", `presenter-checkbox-${count + 1}`);
      presenterInput.setAttribute("name", `presenter-checkbox-${count + 1}`);

      if(count > 0) {
        presenterInput.checked = false;
      }
      else {
        presenterInput.checked = true;
      }

    presentorDiv.appendChild(presenterLabel);
    presentorDiv.appendChild(presenterInput);

    const css = `
    #author-first-name-${count + 1}:hover, 
    #author-last-name-${count + 1}:hover, 
    #author-email-${count + 1}:hover, 
    #author-affiliation-${count + 1}:hover, 
    #author${count + 1}:hover{
      transform: scale(1.015);
      transition: 0.25s ease-in-out;
    }
    #author-first-name-${count + 1}:not(:hover), 
    #author-last-name-${count + 1}:not(:hover),
    #author-email-${count + 1}:not(:hover), 
    #author-affiliation-${count + 1}:not(:hover),
    #author${count + 1}:not(:hover) {
      transform: scale(1);
      transition: 0.25s ease-in-out;
    }
    `
    const style = document.createElement('style');
    style.innerHTML = css;

    newAuthor.appendChild(legend);
    newAuthor.appendChild(firstNameLabel);
    newAuthor.appendChild(firstNameInput);
    newAuthor.appendChild(lastNameLabel);
    newAuthor.appendChild(lastNameInput);
    newAuthor.appendChild(emailLabel);
    newAuthor.appendChild(emailInput);
    newAuthor.appendChild(affiliationSelectionLabel);
    newAuthor.appendChild(affiliationSelectionInput);
    newAuthor.appendChild(presentorDiv);
    newAuthor.appendChild(style);

    authorsGroup.appendChild(newAuthor);
}

function removeAuthor(author) {
  const selector = document.getElementById(author);
  selector.remove();
}

function createCard(paper, count) {
  const group = document.getElementById("SubmittedPaperGroup");
  const paperSection = document.createElement("section");
  const paperTitle = document.createElement("p");
  paperSection.setAttribute("id", `paper-${paper.id}`);
  paperSection.setAttribute("class", "paper-card");

  paperTitle.innerHTML = "Paper Title: " + paper.title;
  paperTitle.setAttribute("class", "paper-title");
  paperTitle.setAttribute("id", `paper-title-${count + 1}`);

  let authorList = "";
  paper.authors.forEach((e, i) => {
    // Styling
    const fname = e.fname.charAt(0).toUpperCase() + e.fname.slice(1);
    const lname = e.lname.charAt(0).toUpperCase() + e.lname.slice(1);

    // Adding to String
    if(i < paper.authors.length - 1) {
      authorList += ` ${fname} ${lname},`
    }
    else{
      authorList += ` ${fname} ${lname}`
    }
  });

  const paperAuthors = document.createElement("p");
  paperAuthors.setAttribute("class", "authors");
  paperAuthors.setAttribute("id", `authors${count + 1}`);
  paperAuthors.innerHTML = `Authors: ${authorList}`;

  const abstractDiv = document.createElement("div");
  abstractDiv.setAttribute("class", "abstract");
  abstractDiv.setAttribute("id", `abstractDiv${count + 1}`);

    const abstractBtn = document.createElement("button");
    abstractBtn.setAttribute("type", "button");
    abstractBtn.setAttribute("class", "abstract-collapsible");
    abstractBtn.setAttribute("id", `abstractCollapse${count + 1}`)
    abstractBtn.innerHTML = "Abstract";

    const abstractContentDiv = document.createElement("div");
    abstractContentDiv.setAttribute("class", "abstract-content");
    abstractContentDiv.setAttribute("id", `abstractContent${count + 1}`);

      const abstractContentParagraph = document.createElement("p");
      abstractContentParagraph.innerHTML = `${paper.abstract}`;

    abstractContentDiv.appendChild(abstractContentParagraph);

    // Event Listener to Collapse and Uncollapse Abstract
    abstractBtn.addEventListener("click", () =>{
      if(abstractBtn.className.includes("active")){
        abstractBtn.classList = "abstract-collapsible";
      abstractContentDiv.style.display = "none";
      }
      else{
        abstractBtn.classList = "abstract-collapsible active";
        abstractContentDiv.style.display = "block";
      }
    });

  abstractDiv.appendChild(abstractBtn);
  abstractDiv.appendChild(abstractContentDiv);

  const downloadDiv = document.createElement("div");
  downloadDiv.setAttribute("class", "download");
  downloadDiv.setAttribute("id", `downloadDiv${count + 1}`);

    const downloadParagraph = document.createElement("p");
    downloadParagraph.innerHTML = "Paper Link: "

      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("class", "download-link");
      downloadAnchor.innerHTML = "[DOWNLOAD PAPER]";

      // Assigning urls To Download Papers
      downloadAnchor.addEventListener("click", async ()=>{
        const resp = await fetch(uploadURL+`?fileName=${paper.pdfPath}`);
        const blobData = await resp.blob();
        const url = window.URL.createObjectURL(blobData);
        const a = document.createElement("a");
        a.href = url;
        a.download = paper.pdfPath;
        a.click();
        a.remove();
      });

    downloadParagraph.appendChild(downloadAnchor);
  
  downloadDiv.appendChild(downloadParagraph);
  paperSection.appendChild(paperTitle);
  paperSection.appendChild(paperAuthors);
  paperSection.appendChild(abstractDiv);
  paperSection.appendChild(downloadDiv);
  group.appendChild(paperSection);
}

// Default DOM Method
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));

  // Redirect if no cache is available or wrong user is logged
  if(getLogInfo == null) {
    window.location.href = "../login.html";
  }

  if(!getLogInfo.username.includes("@author.com")) {
    window.location.href = "../login.html";
  }

  // Clear Logged in Cache on logout
  document.getElementById("logout").addEventListener("click", ()=>{
    localStorage.clear();

  });

  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@author.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  // Grab papers from database
  const paperResponse = await fetch(paperURL);

  const papers = await paperResponse.json();

  if(papers) {
    let list =[];
    papers.forEach((paper, i) => {
    if(paper.submitterId == getLogInfo.identity) {
      list.push(paper);
    }});

    list.reverse().forEach((paper, i) => {
      createCard(paper, i);
    });
  }
  
  // Add One Author by Default
  const author = document.getElementById("author1");

  if(!author){
    addAuthor();
  }

  // Add Author Button 
  const addBtn = document.getElementById("add_author_btn");

  addBtn.addEventListener("click", async () => {
    addAuthor();
  });

  // Form on Submission Section
  document.getElementById("submission-form").addEventListener("submit", async (e) => {
    // Prevent Refresh of Page
    e.preventDefault();
        
    // Grabbing form data
    const form = e.target;
    const data = new FormData(form);

    const title = data.get("paper-title");
    const abstract = data.get("paper-title");

    // Grabbing all Authors
    let authors = [];
    let presenterIsSelected = false;
    const authorsGroup = document.getElementById('authors-collections');

    if(authorsGroup.childElementCount == 1) {
      data.set("presenter-checkbox-1","on");
    }

    for(let i = 1; i <= authorsGroup.childElementCount; i++) {
      if(data.get(`presenter-checkbox-${i}`) != null){
        presenterIsSelected = true;
      }
    }

    if(presenterIsSelected) {
      for(let i = 1; i <= authorsGroup.childElementCount; i++) {
        let presenterValidation;
  
        if(data.get(`presenter-checkbox-${i}`) == null){
          presenterValidation = "false";
        }
        else{
          presenterValidation = "true";
        }
       
        const author = {
          "fname": `${data.get(`author-first-name-${i}`)}`,
          "lname": `${data.get(`author-last-name-${i}`)}`,
          "email": `${data.get(`author-email-${i}`)}`,
          "institutionId": `${data.get(`author-affiliation-${i}`)}`,
          "isPresenter": `${presenterValidation}`
        }
  
       authors.push(author);
      }

      const file = data.get("paper-pdf");
      
      const formdata = new FormData();
      formdata.append('file', file);

      const response = await fetch(uploadURL, {
        method: "POST",
        body: formdata
      });

      const getJson = await response.json();


      const usersRes = await fetch(usersURL + "?type=reviewer");
      let reviewers = await usersRes.json();
      
      const shuffleReviewers = reviewers.sort(() => 0.5 - Math.random());
      shuffleReviewers.splice(2, shuffleReviewers.length);
      console.log(getJson);
      const request = await fetch(paperURL, {
        method: "POST",
        body: JSON.stringify({
          "title": `${title}`,
          "abstract": `${abstract}`,
          "submitterId": `${getLogInfo.identity}`,
          "authors": authors,
          "pdfPath": `${getJson.fileName}`,
          "reviewers": [
            {
              "userId": `${shuffleReviewers[0].id}`,
              "evaluation": -999,
              "contribution": 0,
            },
            {
              "userId": `${shuffleReviewers[1].id}`,
              "evaluation": -999,
              "contribution": 0,
            },
          ]
        })
      })
      location.reload();
    }
    else{
      const errorMessage = document.createElement("p");
      errorMessage.innerHTML = "Uh oh! Please Select One Presentor!";
      errorMessage.setAttribute("id", "error-message-submit");

      errorMessage.style.fontSize = "small";

      document.getElementById("upload-form").parentNode.insertBefore(errorMessage, document.getElementById("upload-form").nextSibling);
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


const deleteButton = document.getElementById("logout");
deleteButton.addEventListener("click", function() {
  window.location.href = "/";
});