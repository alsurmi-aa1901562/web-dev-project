// Global Variables
const schedulesURL = "http://localhost:3000/api/schedule";

//Method that Creates Events Elements
async function createEvents(events, underSessions, scheduleIndex, sessionIndex, eventIndex) {
  const eventDiv = document.createElement("div");
  eventDiv.id = "event";
  eventDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
  eventDiv.setAttribute("sessionIndex", `${sessionIndex}`);
  eventDiv.setAttribute("eventIndex", `${eventIndex}`);

    const eventDivTitleParagraph = document.createElement("p");
    eventDivTitleParagraph.id = "event-title";
    eventDivTitleParagraph.setAttribute("scheduleIndex", `${scheduleIndex}`);
    eventDivTitleParagraph.setAttribute("sessionIndex", `${sessionIndex}`);
    eventDivTitleParagraph.setAttribute("eventIndex", `${eventIndex}`);
    eventDivTitleParagraph.innerHTML = `${events.title}`;

    const eventDivPresenterParagraph = document.createElement("p");
    eventDivPresenterParagraph.id = "event-presenter";
    eventDivPresenterParagraph.setAttribute("scheduleIndex", `${scheduleIndex}`);
    eventDivPresenterParagraph.setAttribute("sessionIndex", `${sessionIndex}`);
    eventDivPresenterParagraph.setAttribute("eventIndex", `${eventIndex}`);
    eventDivPresenterParagraph.innerHTML = `${events.presenter}`;

    const eventDivButtonsDiv = document.createElement("div");
    eventDivButtonsDiv.id = "event-buttons";
    eventDivButtonsDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
    eventDivButtonsDiv.setAttribute("sessionIndex", `${sessionIndex}`);
    eventDivButtonsDiv.setAttribute("eventIndex", `${eventIndex}`);

      const eventDivEditBtn = document.createElement("div");
      eventDivEditBtn.id = "edit-event-btn";
      eventDivEditBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
      eventDivEditBtn.setAttribute("sessionIndex", `${sessionIndex}`);
      eventDivEditBtn.setAttribute("eventIndex", `${eventIndex}`);

        const eventDivEditBtnIcon = document.createElement("i");
        eventDivEditBtnIcon.classList = "fa fa-edit";

      eventDivEditBtn.innerHTML = `${eventDivEditBtnIcon.outerHTML} Edit Event`;

      const eventDivDeleteBtn = document.createElement("div");
      eventDivDeleteBtn.id = "delete-event-btn";
      eventDivDeleteBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
      eventDivDeleteBtn.setAttribute("sessionIndex", `${sessionIndex}`);
      eventDivDeleteBtn.setAttribute("eventIndex", `${eventIndex}`);

        const eventDivDeleteBtnIcon = document.createElement("i");
        eventDivDeleteBtnIcon.classList = "fa fa-trash";

      eventDivDeleteBtn.innerHTML = `${eventDivDeleteBtnIcon.outerHTML} Delete Event`;

    eventDivButtonsDiv.appendChild(eventDivEditBtn);
    eventDivButtonsDiv.appendChild(eventDivDeleteBtn);

  eventDiv.appendChild(eventDivTitleParagraph);
  eventDiv.appendChild(eventDivPresenterParagraph);
  eventDiv.appendChild(eventDivButtonsDiv);

  underSessions.appendChild(eventDiv);
}

