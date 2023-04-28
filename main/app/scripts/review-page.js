const paperURL = "http://localhost:3000/api/paper";

async function createCard(type, paper, reviewerIndex) {
  const toReviewGroup = document.getElementById("toReviewPaperGroup");
  const reviewedGroup = document.getElementById("reviewedPaperGroup");

  const count = toReviewGroup.childElementCount;

  const paperSection = document.createElement("section");
  const paperTitle = document.createElement("p");
  if(type){
    paperSection.setAttribute("id", `paper-card${count + 1}`);
    paperSection.setAttribute("class", "paper-card");
    
    paperTitle.setAttribute("class", "paper-title");
    paperTitle.setAttribute("id", `paper-title${count + 1}`);
    paperTitle.innerHTML = `${paper.title} 🅾️`
  }
  else{
    const innerCount = reviewedGroup.childElementCount;
    paperSection.setAttribute("id", `reviewed-paper-card${innerCount + 1}`);
    paperSection.setAttribute("class", "paper-card");

    paperTitle.setAttribute("class", "paper-title");
    paperTitle.setAttribute("id", `paper-title${innerCount + 1}`);
    paperTitle.innerHTML = `${paper.title} &#x2705`
  }
  
    // Go Through the Array of Authors
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
    paperAuthors.innerHTML = `${authorList}`;

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
        downloadAnchor.setAttribute("id", `download${count + 1}`);
        downloadAnchor.innerHTML = "[DOWNLOAD PAPER]";

      downloadParagraph.appendChild(downloadAnchor);
    
    downloadDiv.appendChild(downloadParagraph);

    const reviewBtn = document.createElement("button");
    reviewBtn.setAttribute("class", "review-button");
    reviewBtn.setAttribute("id", `reviewbtn${count + 1}`);
    // reviewBtn.setAttribute("onclick", `openModal(${count + 1}, true)`);

    if(type) {
      reviewBtn.innerHTML = "Review Paper";

      // Load Modal Submit
      reviewBtn.addEventListener("click", ()=>{
        const submitModal = document.getElementById("modal");
        submitModal.style.display = "block";

        // Event Listener When Clicking Off the Modal
        submitModal.addEventListener('click', (e) => {
          if(e.target == submitModal) {
            submitButton.removeAttribute("type");
            submitButton.removeAttribute("reviewerIndex");
            submitModal.style.display = "none";
          }
        });

        const submitButton = document.getElementById("submitReview");
        submitButton.setAttribute("paperid", `${paper.id}`);
        submitButton.setAttribute("reviewerIndex", `${reviewerIndex}`);

      });
    }
    else {
      reviewBtn.innerHTML = "Update Review";
      // Load Modal Update
      reviewBtn.addEventListener("click", ()=>{
        const submitModal = document.getElementById("modal");
        submitModal.style.display = "block";

        // Event Listener When Clicking Off the Modal
        submitModal.addEventListener('click', (e) => {
          if(e.target == submitModal) {
            submitButton.removeAttributeN("paperid");
            submitButton.removeAttribute("reviewerindex");
            submitModal.style.display = "none";
          }
        });

        const evaluation = document.getElementById("overall-evaluation");
        evaluation.value = `${paper.reviewers[reviewerIndex].evaluation}`;

        const contribution = document.getElementById("paper-contribution");
        contribution.value = `${paper.reviewers[reviewerIndex].contribution}`;

        const strengths = document.getElementById("paper-strengths");
        strengths.value = `${paper.reviewers[reviewerIndex].strengths}`;

        const weaknesses = document.getElementById("paper-weaknesses");
        weaknesses.value = `${paper.reviewers[reviewerIndex].weaknesses}`;

        const submitButton = document.getElementById("submitReview");
        submitButton.setAttribute("paperid", `${paper.id}`);
        submitButton.setAttribute("reviewerIndex", `${reviewerIndex}`);
      });
    }
    // Event Listener to Close Modal
    const closeModal = document.getElementById("closeButton");

    closeModal.addEventListener("click", () => {
      const submitButton = document.getElementById("submitReview");
      const submitModal = document.getElementById("modal");

      submitButton.removeAttribute("paperid");
      submitButton.removeAttribute("reviewerindex");
  
      submitModal.style.display = "none";
    });
      
  paperSection.appendChild(paperTitle);
  paperSection.appendChild(paperAuthors);
  paperSection.appendChild(abstractDiv);
  paperSection.appendChild(downloadDiv);
  paperSection.appendChild(reviewBtn);
  
  if(type){
    toReviewGroup.append(paperSection);
  }
  else{
    reviewedGroup.append(paperSection);
  }
  
  const css = `
        #paper-card${count + 1}:hover,
        #paper-title${count + 1}:hover,
        #abstractDiv${count + 1}:hover,
        #downloadDiv${count + 1}:hover,
        #authors${count + 1}:hover {
          transform: scale(1.015);
          transition: 0.1s ease-in-out;
        }

        #submitReview${count + 1}:not(:hover),
        #reviewbtn${count + 1}:not(:hover),
        #paper-card${count + 1}:not(:hover),
        #paper-title${count + 1}:not(:hover),
        #abstractDiv${count + 1}:not(:hover),
        #downloadDiv${count + 1}:not(:hover),
        #authors${count + 1}:not(:hover),
        #reviewbtn${count + 1}:not(:hover) {
          transform: scale(1);
          transition: 0.1s ease-in-out;
        }

        #reviewbtn${count + 1}:hover{
          transform: scale(1.035);
          transition: 0.15s ease-in-out;
        }
        #reviewbtn${count + 1}:not(:hover){
          transform: scale(1);
          transition: 0.15s ease-in-out;
        }
      `
      
    const style = document.createElement("style");
    style.innerHTML = css;

  const styleDiv = document.createElement("div");
  styleDiv.appendChild(style)

  const cards = document.getElementById("main-section-review");
  
  cards.append(styleDiv);

}

