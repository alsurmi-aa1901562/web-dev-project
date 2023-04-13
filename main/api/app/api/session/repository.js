import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/sessions.json";

export async function createSession(session) {
    const data = await fs.readFile(path);
    const sessions = JSON.parse(data);

    session.id = nanoid();

    session = {
        ...session,
        created: new Date()
    }

    sessions.push(session);

    await fs.writeFile(path, JSON.stringify(sessions));
    return session;
}

export async function readSessions() {
    const data = await fs.readFile(path);
    let sessions = JSON.parse(data);

    return sessions;
}

export async function readSession(id) {
    const data = await fs.readFile(path);
    const sessions = JSON.parse(data);
    console.log(id);
    console.log(typeof id);

    return sessions.find((u) => u.id.toString() === id);
}

export async function updateSession(id, body) {
    const data = await fs.readFile(path);
    let sessions = JSON.parse(data);

    let session = sessions.find((u) => u.id.toString() === id);

    if(session) {
        session.date = body.date;
        session.location = body.location;
        session.title = body.title;

        await fs.writeFile(path, JSON.stringify(sessions));
        return session;
    }

    return null;
}

export async function deleteSession(id) {
    const data = await fs.readFile(path);
    let sessions = JSON.parse(data);

    const index = sessions.findIndex((u) => u.id.toString() === id);

    if(index >= 0) {
        const session = sessions[index];
        sessions.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(sessions));
        return session;
    }
}

