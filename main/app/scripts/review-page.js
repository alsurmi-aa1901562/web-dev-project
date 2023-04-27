const paperURL = "http://localhost:3000/api/paper";

async function createCard(type, paper, reviewerIndex) {
  if(type){
    const toReviewGroup = document.getElementById("toReviewPaperGroup");
    const count = toReviewGroup.childElementCount;

    const paperSection = document.createElement("section");
    paperSection.setAttribute("id", `paper-card${count + 1}`);
    paperSection.setAttribute("class", "paper-card");

      const paperTitle = document.createElement("p");
      paperTitle.setAttribute("class", "paper-title");
      paperTitle.setAttribute("id", `paper-title${count + 1}`);
      paperTitle.innerHTML = `${paper.title} 🅾️`

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
        abstractBtn.setAttribute("onclick", `abstractCollapse(${count + 1}, true)`)
        abstractBtn.innerHTML = "Abstract";


        const abstractContentDiv = document.createElement("div");
        abstractContentDiv.setAttribute("class", "abstract-content");
        abstractContentDiv.setAttribute("id", `abstractContent${count + 1}`);

          const abstractContentParagraph = document.createElement("p");
          abstractContentParagraph.innerHTML = `${paper.abstract}`;

        abstractContentDiv.appendChild(abstractContentParagraph);

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
      reviewBtn.setAttribute("onclick", `openModal(${count + 1}, true)`);
      reviewBtn.innerHTML = "Review Paper";

      // Modal
      const modalDiv = document.createElement("div");
      modalDiv.setAttribute("id", `modal${count + 1}`);
      modalDiv.setAttribute("class", `modal`);
      modalDiv.setAttribute("style", `display: none;`);

        const modalContentDiv = document.createElement("div");
        modalContentDiv.setAttribute("class", "modal-content");

          const modalSpan = document.createElement("span");
          modalSpan.setAttribute("class", "close");
          modalSpan.setAttribute("onclick", `closeModal(${count + 1}, true)`);
          modalSpan.innerHTML = "×"

          const modalTitle = document.createElement("h1");
          modalTitle.setAttribute("class", "paper-title");
          modalTitle.setAttribute("id", `paper-title-modal${count+1}`);
          modalTitle.innerHTML = `${paper.title}`;

          const modalForm = document.createElement("form");

            const modalFormEvaluationDiv = document.createElement("div");
            modalFormEvaluationDiv.setAttribute("class", "review-form-field");

              const modalFormEvaluationLabel = document.createElement("label");
              modalFormEvaluationLabel.setAttribute("for", "overall-evaluation");
              modalFormEvaluationLabel.setAttribute("class", "form_lablel");

                const modalFormEvaluationBreak = document.createElement("b");
                modalFormEvaluationBreak.innerHTML = "Overall Evaluation:";

              modalFormEvaluationLabel.appendChild(modalFormEvaluationBreak);

              const modalFormEvaluationSelect = document.createElement("select");
              modalFormEvaluationSelect.setAttribute("class","form_input");
              modalFormEvaluationSelect.setAttribute("id",`overall-evaluation${count + 1}`);
              modalFormEvaluationSelect.setAttribute("name","overall-evaluation");

                const modalFormEvaluationOption1 = document.createElement("option");
                modalFormEvaluationOption1.setAttribute("value", "2");
                modalFormEvaluationOption1.innerHTML = "Strong Accept";

                const modalFormEvaluationOption2 = document.createElement("option");
                modalFormEvaluationOption2.setAttribute("value", "1");
                modalFormEvaluationOption2.innerHTML = "Accept";

                const modalFormEvaluationOption3 = document.createElement("option");
                modalFormEvaluationOption3.setAttribute("value", "0");
                modalFormEvaluationOption3.innerHTML = "Borderline";

                const modalFormEvaluationOption4 = document.createElement("option");
                modalFormEvaluationOption4.setAttribute("value", "-1");
                modalFormEvaluationOption4.innerHTML = "Reject";

                const modalFormEvaluationOption5 = document.createElement("option");
                modalFormEvaluationOption5.setAttribute("value", "-2");
                modalFormEvaluationOption5.innerHTML = "Strong Reject";

              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption1);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption2);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption3);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption4);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption5);

            modalFormEvaluationDiv.appendChild(modalFormEvaluationLabel);
            modalFormEvaluationDiv.appendChild(modalFormEvaluationSelect);

            const modalContributionDiv = document.createElement("div");
            modalContributionDiv.setAttribute("class", "review-form-field");

              const modalFormContributionLabel = document.createElement("label");
              modalFormContributionLabel.setAttribute("for", "paper-contribution");
              modalFormContributionLabel.setAttribute("class", "form_lablel");

                const modalFormContributionBreak = document.createElement("b");
                modalFormContributionBreak.innerHTML = "Paper Contribution:";

              modalFormContributionLabel.appendChild(modalFormContributionBreak);

              const modalFormContributionSelect = document.createElement("select");
              modalFormContributionSelect.setAttribute("class","form_input");
              modalFormContributionSelect.setAttribute("id",`paper-contribution${count + 1}`);
              modalFormContributionSelect.setAttribute("name","paper-contribution");

                const modalFormContributionOption1 = document.createElement("option");
                modalFormContributionOption1.setAttribute("value", "5");
                modalFormContributionOption1.innerHTML = "Major and Significant Contribution";

                const modalFormContributionOption2 = document.createElement("option");
                modalFormContributionOption2.setAttribute("value", "4");
                modalFormContributionOption2.innerHTML = "Clear Contribution";

                const modalFormContributionOption3 = document.createElement("option");
                modalFormContributionOption3.setAttribute("value", "3");
                modalFormContributionOption3.innerHTML = "Minor Contribution";

                const modalFormContributionOption4 = document.createElement("option");
                modalFormContributionOption4.setAttribute("value", "2");
                modalFormContributionOption4.innerHTML = "No Obvious Contribution";

                const modalFormContributionOption5 = document.createElement("option");
                modalFormContributionOption5.setAttribute("value", "1");
                modalFormContributionOption5.innerHTML = "No Obvious Contribution";

              modalFormContributionSelect.appendChild(modalFormContributionOption1);
              modalFormContributionSelect.appendChild(modalFormContributionOption2);
              modalFormContributionSelect.appendChild(modalFormContributionOption3);
              modalFormContributionSelect.appendChild(modalFormContributionOption4);
              modalFormContributionSelect.appendChild(modalFormContributionOption5);

            modalContributionDiv.appendChild(modalFormContributionLabel);
            modalContributionDiv.appendChild(modalFormContributionSelect);

            
            const modalStrengthsDiv = document.createElement("div");
            modalStrengthsDiv.setAttribute("class", "review-form-field");

              const modalFormStrengthsLabel = document.createElement("label");
              modalFormStrengthsLabel.setAttribute("for", "paper-strengths");
              modalFormStrengthsLabel.setAttribute("class", "form_lablel");

                const modalFormStrengthsBreak = document.createElement("b");
                modalFormStrengthsBreak.innerHTML = "Paper Strengths:";

              modalFormStrengthsLabel.appendChild(modalFormStrengthsBreak);

              const modalFormStrengthsText = document.createElement("textarea");
              modalFormStrengthsText.setAttribute("class", "form_input");
              modalFormStrengthsText.setAttribute("id", `paper-strengths${count + 1}`);
              modalFormStrengthsText.setAttribute("name", "paper-strengths");
              modalFormStrengthsText.required = true;

            modalStrengthsDiv.appendChild(modalFormStrengthsLabel);
            modalStrengthsDiv.appendChild(modalFormStrengthsText);

            const modalWeaknessesDiv = document.createElement("div");
            modalWeaknessesDiv.setAttribute("class", "review-form-field");
            
              const modalFormWeaknessesLabel = document.createElement("label");
              modalFormWeaknessesLabel.setAttribute("for", "paper-weaknesses");
              modalFormWeaknessesLabel.setAttribute("class", "form_lablel");

                const modalFormWeaknessBreak = document.createElement("b");
                modalFormWeaknessBreak.innerHTML = "Paper Weakness:";

              modalFormWeaknessesLabel.appendChild(modalFormWeaknessBreak);

              const modalFormWeaknessesText = document.createElement("textarea");
              modalFormWeaknessesText.setAttribute("class", "form_input");
              modalFormWeaknessesText.setAttribute("id", `paper-weaknesses${count + 1}`);
              modalFormWeaknessesText.setAttribute("name", "paper-weaknesses");
              modalFormWeaknessesText.required = true;

            modalWeaknessesDiv.appendChild(modalFormWeaknessesLabel);
            modalWeaknessesDiv.appendChild(modalFormWeaknessesText);

            const modalSubmitFormDiv = document.createElement("div");
            modalSubmitFormDiv.setAttribute("class", "review-form-field");

              const modalSubmitBtn = document.createElement("button");
              modalSubmitBtn.setAttribute("type", "submit");
              modalSubmitBtn.setAttribute("class", "submit-review-btn");
              modalSubmitBtn.setAttribute("id", `submitReview${count + 1}`);
              modalSubmitBtn.innerHTML = "Submit"

            modalSubmitFormDiv.appendChild(modalSubmitBtn);
            
            
        modalForm.appendChild(modalFormEvaluationDiv);
        modalForm.appendChild(modalContributionDiv);
        modalForm.appendChild(modalStrengthsDiv);
        modalForm.appendChild(modalWeaknessesDiv);
        modalForm.appendChild(modalSubmitFormDiv);

        modalContentDiv.appendChild(modalSpan);
        modalContentDiv.appendChild(modalTitle);
        modalContentDiv.appendChild(modalForm);

      modalDiv.appendChild(modalContentDiv);

    paperSection.appendChild(paperTitle);
    paperSection.appendChild(paperAuthors);
    paperSection.appendChild(abstractDiv);
    paperSection.appendChild(downloadDiv);
    paperSection.appendChild(reviewBtn);

    toReviewGroup.append(paperSection);

    const css = `
          #overall-evaluation${count + 1}:hover,
          #paper-contribution${count + 1}:hover,
          #paper-strengths${count + 1}:hover,
          #paper-weaknesses${count + 1}:hover,
          #paper-card${count + 1}:hover,
          #paper-title${count + 1}:hover,
          #abstractDiv${count + 1}:hover,
          #downloadDiv${count + 1}:hover,
          #authors${count + 1}:hover {
            transform: scale(1.015);
            transition: 0.1s ease-in-out;
          }

          #overall-evaluation${count + 1}:not(hover),
          #paper-contribution${count + 1}:not(hover),
          #paper-strengths${count + 1}:not(hover),
          #paper-weaknesses${count + 1}:not(hover),
          #submitReview${count + 1}:not(hover),
          #reviewbtn${count + 1}:not(hover),
          #paper-card${count + 1}:not(hover),
          #paper-title${count + 1}:not(hover),
          #abstractDiv${count + 1}:not(hover),
          #downloadDiv${count + 1}:not(hover),
          #authors${count + 1}:not(hover),
          #reviewbtn${count + 1}:not(hover) {
            transform: scale(1);
            transition: 0.1s ease-in-out;
          }

          #submitReview${count + 1}:hover,
          #reviewbtn${count + 1}:hover{
            transform: scale(1.035);
            transition: 0.15s ease-in-out;
          }
        `
        
      const style = document.createElement("style");
      style.innerHTML = css;

    const styleDiv = document.createElement("div");
    styleDiv.appendChild(style)

    const modalGroup = document.createElement("div");
    modalGroup.appendChild(modalDiv);
      
    const cards = document.getElementById("main-section-review");
    
    cards.append(styleDiv);
    cards.append(modalGroup);
  }
  else{
    const toReviewGroup = document.getElementById("reviewedPaperGroup");
    const count = toReviewGroup.childElementCount;

    const paperSection = document.createElement("section");
    paperSection.setAttribute("id", `reviewed-paper-card${count + 1}`);
    paperSection.setAttribute("class", "paper-card");

      const paperTitle = document.createElement("p");
      paperTitle.setAttribute("class", "paper-title");
      paperTitle.setAttribute("id", `reviewed-paper-title${count + 1}`);
      paperTitle.innerHTML = `${paper.title} &#x2705`

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
      abstractDiv.setAttribute("id", `reviewed-abstractDiv${count + 1}`);

        const abstractBtn = document.createElement("button");
        abstractBtn.setAttribute("type", "button");
        abstractBtn.setAttribute("class", "abstract-collapsible");
        abstractBtn.setAttribute("id", `reviewed-abstractCollapse${count + 1}`)
        abstractBtn.setAttribute("onclick", `abstractCollapse(${count + 1}, false)`)
        abstractBtn.innerHTML = "Abstract";


        const abstractContentDiv = document.createElement("div");
        abstractContentDiv.setAttribute("class", "abstract-content");
        abstractContentDiv.setAttribute("id", `reviewed-abstractContent${count + 1}`);

          const abstractContentParagraph = document.createElement("p");
          abstractContentParagraph.innerHTML = `${paper.abstract}`;

        abstractContentDiv.appendChild(abstractContentParagraph);

      abstractDiv.appendChild(abstractBtn);
      abstractDiv.appendChild(abstractContentDiv);

      const downloadDiv = document.createElement("div");
      downloadDiv.setAttribute("class", "download");
      downloadDiv.setAttribute("id", `reviewed-downloadDiv${count + 1}`);

        const downloadParagraph = document.createElement("p");
        downloadParagraph.innerHTML = "Paper Link: "

          const downloadAnchor = document.createElement("a");
          downloadAnchor.setAttribute("class", "download-link");
          downloadAnchor.setAttribute("id", `reviewed-download${count + 1}`);
          downloadAnchor.innerHTML = "[DOWNLOAD PAPER]";

        downloadParagraph.appendChild(downloadAnchor);
      
      downloadDiv.appendChild(downloadParagraph);

      const reviewBtn = document.createElement("button");
      reviewBtn.setAttribute("class", "review-button");
      reviewBtn.setAttribute("id", `reviewed-reviewbtn${count + 1}`);
      reviewBtn.setAttribute("onclick", `openModal(${count + 1}, false)`);
      reviewBtn.innerHTML = "Update Review";

      // Modal
      const modalDiv = document.createElement("div");
      modalDiv.setAttribute("id", `reviewed-modal${count + 1}`);
      modalDiv.setAttribute("class", `modal`);
      modalDiv.setAttribute("style", `display: none;`);

        const modalContentDiv = document.createElement("div");
        modalContentDiv.setAttribute("class", "modal-content");

          const modalSpan = document.createElement("span");
          modalSpan.setAttribute("class", "close");
          modalSpan.setAttribute("onclick", `closeModal(${count + 1}, false)`);
          modalSpan.innerHTML = "×"

          const modalTitle = document.createElement("h1");
          modalTitle.setAttribute("class", "paper-title");
          modalTitle.setAttribute("id", `reviewed-paper-title-modal${count+1}`);
          modalTitle.innerHTML = `${paper.title}`;

          const modalForm = document.createElement("form");

            const modalFormEvaluationDiv = document.createElement("div");
            modalFormEvaluationDiv.setAttribute("class", "review-form-field");

              const modalFormEvaluationLabel = document.createElement("label");
              modalFormEvaluationLabel.setAttribute("for", "overall-evaluation");
              modalFormEvaluationLabel.setAttribute("class", "form_lablel");

                const modalFormEvaluationBreak = document.createElement("b");
                modalFormEvaluationBreak.innerHTML = "Overall Evaluation:";

              modalFormEvaluationLabel.appendChild(modalFormEvaluationBreak);

              const modalFormEvaluationSelect = document.createElement("select");
              modalFormEvaluationSelect.setAttribute("class","form_input");
              modalFormEvaluationSelect.setAttribute("id",`reviewed-overall-evaluation${count + 1}`);
              modalFormEvaluationSelect.setAttribute("name","overall-evaluation");
              

                const modalFormEvaluationOption1 = document.createElement("option");
                modalFormEvaluationOption1.setAttribute("value", "2");
                modalFormEvaluationOption1.innerHTML = "Strong Accept";

                const modalFormEvaluationOption2 = document.createElement("option");
                modalFormEvaluationOption2.setAttribute("value", "1");
                modalFormEvaluationOption2.innerHTML = "Accept";

                const modalFormEvaluationOption3 = document.createElement("option");
                modalFormEvaluationOption3.setAttribute("value", "0");
                modalFormEvaluationOption3.innerHTML = "Borderline";

                const modalFormEvaluationOption4 = document.createElement("option");
                modalFormEvaluationOption4.setAttribute("value", "-1");
                modalFormEvaluationOption4.innerHTML = "Reject";

                const modalFormEvaluationOption5 = document.createElement("option");
                modalFormEvaluationOption5.setAttribute("value", "-2");
                modalFormEvaluationOption5.innerHTML = "Strong Reject";

              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption1);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption2);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption3);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption4);
              modalFormEvaluationSelect.appendChild(modalFormEvaluationOption5);
              modalFormEvaluationSelect.value = paper.reviewers[reviewerIndex].evaluation;

            modalFormEvaluationDiv.appendChild(modalFormEvaluationLabel);
            modalFormEvaluationDiv.appendChild(modalFormEvaluationSelect);

            const modalContributionDiv = document.createElement("div");
            modalContributionDiv.setAttribute("class", "review-form-field");

              const modalFormContributionLabel = document.createElement("label");
              modalFormContributionLabel.setAttribute("for", "paper-contribution");
              modalFormContributionLabel.setAttribute("class", "form_lablel");

                const modalFormContributionBreak = document.createElement("b");
                modalFormContributionBreak.innerHTML = "Paper Contribution:";

              modalFormContributionLabel.appendChild(modalFormContributionBreak);

              const modalFormContributionSelect = document.createElement("select");
              modalFormContributionSelect.setAttribute("class","form_input");
              modalFormContributionSelect.setAttribute("id",`reviewed-paper-contribution${count + 1}`);
              modalFormContributionSelect.setAttribute("name","paper-contribution");

                const modalFormContributionOption1 = document.createElement("option");
                modalFormContributionOption1.setAttribute("value", "5");
                modalFormContributionOption1.innerHTML = "Major and Significant Contribution";

                const modalFormContributionOption2 = document.createElement("option");
                modalFormContributionOption2.setAttribute("value", "4");
                modalFormContributionOption2.innerHTML = "Clear Contribution";

                const modalFormContributionOption3 = document.createElement("option");
                modalFormContributionOption3.setAttribute("value", "3");
                modalFormContributionOption3.innerHTML = "Minor Contribution";

                const modalFormContributionOption4 = document.createElement("option");
                modalFormContributionOption4.setAttribute("value", "2");
                modalFormContributionOption4.innerHTML = "No Obvious Contribution";

                const modalFormContributionOption5 = document.createElement("option");
                modalFormContributionOption5.setAttribute("value", "1");
                modalFormContributionOption5.innerHTML = "No Obvious Contribution";

              modalFormContributionSelect.appendChild(modalFormContributionOption1);
              modalFormContributionSelect.appendChild(modalFormContributionOption2);
              modalFormContributionSelect.appendChild(modalFormContributionOption3);
              modalFormContributionSelect.appendChild(modalFormContributionOption4);
              modalFormContributionSelect.appendChild(modalFormContributionOption5);
              modalFormContributionSelect.value = paper.reviewers[reviewerIndex].contribution;

            modalContributionDiv.appendChild(modalFormContributionLabel);
            modalContributionDiv.appendChild(modalFormContributionSelect);

            
            const modalStrengthsDiv = document.createElement("div");
            modalStrengthsDiv.setAttribute("class", "review-form-field");

              const modalFormStrengthsLabel = document.createElement("label");
              modalFormStrengthsLabel.setAttribute("for", "paper-strengths");
              modalFormStrengthsLabel.setAttribute("class", "form_lablel");

                const modalFormStrengthsBreak = document.createElement("b");
                modalFormStrengthsBreak.innerHTML = "Paper Strengths:";

              modalFormStrengthsLabel.appendChild(modalFormStrengthsBreak);

              const modalFormStrengthsText = document.createElement("textarea");
              modalFormStrengthsText.setAttribute("class", "form_input");
              modalFormStrengthsText.setAttribute("id", `reviewed-paper-strengths${count + 1}`);
              modalFormStrengthsText.setAttribute("name", "paper-strengths");
              modalFormStrengthsText.required = true;
              modalFormStrengthsText.value = paper.reviewers[reviewerIndex].strengths;

            modalStrengthsDiv.appendChild(modalFormStrengthsLabel);
            modalStrengthsDiv.appendChild(modalFormStrengthsText);

            const modalWeaknessesDiv = document.createElement("div");
            modalWeaknessesDiv.setAttribute("class", "review-form-field");
            
              const modalFormWeaknessesLabel = document.createElement("label");
              modalFormWeaknessesLabel.setAttribute("for", "paper-weaknesses");
              modalFormWeaknessesLabel.setAttribute("class", "form_lablel");

                const modalFormWeaknessBreak = document.createElement("b");
                modalFormWeaknessBreak.innerHTML = "Paper Weakness:";

              modalFormWeaknessesLabel.appendChild(modalFormWeaknessBreak);

              const modalFormWeaknessesText = document.createElement("textarea");
              modalFormWeaknessesText.setAttribute("class", "form_input");
              modalFormWeaknessesText.setAttribute("id", `reviewed-paper-weaknesses${count + 1}`);
              modalFormWeaknessesText.setAttribute("name", "paper-weaknesses");
              modalFormWeaknessesText.required = true;
              modalFormWeaknessesText.value = paper.reviewers[reviewerIndex].weaknesses;

            modalWeaknessesDiv.appendChild(modalFormWeaknessesLabel);
            modalWeaknessesDiv.appendChild(modalFormWeaknessesText);

            const modalSubmitFormDiv = document.createElement("div");
            modalSubmitFormDiv.setAttribute("class", "review-form-field");

              const modalSubmitBtn = document.createElement("button");
              modalSubmitBtn.setAttribute("type", "submit");
              modalSubmitBtn.setAttribute("class", "submit-review-btn");
              modalSubmitBtn.setAttribute("id", `reviewed-submitReview${count + 1}`);
              modalSubmitBtn.innerHTML = "Submit"

            modalSubmitFormDiv.appendChild(modalSubmitBtn);
            
            
        modalForm.appendChild(modalFormEvaluationDiv);
        modalForm.appendChild(modalContributionDiv);
        modalForm.appendChild(modalStrengthsDiv);
        modalForm.appendChild(modalWeaknessesDiv);
        modalForm.appendChild(modalSubmitFormDiv);

        modalContentDiv.appendChild(modalSpan);
        modalContentDiv.appendChild(modalTitle);
        modalContentDiv.appendChild(modalForm);

      modalDiv.appendChild(modalContentDiv);

    paperSection.appendChild(paperTitle);
    paperSection.appendChild(paperAuthors);
    paperSection.appendChild(abstractDiv);
    paperSection.appendChild(downloadDiv);
    paperSection.appendChild(reviewBtn);

    toReviewGroup.append(paperSection);

    const css = `
          #reviewed-overall-evaluation${count + 1}:hover,
          #reviewed-paper-contribution${count + 1}:hover,
          #reviewed-paper-strengths${count + 1}:hover,
          #reviewed-paper-weaknesses${count + 1}:hover,
          #reviewed-paper-card${count + 1}:hover,
          #reviewed-paper-title${count + 1}:hover,
          #reviewed-abstractDiv${count + 1}:hover,
          #reviewed-downloadDiv${count + 1}:hover,
          #reviewed-authors${count + 1}:hover {
            transform: scale(1.015);
            transition: 0.1s ease-in-out;
          }

          #reviewed-overall-evaluation${count + 1}:not(hover),
          #reviewed-paper-contribution${count + 1}:not(hover),
          #reviewed-paper-strengths${count + 1}:not(hover),
          #reviewed-paper-weaknesses${count + 1}:not(hover),
          #reviewed-submitReview${count + 1}:not(hover),
          #reviewed-reviewbtn${count + 1}:not(hover),
          #reviewed-paper-card${count + 1}:not(hover),
          #reviewed-paper-title${count + 1}:not(hover),
          #reviewed-abstractDiv${count + 1}:not(hover),
          #reviewed-downloadDiv${count + 1}:not(hover),
          #reviewed-authors${count + 1}:not(hover),
          #reviewed-reviewbtn${count + 1}:not(hover) {
            transform: scale(1);
            transition: 0.1s ease-in-out;
          }

          #reviewed-submitReview${count + 1}:hover,
          #reviewed-reviewbtn${count + 1}:hover{
            transform: scale(1.035);
            transition: 0.15s ease-in-out;
          }
        `
        
      const style = document.createElement("style");
      style.innerHTML = css;

    const styleDiv = document.createElement("div");
    styleDiv.appendChild(style)

    const modalGroup = document.createElement("div");
    modalGroup.appendChild(modalDiv);
      
    const cards = document.getElementById("main-section-review");
    
    cards.append(styleDiv);
    cards.append(modalGroup);
  }
}