// Default DOM 
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));
 
  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@reviewer.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  // Add Assigned and Reviewed Papers on Load
  const res = await fetch(paperURL);
  const papers = await res.json();
  papers.forEach((e, i) => {
    let reviewerIndex = -1;
    let evaluation;

    if(e.reviewers[0].id == getLogInfo.identity) {
      reviewerIndex = 0;
      evaluation = e.reviewers[0].evaluation;
    }
    else if(e.reviewers[1].id == getLogInfo.identity) {
      reviewerIndex = 1;
      evaluation = e.reviewers[1].evaluation;
    }
    else{
      reviewerIndex = -1;
      evaluation = 0;
    }


    if(evaluation == -999 && reviewerIndex >= 0) { // Add papers with no eval (DEFAULT = -999)
      createCard(true , e, reviewerIndex);
    }
    else if(evaluation >= -2 && evaluation <= 2 && reviewerIndex >= 0){
      createCard(false, e, reviewerIndex);
    }
  });

  // Assigning Event Handlers to Submit Buttons
  const submitButton = document.getElementById("submitReview");
  submitButton.addEventListener("click", async (e) => {

    e.preventDefault();
    const res = await fetch(paperURL + `/${submitButton.getAttribute("paperid")}`);
    const paper = await res.json();

    paper.reviewers[submitButton.getAttribute("reviewerindex")].contribution = document.getElementById("paper-contribution").value;
    paper.reviewers[submitButton.getAttribute("reviewerindex")].evaluation = document.getElementById("overall-evaluation").value;
    paper.reviewers[submitButton.getAttribute("reviewerindex")].strengths = document.getElementById("paper-strengths").value;
    paper.reviewers[submitButton.getAttribute("reviewerindex")].weaknesses = document.getElementById("paper-weaknesses").value;

    const resPut = await fetch(paperURL + `/${submitButton.getAttribute("paperid")}`, {
        method: "PUT",
        body: JSON.stringify(paper)
      });
  });
  

  // Validation of Whether or Not Assigned Papers is Empty or Reviewed Papers

  const card = document.getElementById("paper-card1");
  const toReview = document.getElementById("toReviewPaperGroup");
  const place = document.getElementById("elementsNAN");

  const reviewedCard = document.getElementById("reviewed-paper-card1");
  const reviewed = document.getElementById("reviewedPaperGroup");
  const reviewedPlace = document.getElementById("reviewedElementsNAN");

  if(!card){
    const placementDiv = document.createElement("div");
    placementDiv.id = "elementsNAN";

      const noPapers = document.createElement("p");
      noPapers.className = "authors";
      noPapers.innerHTML = "Phew~ looks like there are no papers to review!"

    placementDiv.appendChild(noPapers);
    toReview.appendChild(placementDiv);
  }
  else if(place && card) {
    place.remove();
  }
  
  if(!reviewedCard){
    const placementDiv = document.createElement("div");
    placementDiv.id = "reviewedElementsNAN";

      const noPapers = document.createElement("p");
      noPapers.className = "authors";
      noPapers.innerHTML = "Looks like you have not reviewed anything!"

    placementDiv.appendChild(noPapers);
    reviewed.appendChild(placementDiv);
  }
  else if(reviewedPlace && reviewedCard){
    reviewedPlace.remove();
  }

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


