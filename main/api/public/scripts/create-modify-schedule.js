// Global Variables
const schedulesURL = "http://localhost:3000/api/schedule";
const conferenceDate = "http://localhost:3000/api/conference-dates";
const locationsURL = "http://localhost:3000/api/locations";
const papersURL = "http://localhost:3000/api/paper";

//Method that Creates Events Elements
async function createEvents(selectedEvent, scheduleID, session, underSessions) {
  const eventDiv = document.createElement("div");
  eventDiv.id = "event";

    const eventDivTitleParagraph = document.createElement("p");
    eventDivTitleParagraph.id = "event-title";
    eventDivTitleParagraph.innerHTML = `${selectedEvent.title}`;

    const eventDivPresenterParagraph = document.createElement("p");
    eventDivPresenterParagraph.id = "event-presenter";
    eventDivPresenterParagraph.innerHTML = `${selectedEvent.presenter}`;

    const eventDivButtonsDiv = document.createElement("div");
    eventDivButtonsDiv.id = "event-buttons";

      const eventDivEditBtn = document.createElement("button");
      eventDivEditBtn.id = "edit-event-btn";

        const eventDivEditBtnIcon = document.createElement("i");
        eventDivEditBtnIcon.classList = "fa fa-edit";

      eventDivEditBtn.innerHTML = `${eventDivEditBtnIcon.outerHTML} Edit Event`;


      eventDivEditBtn.addEventListener("click", () => {
        const editEventModal = document.getElementById("edit-event-Modal");
        editEventModal.style.display = "block";

        const eventTitle = document.getElementById("edit-event-title");
        const eventTitleLabel = document.getElementById("edit-event-title-label");
        
        if(selectedEvent.presenter !== ""){
          eventTitle.hidden = true;
          eventTitleLabel.hidden = true;
        }
        else{
          eventTitle.hidden = false;
          eventTitleLabel.hidden = false;
          eventTitle.value = selectedEvent.title;
        }
  
        const editEventClose = document.getElementById("add-event-close-modal");
        // Event Listener For Modal Close
        editEventClose.addEventListener("click", () => {
          editEventModal.style.display = "none";
        });

        // Remove modal on outside click
        editEventModal.addEventListener("click", async (e)=>{
          if(e.target == editEventModal) {
            editEventModal.style.display = "none";
          }
        });
        
        const fromTime = document.getElementById("edit-event-from-time");
        const toTime = document.getElementById("edit-event-to-time");

        const startTime = new Date(selectedEvent.startTime);
        const endTime = new Date(selectedEvent.endTime);

        let fromTimeHours = startTime.getHours();
        let fromTimeMinutes = startTime.getMinutes();
        let toTimeHours = endTime.getHours();
        let toTimeMinutes = endTime.getMinutes();

        if(fromTimeHours >= 0 && fromTimeHours <= 9){
          fromTimeHours = `0${fromTimeHours}`;
        }
        
        if(fromTimeMinutes >= 0 && fromTimeMinutes <= 9){
          fromTimeMinutes = `0${fromTimeMinutes}`;
        }

        if(toTimeHours >= 0 && toTimeHours <= 9){
          toTimeHours = `0${toTimeHours}`;
        }
        
        if(toTimeMinutes >= 0 && toTimeMinutes <= 9){
          toTimeMinutes = `0${toTimeMinutes}`;
        }

        // Setting Time Input to Time of Event
        fromTime.value = `${fromTimeHours}:${fromTimeMinutes}`;
        toTime.value = `${toTimeHours}:${toTimeMinutes}`;

        
        // Event Handler for Submission of Edit Event
        const editEventForm = document.getElementById("edit-event-form");
        editEventForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          startTime.setHours(fromTime.value.substring(0, fromTime.value.indexOf(":")));
          startTime.setMinutes(fromTime.value.slice(fromTime.value.indexOf(":") + 1));

          endTime.setHours(toTime.value.substring(0, toTime.value.indexOf(":")));
          endTime.setMinutes(toTime.value.slice(toTime.value.indexOf(":") + 1));
          if(selectedEvent.presenter == "") {
            selectedEvent.title = eventTitle.value;
          }

          const editSessionResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}/events/${selectedEvent.id}`,{
            method: "PUT",
            body: JSON.stringify({
              "title":`${selectedEvent.title}`,
              "presenter":`${selectedEvent.presenter}`,
              "startTime":`${startTime.toISOString()}`,
              "endTime":`${endTime.toISOString()}`
              })
            });

            if(editSessionResponse) {
              location.reload();
            }
        });
        
      });

      const eventDivDeleteBtn = document.createElement("button");
      eventDivDeleteBtn.id = "delete-event-btn";

        const eventDivDeleteBtnIcon = document.createElement("i");
        eventDivDeleteBtnIcon.classList = "fa fa-trash";

      eventDivDeleteBtn.innerHTML = `${eventDivDeleteBtnIcon.outerHTML} Delete Event`;

      eventDivDeleteBtn.addEventListener("click", async () => {
        const deleteSessionResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}/events/${selectedEvent.id}`, {
          method: "DELETE"
        });
        location.reload();
      });

    eventDivButtonsDiv.appendChild(eventDivEditBtn);
    eventDivButtonsDiv.appendChild(eventDivDeleteBtn);

  eventDiv.appendChild(eventDivTitleParagraph);
  eventDiv.appendChild(eventDivPresenterParagraph);
  eventDiv.appendChild(eventDivButtonsDiv);

  underSessions.appendChild(eventDiv);
}

