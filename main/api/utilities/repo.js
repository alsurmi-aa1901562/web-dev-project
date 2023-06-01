//------------------------------------------------------------------------------------------------------------//
// CONFERENCE CRUD
export async function createConferenceDate(conferenceDate) {
    const data = await fs.readFile(path);
    const conferenceDates = JSON.parse(data);

    conferenceDate = {
        id: nanoid(),
        ...conferenceDate,
        created: new Date()
    }

    conferenceDates.push(conferenceDate);

    // Sort the Store Based on Date
    conferenceDates.sort((firstElement, secondElement) => {
        const date = new Date(firstElement['date']);
        const date2 = new Date(secondElement['date']);
        return date-date2;
    });

    await fs.writeFile(path, JSON.stringify(conferenceDates));
    
    return conferenceDate;
}

export async function readConferenceDates() {
    const data = await fs.readFile(path);
    const conferenceDates = JSON.parse(data);
    return conferenceDates;
}

export async function deleteConferenceDate(id) {
    const data = await fs.readFile(path);
    const conferenceDates = JSON.parse(data);
    conferenceDates.forEach(async (e, i) =>{
        if(e.id === id) {
            const date = conferenceDates[i]
            conferenceDates.splice(i, 1);
            await fs.writeFile(path, JSON.stringify(conferenceDates));
            return date;
        }
    });

    return null;
}
//------------------------------------------------------------------------------------------------------------//
// INSTITUTIONS CRUD
export async function createInstitute(institution) {
    const data = await fs.readFile(path);
    const institutions = JSON.parse(data);

    institution = {
        id: nanoid(),
        ...institution,
        created: new Date()
    }

    institutions.push(institution);
    await fs.writeFile(path, JSON.stringify(institutions));
    
    return institution;
}

export async function readInstitutions() {
    const data = await fs.readFile(path);
    const institutions = JSON.parse(data);
    return institutions;
}
//------------------------------------------------------------------------------------------------------------//
// LOCATION CRUD
export async function createLocation(location) {
    const data = await fs.readFile(path);
    const locations = JSON.parse(data);

    location = {
        id: nanoid(),
        ...location,
        created: new Date()
    }

    locations.push(location);
    await fs.writeFile(path, JSON.stringify(locations));
    
    return location;
}

export async function readLocations() {
    const data = await fs.readFile(path);
    const locations = JSON.parse(data);
    return locations;
}
//------------------------------------------------------------------------------------------------------------//
// PAPER CRUD
export async function createPaper(paper) {
    const data = await fs.readFile(path);
    const papers = JSON.parse(data);

    paper.id = nanoid();

    paper = {
        ...paper,
        created: new Date()
    }

    papers.push(paper);
    await fs.writeFile(path, JSON.stringify(papers));
    
    return paper;
}

export async function readPapers() {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    return papers;
}

export async function readPaper(id) {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    return papers.find((p) => p.id === id);
}

export async function updatePaper(id, body) {
    const data = await fs.readFile(path);
    let papers = JSON.parse(data);

    let paper = papers.find((p) => p.id === id);

    if(paper) {
        paper.title = body.title;
        paper.abstract = body.abstract;
        paper.contributedAuthors = body.contributedAuthors;
        paper.paperPDFPath = body.paperPDFPath;
        paper.reviewers = body.reviewers;

        await fs.writeFile(path, JSON.stringify(papers));
        return paper;
    }

    return null;
}

export async function deletePaper(id) {
    const data = await fs.readFile(path);
    const papers = JSON.parse(data);

    const index = papers.findIndex((r) => r.id === id);

    if(index >= 0) {
        const paper = papers[index];
        papers.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(papers));
        return paper;
    }

    return null;
}

//------------------------------------------------------------------------------------------------------------//
// CRUD for Outer Scope Schedule
export async function createSchedule(schedule) {
    const data = await fs.readFile(path);
    const schedules = JSON.parse(data);

    schedule.id = nanoid();

    schedule = {
        ...schedule,
        created: new Date()
    }

    schedules.push(schedule);
    await fs.writeFile(path, JSON.stringify(schedules));
    
    return schedule;
}

export async function readSchedules() {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    return schedules;
}

export async function readSchedule(id) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    return schedules.find((p) => p.id === id);
}

export async function updateSchedule(id, body) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let schedule = schedules.find((p) => p.id === id);

    if(schedule) {
        schedule.date= body.date;
        schedule.sessions = body.sessions;

        await fs.writeFile(path, JSON.stringify(schedules));
        return schedule;
    }

    return null;
}

export async function deleteSchedule(id) {
    const data = await fs.readFile(path);
    const schedules = JSON.parse(data);

    const index = schedules.findIndex((r) => r.id === id);

    if(index >= 0) {
        const schedule = schedules[index];
        schedules.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(schedules));
        return schedule;
    }

    return null;
}

// CRUD for Outer Scope Sessions
export async function createSession(session, scheduleid) {
    const data = await fs.readFile(path);
    const schedules = JSON.parse(data);

    const scheduleIndex = schedules.findIndex((i) => i.id === scheduleid) 

    if(scheduleIndex >= 0) {
        session.id = nanoid();

        session = {
            ...session,
            created: new Date()
        }

        schedules[scheduleIndex].sessions.push(session);

        
        // Sort the Store Based on Date
        schedules[scheduleIndex].sessions.sort((firstElement, secondElement) => {
            const date = new Date(firstElement['date']);
            const date2 = new Date(secondElement['date']);
            return date-date2;
        });


        await fs.writeFile(path, JSON.stringify(schedules));
        return session;
    }

    return null;
}