// Method that Creates Day Elements
async function createDay(session, underSchedule, scheduleIndex, sessionIndex) {
  const daySchedule = document.createElement("section");
  daySchedule.id = `day-schedule`;
  daySchedule.setAttribute("scheduleIndex", `${scheduleIndex}`);
  daySchedule.setAttribute("sessionIndex", `${sessionIndex}`);

    const openDateBtn = document.createElement("button");
    openDateBtn.classList = "accordion";
    openDateBtn.innerHTML = `${session.date}`;

    const sessionSection = document.createElement("section");
    sessionSection.id = `session-enclosure`;
    sessionSection.setAttribute("scheduleIndex", `${scheduleIndex}`);
    sessionSection.setAttribute("sessionIndex", `${sessionIndex}`)
    sessionSection.classList = "panel";

      const sessionHeading = document.createElement("div");
      sessionHeading.id = "session-heading";
      sessionHeading.setAttribute("scheduleIndex", `${scheduleIndex}`);
      sessionHeading.setAttribute("sessionIndex", `${sessionIndex}`)

        const sessionHeadingParagraph = document.createElement("p");
        sessionHeadingParagraph.innerHTML = "Sessions";

        const sessionHeadingBtn = document.createElement("button");
        sessionHeadingBtn.id = "add-session-btn";
        sessionHeadingBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
        sessionHeadingBtn.setAttribute("sessionIndex", `${sessionIndex}`)
        sessionHeadingBtn.setAttribute("aria-hidden", "true");

          const sessionHeadingBtnIcon = document.createElement("icon");
          sessionHeadingBtnIcon.classList = "fa fa-plus";
        
        sessionHeadingBtn.innerHTML =`${sessionHeadingBtnIcon.outerHTML} Add Session`;

      
      sessionHeading.appendChild(sessionHeadingParagraph);
      sessionHeading.appendChild(sessionHeadingBtn);

      // Event Listener to Open the Date
      openDateBtn.addEventListener("click", () => {
        if(openDateBtn.className.includes("active")){
          openDateBtn.classList = "accordion";
          sessionSection.style = "display: none;"
        }
        else{
          openDateBtn.classList = "accordion active";
          sessionSection.style = "display: block;"
        }
          
      });

      const sessionDiv = document.createElement("div");
      sessionDiv.id = "session";
      sessionDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
      sessionDiv.setAttribute("sessionIndex", `${sessionIndex}`);

        const sessionBtn = document.createElement("button");
        sessionBtn.classList = "accordion";
        sessionBtn.id = "session-title";
        sessionBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
        sessionBtn.setAttribute("sessionIndex", `${sessionIndex}`);
        sessionBtn.innerHTML = `${session.title}`;

        const sessionEventDiv = document.createElement("div");
        sessionEventDiv.id = "event-closure";
        sessionEventDiv.classList = "panel";
        sessionEventDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
        sessionEventDiv.setAttribute("sessionIndex", `${sessionIndex}`);

        // Event Listener to Open the Date
        sessionBtn.addEventListener("click", () => {
          if(sessionBtn.className.includes("active")){
            sessionBtn.classList = "accordion";
            sessionEventDiv.style = "display: none;"
          }
          else{
            sessionBtn.classList = "accordion active";
            sessionEventDiv.style = "display: block;"
          }
        });

          const eventHeadingDiv = document.createElement("div");
          eventHeadingDiv.id = "events-heading";
          eventHeadingDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
          eventHeadingDiv.setAttribute("sessionIndex", `${sessionIndex}`);

            const eventHeadingParagraph = document.createElement("p");
            eventHeadingParagraph.innerHTML = "Events";

            const eventHeadingSessionDiv = document.createElement("button");
            eventHeadingSessionDiv.id = "session-buttons";
            eventHeadingSessionDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
            eventHeadingSessionDiv.setAttribute("sessionIndex", `${sessionIndex}`);

              const eventHeadingSessionBtn = document.createElement("button");
              eventHeadingSessionBtn.id = "add-event-btn";
              eventHeadingSessionBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
              eventHeadingSessionBtn.setAttribute("sessionIndex", `${sessionIndex}`);
              eventHeadingSessionBtn.setAttribute("aria-hidden", "true");

                const eventHeadingSessionBtnIcon = document.createElement("icon");
                eventHeadingSessionBtnIcon.classList = "fa fa-plus";

              eventHeadingSessionBtn.innerHTML = `${eventHeadingSessionBtnIcon.outerHTML} Add Event`;
            
            eventHeadingSessionDiv.appendChild(eventHeadingSessionBtn);

          eventHeadingDiv.appendChild(eventHeadingParagraph);
          eventHeadingDiv.appendChild(eventHeadingSessionDiv);

          const allEventsDiv = document.createElement("div");
          allEventsDiv.id = "all-events";
          allEventsDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
          allEventsDiv.setAttribute("sessionIndex", `${sessionIndex}`);

            session.events.forEach((e, i) => {
              createEvents(e, allEventsDiv, scheduleIndex, sessionIndex, i);
            });
        
          const eventSessionBtnDiv = document.createElement("div");
          eventSessionBtnDiv.id = "session-btns";
          eventSessionBtnDiv.setAttribute("scheduleIndex", `${scheduleIndex}`);
          eventSessionBtnDiv.setAttribute("sessionIndex", `${sessionIndex}`);

            const eventSessionEditBtn = document.createElement("button");
            eventSessionEditBtn.id = "edit-session-btn";
            eventSessionEditBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
            eventSessionEditBtn.setAttribute("sessionIndex", `${sessionIndex}`);

              const eventSessionEditBtnIcon = document.createElement("icon");
              eventSessionEditBtnIcon.classList = "fa fa-edit";

            eventSessionEditBtn.innerHTML = `${eventSessionEditBtnIcon.outerHTML} Edit Session`;

            const eventSessionDeleteBtn = document.createElement("button");
            eventSessionDeleteBtn.id = "delete-session-btn";
            eventSessionDeleteBtn.setAttribute("scheduleIndex", `${scheduleIndex}`);
            eventSessionDeleteBtn.setAttribute("sessionIndex", `${sessionIndex}`);

              const eventSessionDeleteBtnIcon = document.createElement("icon");
              eventSessionDeleteBtnIcon.classList = "fa fa-trash";

            eventSessionDeleteBtn.innerHTML = `${eventSessionDeleteBtnIcon.outerHTML} Delete Session`;

          eventSessionBtnDiv.appendChild(eventSessionEditBtn);
          eventSessionBtnDiv.appendChild(eventSessionDeleteBtn);
          
        sessionEventDiv.appendChild(eventHeadingDiv);
        sessionEventDiv.appendChild(allEventsDiv);
        sessionEventDiv.appendChild(eventSessionBtnDiv);
          

      sessionDiv.appendChild(sessionBtn);
      sessionDiv.appendChild(sessionEventDiv);
      

      sessionSection.appendChild(sessionHeading);
      sessionSection.appendChild(sessionDiv);
  
  daySchedule.appendChild(openDateBtn);
  daySchedule.appendChild(sessionSection);

  underSchedule.appendChild(daySchedule);
  
}