// Method that Creates Day Elements
async function createDay(session, scheduleID, underSchedule) {
  const daySchedule = document.createElement("section");
  daySchedule.id = `day-schedule`;

    const openDateBtn = document.createElement("button");
    openDateBtn.classList = "accordion";
    const openDate = new Date(session.date);
    openDateBtn.innerHTML = `${openDate.getDate()}/${openDate.getMonth() + 1}/${openDate.getFullYear()}`;

    const sessionSection = document.createElement("section");
    sessionSection.id = `session-enclosure`;
    sessionSection.classList = "panel";

      const sessionHeading = document.createElement("div");
      sessionHeading.id = "session-heading";

        const sessionHeadingParagraph = document.createElement("p");
        sessionHeadingParagraph.innerHTML = "Sessions";
      
      sessionHeading.appendChild(sessionHeadingParagraph);

      // Event Listener to Open the Date
      openDateBtn.addEventListener("click", () => {
        if(openDateBtn.className.includes("active")){
          openDateBtn.classList = "accordion";
          sessionSection.style.display = "none";
        }
        else{
          openDateBtn.classList = "accordion active";
          sessionSection.style.display = "block";
        }
          
      });

      const sessionDiv = document.createElement("div");
      sessionDiv.id = "session";

        const sessionBtn = document.createElement("button");
        sessionBtn.classList = "accordion";
        sessionBtn.id = "session-title";
        sessionBtn.innerHTML = `${session.title}`;

        const sessionEventDiv = document.createElement("div");
        sessionEventDiv.id = "event-enclosure";
        sessionEventDiv.classList = "panel";

        // Event Listener to Open the Date
        sessionBtn.addEventListener("click", () => {
          if(sessionBtn.className.includes("active")){
            sessionBtn.classList = "accordion";
            sessionEventDiv.style.display = "none";
          }
          else{
            sessionBtn.classList = "accordion active";
            sessionEventDiv.style.display = "block";
          }
        });

          const eventHeadingDiv = document.createElement("div");
          eventHeadingDiv.id = "events-heading";

            const eventHeadingParagraph = document.createElement("p");
            eventHeadingParagraph.innerHTML = "Events";

            const eventHeadingSessionDiv = document.createElement("div");
            eventHeadingSessionDiv.id = "session-buttons";

              const eventHeadingSessionBtn = document.createElement("button");
              eventHeadingSessionBtn.id = "add-event-btn";
              eventHeadingSessionBtn.setAttribute("aria-hidden", "true");

                const eventHeadingSessionBtnIcon = document.createElement("icon");
                eventHeadingSessionBtnIcon.classList = "fa fa-plus";

              eventHeadingSessionBtn.innerHTML = `${eventHeadingSessionBtnIcon.outerHTML} Add Event`;

              eventHeadingSessionBtn.addEventListener("click", async () => {
                const addEventModal = document.getElementById("add-event-modal");
                addEventModal.style.display = "block";

                const selectionPaperRadio = document.getElementById("paper-add-event");
                const selectionNormalRadio = document.getElementById("normal-add-event");

                selectionNormalRadio.checked = true;

                // Event Listener For Modal Close
                const addEventClose = document.getElementById("add-event-session-modal");
                addEventClose.addEventListener("click", () => {
                  addEventModal.style.display = "none";
                });

                // Remove modal on outside click
                addEventModal.addEventListener("click", (e)=>{
                  if(e.target == addEventModal) {
                    addEventModal.style.display = "none";
                  }
                });

                const approvedPaper = document.getElementById("select-approved-paper");
                const titleOfEvent = document.getElementById("title-of-event");
                const approvedPaperLabel = document.getElementById("approved-paper-label")
                const titleLabel = document.getElementById("title-of-event-label");

                const fromTime = document.getElementById("event-from-time");
                const toTime = document.getElementById("event-to-time");

                approvedPaper.hidden = true;
                approvedPaperLabel.hidden = true;
                approvedPaper.required = false;
                titleOfEvent.required = true;

                let paperOption = [];
                
                // Form Event Handler
                const addEventBtn = document.getElementById("new-event-form");
                addEventBtn.addEventListener("submit", async () =>{
                  let presenter = "";

                  //Grab Presentor
                  if(selectionPaperRadio.checked){
                    paperOption[approvedPaper.selectedIndex].authors.forEach((e) => {
                      if(e.isPresentor){
                        presenter = `${e.fname}, ${e.lname}`;
                      }
                    });
                  }

                  const startTime = new Date(session.date);
                  startTime.setHours(fromTime.value.substring(0, fromTime.value.indexOf(":")));
                  startTime.setMinutes(fromTime.value.slice(fromTime.value.indexOf(":") + 1));

                  const endTime = new Date(session.date);
                  endTime.setHours(toTime.value.substring(0, toTime.value.indexOf(":")));
                  endTime.setMinutes(toTime.value.slice(toTime.value.indexOf(":") + 1));

                  if(selectionPaperRadio.checked){
                    const addEventResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}/events`, {
                      method: "POST",
                      body: JSON.stringify({
                        "id":"0",
                        "title":`${paperOption[approvedPaper.selectedIndex].title}`,
                        "presenter":`${presenter}`,
                        "startTime":`${startTime}`,
                        "endTime":`${endTime}`
                      })
                    });
                  }
                  else if(selectionNormalRadio.checked){
                    if(titleOfEvent.value !== ""){
                      const addEventResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}/events`, {
                        method: "POST",
                        body: JSON.stringify({
                          "id":"0",
                          "title":`${titleOfEvent.value}`,
                          "presenter":`${presenter}`,
                          "startTime":`${startTime.toISOString()}`,
                          "endTime":`${endTime.toISOString()}`
                        })
                      });
                    }
                  }
                });

                // Event Listener to Check for Which Event
                selectionNormalRadio.addEventListener("click", () => {
                  approvedPaper.hidden = true;
                  approvedPaper.required = false;
                  approvedPaperLabel.hidden = true;

                  titleOfEvent.hidden = false;
                  titleOfEvent.required = true;
                  titleLabel.hidden = false;
                });

                selectionPaperRadio.addEventListener("click", async () => {
                  approvedPaper.hidden = false;
                  approvedPaper.required = true;
                  approvedPaperLabel.hidden = false;

                  titleOfEvent.hidden = true;
                  titleOfEvent.required = false;
                  titleLabel.hidden = true;

                  // Grab Approved Papers
                  const paperResponse = await fetch(papersURL);
                  const papers = await paperResponse.json();

                  const eventResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}/events`);
                  const eventsToCheck = await eventResponse.json();

                  if(approvedPaper.childElementCount == 0) {
                    papers.forEach((e) =>{
                      const evaluation = (parseInt(e.reviewers[0].evaluation) + parseInt(e.reviewers[0].evaluation)) / 2
                      if( evaluation == 2) {
                        if(eventsToCheck.length == 0){
                          paperOption.push(e);
                        }
                        else{
                          eventsToCheck.forEach((a) => {
                            if(a.title === e.title){
                              paperOption.push(e);
                            }
                          });
                        }
                      }
                    });
  
                    paperOption.forEach((e, i) => {
                      const option = document.createElement("option");
                      option.innerHTML = `${e.title}`;
                      option.id = i;
  
                      approvedPaper.appendChild(option);
                    });
                  }

                  
                });
              });
            
            eventHeadingSessionDiv.appendChild(eventHeadingSessionBtn);

          eventHeadingDiv.appendChild(eventHeadingParagraph);
          eventHeadingDiv.appendChild(eventHeadingSessionDiv);

          const allEventsDiv = document.createElement("div");
          allEventsDiv.id = "all-events";

          if(session.events !== null && session.events !== undefined){
            session.events.forEach((e, i) => {
              createEvents(e, scheduleID, session, allEventsDiv);
            });
          }
            
          const eventSessionBtnDiv = document.createElement("div");
          eventSessionBtnDiv.id = "session-btns";

            const eventSessionEditBtn = document.createElement("button");
            eventSessionEditBtn.id = "edit-session-btn";

              const eventSessionEditBtnIcon = document.createElement("icon");
              eventSessionEditBtnIcon.classList = "fa fa-edit";

            eventSessionEditBtn.innerHTML = `${eventSessionEditBtnIcon.outerHTML} Edit Session`;

            // Event Handler on Edit Session
            eventSessionEditBtn.addEventListener("click", async () => {
              const editSessionModal = document.getElementById("edit-session-modal");
              editSessionModal.style.display = "block";

              const editSessionTitle = document.getElementById("edit-modal-session-title");
              editSessionTitle.value = `${session.title}`;

              const locationsResponse = await fetch(locationsURL);
              const locations = await locationsResponse.json();

              const editSessionLocation = document.getElementById("select-location-edit-session");

              locations.forEach((e) => {
                const option = document.createElement("option");
                option.innerHTML = `${e.name}`;

                editSessionLocation.appendChild(option);
              });

              editSessionLocation.value = session.location;
              
              // Event Listener For Modal Close
              const editSessionClose = document.getElementById("close-edit-session-modal");
              editSessionClose.addEventListener("click", () => {
                editSessionModal.style.display = "none";
              });

              // Remove modal on outside click
              editSessionModal.addEventListener("click", (e)=>{
                if(e.target == editSessionModal) {
                  editSessionModal.style.display = "none";
                }
              });

              // Handle Update of Session
              editSessionModal.addEventListener("submit", async (e) => {
                
                const editSessionResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}`,{
                  method: "PUT",
                  body: JSON.stringify({
                    "title":`${editSessionTitle.value}`,
                    "location":`${editSessionLocation.value}`
                    })
                  })
                })
            });

            const eventSessionDeleteBtn = document.createElement("button");
            eventSessionDeleteBtn.id = "delete-session-btn";

              const eventSessionDeleteBtnIcon = document.createElement("icon");
              eventSessionDeleteBtnIcon.classList = "fa fa-trash";

            eventSessionDeleteBtn.innerHTML = `${eventSessionDeleteBtnIcon.outerHTML} Delete Session`;

            // Event Handler for Deletion of Event
            eventSessionDeleteBtn.addEventListener("click", async (e) => {
              // Add Back the Date in Conference Dates
              const postDateResponse = await fetch(conferenceDate, {
                method: "POST",
                body: JSON.stringify({
                  "date": session.date
                })
              });

              // Delete the Session
              const deleteSessionResponse = await fetch(schedulesURL+`/${scheduleID}/session/${session.id}`, {
                method: "DELETE"
              });
              location.reload();
            });

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

  schedules.forEach((e) => {
    const scheduleDate = document.createElement("p");
    scheduleDate.id = "schedule-heading";
    const fromDate = new Date(e.fromDate);
    const toDate = new Date(e.toDate);
    scheduleDate.innerHTML = `Schedule: ${fromDate.getUTCDate()}/${fromDate.getUTCMonth() + 1}/${fromDate.getUTCFullYear()} - ${toDate.getUTCDate()}/${toDate.getUTCMonth() + 1}/${toDate.getUTCFullYear()}`;

    const daysList = document.createElement("div");
    daysList.id = "all-days";

      e.sessions.forEach((entity) => {
        createDay(entity, e.id, daysList);
      });

    mainDiv.appendChild(scheduleDate);
    mainDiv.appendChild(daysList);
    mainDiv
  });

  const response = await fetch(conferenceDate);
  const conferences = await response.json();

  // Validate if there are dates left to add.
  if(conferences.length > 0){
    const addDateBtn = document.createElement("button");
    addDateBtn.id = "add-session-btn";
  
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-plus");

    addDateBtn.innerHTML = `${icon.outerHTML} Add Session`

    // Event Handler Adding Date
    addDateBtn.addEventListener("click", async () => {
      const addModal = document.getElementById("new-session-modal");
      addModal.style.display = "block";

      // Remove modal on outside click
      addModal.addEventListener("click", (e)=>{
        if(e.target == addModal) {
          addModal.style.display = "none";
        }
      });
      
      // Create Date Options
      const dateSelection = document.getElementById("select-date");
      if(dateSelection.length == 0){
        conferences.forEach((e, i)=>{
          const option = document.createElement("option");
          const date = new Date(e.date);
          option.innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          option.id = i;
  
          dateSelection.appendChild(option);
        });
      }
      
      // Create Location Options
      const locationsResponse = await fetch(locationsURL);
      const locations = await locationsResponse.json();

      const locationsSelect = document.getElementById("select-location-session");
      if(locationsSelect.length == 0){
        locations.forEach((e) => {
          const option = document.createElement("option");
          option.innerHTML = `${e.name}`;
  
          locationsSelect.appendChild(option);
        });
      }
      
      // Submit The New Day Event
      const addModalForm = document.getElementById("new-session-form")
      addModalForm.addEventListener("submit", async (e)=> {
        e.preventDefault();
        const sessionTitle = document.getElementById("add-session-title");
        // Delete Date from Conference Dates
        const deleteResponse = await fetch(conferenceDate+`/${conferences[dateSelection.selectedIndex].id}`, {
          method: "DELETE"
        });

        // Post New Session
        const sessionResponse = await fetch(schedulesURL+`/${schedules[0].id}/session`, {
          method: "POST",
          body: JSON.stringify({
              "title": `${sessionTitle.value}`,
              "location": `${locationsSelect.value}`,
              "date": `${conferences[dateSelection.selectedIndex].date}`,
              "events":null
          })
        });
        location.reload();
      });

      // Close Modal Event Listener
      const closeAddSessionModal = document.getElementById("close-new-session-modal");
      closeAddSessionModal.addEventListener("click", () => {
        addModal.style.display = "none";
      });
    });

    mainDiv.appendChild(addDateBtn)
  }
}

