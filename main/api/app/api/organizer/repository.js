import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/organizers.json";

export async function createOrganizer(organizer) {
    const data = await fs.readFile(path);
    const organizers = JSON.parse(data);

    organizer.id = nanoid();

    organizer = {
        ...organizer,
        created: new Date()
    }

    organizers.push(organizer);
    await fs.writeFile(path, JSON.stringify(organizers));
    
    return organizer;
}

export async function readOrganizers() {
    const data = await fs.readFile(path);
    let organizers = JSON.parse(data);

    return organizers;
}

export async function readOrganizer(id) {
    const data = await fs.readFile(path);
    let organizers = JSON.parse(data);

    return organizers.find((o) => o.id === id);
}

export async function updateOrganizer(id, body) {
    const data = await fs.readFile(path);
    let organizers = JSON.parse(data);

    let organizer = organizers.find((o) => o.id === id);

    if(organizer) {
        organizer.name = body.name;
        organizer.username = body.username;
        organizer.password = body.password;

        await fs.writeFile(path, JSON.stringify(organizers));
        return organizer;
    }

    return null;
}

export async function deleteOrganizer(id) {
    const data = await fs.readFile(path);
    const organizers = JSON.parse(data);

    const index = organizers.findIndex((o) => o.id === id);

    if(index >= 0) {
        const organizer = organizers[index];
        organizers.splice(index, 1);

        await fs.writeFile(path, JSON.stringify(organizers));
        return organizer;
    }

    return null;
}