export async function readSessions(scheduleid) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        return schedules[scheduleIndex].sessions
    }

    return null;
}

export async function readSession(scheduleid, sessionid) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            return schedules[scheduleIndex].sessions[sessionIndex];
        }
    }

    return null;
}

export async function updateSession(scheduleid, sessionid, body) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            const session = schedules[scheduleIndex].sessions[sessionIndex];

            session.events = body.events;
            session.location = body.location;
            session.title = body.title;

            schedules[scheduleIndex].sessions[sessionIndex] = session;
            await fs.writeFile(path, JSON.stringify(schedules));
            return session;
        }
    }

    return null;
}

export async function deleteSession(scheduleid, sessionid) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            const sessions = schedules[scheduleIndex].sessions;
            const session = schedules[scheduleIndex].sessions[sessionIndex];
            sessions.splice(sessionIndex, 1);

            await fs.writeFile(path, JSON.stringify(schedules));
            return session;
        }
    }

    return null;
}

// CRUD for Inner Scope Events
export async function createEvent(event, scheduleid, sessionid) {
    const data = await fs.readFile(path);
    const schedules = JSON.parse(data);

    const scheduleIndex = schedules.findIndex((i) => i.id === scheduleid) 

    if(scheduleIndex >= 0) {
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            
            event.id = nanoid();

            event = {
                ...event,
                created: new Date()
            }

            schedules[scheduleIndex].sessions[sessionIndex].events.push(event);
            
            // Sort the Store Based on Time
            schedules[scheduleIndex].sessions[sessionIndex].events.sort((firstElement, secondElement) => {
                const date = new Date(firstElement['endTime']);
                const date2 = new Date(secondElement['startTime']);
                return date-date2;
            });

            await fs.writeFile(path, JSON.stringify(schedules));
            return event;
        }
    }

    return null;
}

export async function readEvents(scheduleid, sessionid) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            return schedules[scheduleIndex].sessions[sessionIndex].events;
        }
    }

    return null;
}

export async function readEvent(scheduleid, sessionid, id) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
           let eventIndex = schedules[scheduleIndex].sessions[sessionIndex].events.findIndex((i) => i.id === id);

           if(eventIndex >= 0) {
            return schedules[scheduleIndex].sessions[sessionIndex].events[eventIndex];
           }
        }
    }

    return null;
}

export async function updateEvent(scheduleid, sessionid, id, body) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            let eventIndex = schedules[scheduleIndex].sessions[sessionIndex].events.findIndex((i) => i.id === id);

            if(eventIndex >= 0) {
                const event = schedules[scheduleIndex].sessions[sessionIndex].events[eventIndex];

                event.presenter = body.presenter;
                event.title = body.title;
                event.startTime = body.startTime;
                event.endTime = body.endTime;

                schedules[scheduleIndex].sessions[sessionIndex].events[eventIndex] = event;

                // Sort the Store Based on Time
                schedules[scheduleIndex].sessions[sessionIndex].events.sort((firstElement, secondElement) => {
                    const date = new Date(firstElement['endTime']);
                    const date2 = new Date(secondElement['startTime']);
                    return date-date2;
                });
                
                await fs.writeFile(path, JSON.stringify(schedules));
                return event;
            }
        }
    }

    return null;
}

export async function deleteEvent(scheduleid, sessionid, id) {
    const data = await fs.readFile(path);
    let schedules = JSON.parse(data);

    let scheduleIndex = schedules.findIndex((i) => i.id === scheduleid);

    if(scheduleIndex >= 0){
        let sessionIndex = schedules[scheduleIndex].sessions.findIndex((i) => i.id === sessionid);

        if(sessionIndex >= 0 ) {
            let eventIndex = schedules[scheduleIndex].sessions[sessionIndex].events.findIndex((i) => i.id === id);

            if(eventIndex >= 0) {
                const events = schedules[scheduleIndex].sessions[sessionIndex].events;
                const event = schedules[scheduleIndex].sessions[sessionIndex].events[eventIndex];

                events.splice(eventIndex, 1);

                await fs.writeFile(path, JSON.stringify(schedules));
                return event;
            }
        }
    }

    return null;
}
//------------------------------------------------------------------------------------------------------------//

// Users CRUD
export async function createUser(user) {
    const data = await fs.readFile(path);
    const users = JSON.parse(data);

    user.id = nanoid();

    user = {
        ...user,
        created: new Date()
    }

    users.push(user);
    await fs.writeFile(path, JSON.stringify(users));
    
    return user;
}

export async function readUsers(type) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    if(type === null || type === "null" || !type){
        return users;
    }
    
    users = users.filter((u) => u.role === type);
    return users;
}

export async function readUser(id) {
    const data = await fs.readFile(path);
    const users = JSON.parse(data);
    console.log(id);
    console.log(typeof id);

    return users.find((u) => u.id.toString() === id);
}

export async function updateUser(id, body) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    let user = users.find((u) => u.id.toString() === id);

    if(user) {
        user.fname = body.fname;
        user.lname = body.lname;
        user.email = body.email;
        user.password = body.password;
        user.role = body.role.toLowerCase();

        await fs.writeFile(path, JSON.stringify(users));
        return user;
    }

    return null;
}

export async function deleteUser(id) {
    const data = await fs.readFile(path);
    let users = JSON.parse(data);

    const index = users.findIndex((u) => u.id.toString() === id);

    if(index >= 0) {
        const user = users[index];
        users.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(users));
        return user;
    }
}

//------------------------------------------------------------------------------------------------------------//