// Method that Load Schedules and Creates Required Elements
async function loadSchedules(schedules) {
  const mainDiv = document.getElementById("scheduleList");

  schedules.forEach((e, schedulesIndex) => {
    const scheduleDate = document.createElement("h3");
    scheduleDate.id = "scheduleDateRange";
    scheduleDate.innerHTML = `Schedule: ${e.fromDate} - ${e.toDate}`;

    const daysList = document.createElement("div");
    daysList.id = "all-days";

      e.sessions.forEach((e, sessionsIndex) => {
        createDay(e, daysList,schedulesIndex, sessionsIndex);
      });

    mainDiv.appendChild(scheduleDate);
    mainDiv.appendChild(daysList);
    mainDiv
  });

  const addDateBtn = document.createElement("button");
  addDateBtn.id = "add-date-btn";
  
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-plus");

  addDateBtn.innerHTML = `${icon.outerHTML} Add New Date`
  
  mainDiv.appendChild(addDateBtn)
}


// Default DOM
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  const getLogInfo = JSON.parse(localStorage.getItem("logInfo"));
 
  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@organizer.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;


  //TODO: Validate if the Schedule exists.. if it does then show the days and if not show a button that asks to create a schedule
  const res = await fetch(schedulesURL);
  const schedules = await res.json();

  loadSchedules(schedules)
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