// Handles the Collapse of Abstract
function abstractCollapse(id, type) {
  if(type){
    const button = document.getElementById(`abstractCollapse${id}`);
    const content = document.getElementById(`abstractContent${id}`);

    if(!button.className.includes("active")){
      button.setAttribute("class", `${button.className} active`);
      content.style.display = "block";
    }
    else{
      button.setAttribute("class", `abstract-collapsible`);
      content.style="";
    }
  }
  else{
    const button = document.getElementById(`reviewed-abstractCollapse${id}`);
    const content = document.getElementById(`reviewed-abstractContent${id}`);

    if(!button.className.includes("active")){
      button.setAttribute("class", `${button.className} active`);
      content.style.display = "block";
    }
    else{
      button.setAttribute("class", `abstract-collapsible`);
      content.style="";
    }
  }
  
  
}

// Handles the Opening of Modal
function openModal(id, type) {
  if(type) {
    const modal = document.getElementById(`modal${id}`);
    modal.style.display = "block";
  }
  else {
    const modal = document.getElementById(`reviewed-modal${id}`);
    modal.style.display = "block";
  }
}

// Handles the Closing of Modal
function closeModal(id, type) {
  if(type) {
    const modal = document.getElementById(`modal${id}`);
    modal.style.display = "none";
  }
  else {
    const modal = document.getElementById(`reviewed-modal${id}`);
    modal.style.display = "none";
  }
}


// Default DOM 
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));
 
  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@reviewer.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  // Add Assigned Papers on Load
  const res = await fetch(paperURL);
  const papers = await res.json();
  // TODO: ADD ASSIGNED PAPERS:
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
    console.log(evaluation)
    if(evaluation == -999 && reviewerIndex >= 0) { // Add papers with no eval (DEFAULT = -999)
      createCard(true , e);
    }
    else if(evaluation >= -2 && evaluation <= 2 && reviewerIndex >= 0){
      console.log(true)
      createCard(false, e, reviewerIndex);
    }

  });
  


});

var coll = document.getElementsByClassName("abstract-collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    console.log(true)
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("review-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}