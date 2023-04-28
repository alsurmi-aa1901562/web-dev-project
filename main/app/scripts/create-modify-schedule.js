async function createDays() {
  
}

// Default DOM
document.addEventListener("DOMContentLoaded", async () => {
  //TODO: Validate if the Schedule exists.. if it does then show the days and if not show a button that asks to create a schedule
});

//============================accordion setup======================
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
//===================================================


//===============Modals==============
// Get the modals
var modal = document.getElementById("new-date-Modal");
var modal1 = document.getElementById("new-session-modal");
var modal2 = document.getElementById("add-event-modal");
var modal3 = document.getElementById("edit-event-Modal");
var modal4 = document.getElementById("edit-session-modal");

// Get the buttons that open the modals
var btn  = document.getElementById("add-date-btn");
var btn1 = document.getElementById("add-session-btn");
var btn2 = document.getElementById("add-event-btn");
var btn3 = document.getElementById("edit-event-btn");
var btn4 = document.getElementById("edit-session-btn");

// Get the <span> elements that close the modals
var span = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}
btn3.onclick = function() {
  modal3.style.display = "block";
}
btn4.onclick = function() {
  modal4.style.display = "block";
}

// When the user clicks on x, close the modal
for (var i = 0; i < span.length; i++) {
  span[i].onclick = function() {
    var modalToClose = this.parentNode.parentNode;
    modalToClose.style.display = "none";
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal1) {
    modal1.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  } else if (event.target == modal3) {
    modal3.style.display = "none";
  } else if (event.target == modal4) {
    modal4.style.display = "none";
  }
}
//===================================================

