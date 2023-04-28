import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/schedules.json";

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