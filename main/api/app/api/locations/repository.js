import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/locations.json";

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