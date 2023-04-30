// Global Variables
const schedulesURL = "http://localhost:3000/api/schedule";

// Default DOM
document.addEventListener("DOMContentLoaded", async () =>{
    const scheduleResponse = await fetch(schedulesURL);
    const schedules = await scheduleResponse.json();

    console.log(schedules)

    schedules.forEach((schedule) =>{
        schedule.sessions.forEach((session) => {
            const main = document.getElementById("mainDiv");

            const sessionDate = new Date(session.date);
            const div = document.createElement("div");
            div.className ="schedules-div";
            
            const daySelect = document.getElementById("day-selector");

            const option = document.createElement("option");
            option.innerHTML = `${sessionDate.getDate()}/${sessionDate.getMonth() + 1}/${sessionDate.getFullYear()}`;
            option.value = session.id;
            
            daySelect.appendChild(option);


            const section = document.createElement("section");
            // section.id = session.id;

                const header = document.createElement("h2");
                header.innerHTML = `${sessionDate.getDate()}/${sessionDate.getMonth() + 1}/${sessionDate.getFullYear()}`;
                header.id = session.id;

                const table = document.createElement("table");
                    const tableRowHeading = document.createElement("tr");
                        const tableRowTime = document.createElement("th");
                        tableRowTime.innerHTML = "Time";

                        const tableRowEvent = document.createElement("th");
                        tableRowEvent.innerHTML = "Event";

                    tableRowHeading.appendChild(tableRowTime);
                    tableRowHeading.appendChild(tableRowEvent);
                table.appendChild(tableRowHeading);

                    session.events.forEach((e) => {
                        const tableRow = document.createElement("tr");
                        const eventDate = new Date(e.startTime);

                        let hours = eventDate.getHours();
                        let mins = eventDate.getMinutes();

                            const tableTimeDiv = document.createElement("td");

                            if(mins >= 0 && mins <= 9) {
                                mins = `0${mins}`;
                            }
                            if(hours < 12){
                                tableTimeDiv.innerHTML = `${hours}:${mins} AM`;
                            }
                            else{
                                tableTimeDiv.innerHTML = `${hours-12}:${mins} PM`;
                            }
                        
                            const tableNameDiv = document.createElement("td");
                            tableNameDiv.innerHTML = `${e.title}`;

                        tableRow.appendChild(tableTimeDiv);
                        tableRow.appendChild(tableNameDiv);
                        table.appendChild(tableRow);
                    });
                    
                    
                

            section.appendChild(header);
            section.appendChild(table);

            div.appendChild(section)

            main.append(div)
        });
    });

    // Event Handler for Query Selector
    const daySelect = document.getElementById("day-selector");

    daySelect.addEventListener("change", () => {
        const element = document.getElementById(`${daySelect.value}`);
        element.scrollIntoView({
            block: "center",
            behavior: 'smooth'
        });
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