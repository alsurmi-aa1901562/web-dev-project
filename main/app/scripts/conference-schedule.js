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
            
            const daySelect = document.getElementById("daySelect");

            const option = document.createElement("option");
            option.innerHTML = `${sessionDate.getDate()}/${sessionDate.getMonth() + 1}/${sessionDate.getFullYear()}`;
            option.id = session.id;
            
            daySelect.appendChild(option);

            daySelect.addEventListener("selectstart", () => {
                document.addEventListener("selectionchange", ()=>{
                    console.log(true)
                })
            });


            const section = document.createElement("section");
            section.id = session.id;

                const header = document.createElement("h2");
                header.innerHTML = `${sessionDate.getDate()}/${sessionDate.getMonth() + 1}/${sessionDate.getFullYear()}`;

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

                            const tableTimeDiv = document.createElement("td");
                            tableTimeDiv.innerHTML = `${eventDate.getUTCHours()}:${eventDate.getUTCMinutes()}`;

                        tableRow.appendChild(tableTimeDiv);
                        table.appendChild(tableRow);
                    });
                    
                    
                

            section.appendChild(header);
            section.appendChild(table);

            main.append(section)
        });
    });
});