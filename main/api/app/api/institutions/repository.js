import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/institutions.json";

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