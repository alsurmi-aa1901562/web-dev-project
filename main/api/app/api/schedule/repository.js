import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/schedules.json";

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