// Method that Load Schedules and Creates Required Elements
async function loadCreateSchedule() {
  const mainDiv = document.getElementById("scheduleList");

  const p = document.createElement("p");
  p.id = "schedule-heading";
  p.innerHTML = "No Shedules Exist!"

  const button = document.createElement("button");
  button.id = "create-schedule-button";

    const buttonIcon = document.createElement("icon");
    buttonIcon.classList = "fa fa-plus";
    
  button.innerHTML =`${buttonIcon.outerHTML} Add Schedule`;

  // Event Handler to Open Modal
  button.addEventListener("click", async ()=> {
    const createScheduleModal = document.getElementById("new-Schedule-modal");
    createScheduleModal.style.display = "block";

    createScheduleModal.addEventListener("click", (e)=>{
      if(e.target == createScheduleModal) {
        createScheduleModal.style.display = "none";
      }
    });

    // Submit Button Event Listener
   createScheduleModal.addEventListener("submit", async (e) => {
      e.preventDefault();
      const startDate = new Date(document.getElementById("startDate-schedule").value);
      const endDate = new Date(document.getElementById("endDate-schedule").value);
      

      let date = new Date(startDate);
      
      while(date <= endDate) {
        const response = await fetch(conferenceDate, {
          method: "POST",
          body: JSON.stringify({
            "date": `${date.toISOString()}`
          })
        });
        date.setDate(date.getDate() + 1);
      }

      const response = await fetch(schedulesURL, {
        method: "POST",
        body: JSON.stringify({
          "fromDate": `${startDate.toISOString()}`,
          "toDate":`${endDate.toISOString()}`,
          "sessions":null
        })
      })
      location.reload()
    });

    // Close Modal Event Listener
    const closeScheduleModal = document.getElementById("close-new-schedule-modal");
    closeScheduleModal.addEventListener("click", () => {
      createScheduleModal.style.display = "none";
    });
  });
  
  mainDiv.appendChild(p);
  mainDiv.appendChild(button);
}


// Default DOM
document.addEventListener("DOMContentLoaded", async () => {
  // Grabbing Saves From Login
  let getLogInfo = JSON.parse(localStorage.getItem("logInfo"));

  // Redirect if no cache is available or wrong user is logged
  if(getLogInfo == null) {
    window.location.href = "../login.html";
  }

  if(!getLogInfo.username.includes("@organizer.com")) {
    window.location.href = "../login.html";
  }

  // Clear Logged in Cache on logout 
  document.getElementById("logout").addEventListener("click", ()=>{
    localStorage.clear();
  });
 

  document.getElementById("Nav-userName").innerHTML = `Username: ${getLogInfo.username.replace("@organizer.com", "")}`
  document.getElementById("Nav-Id").innerHTML = `ID: ${getLogInfo.identity}`;

  const res = await fetch(schedulesURL);
  const schedules = await res.json();

  if(schedules.length > 0) {
    loadSchedules(schedules);
  }
  else{
    loadCreateSchedule();
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

const deleteButton = document.getElementById("logout");
deleteButton.addEventListener("click", function() {
  window.location.href = "/";
});
