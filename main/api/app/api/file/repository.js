import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export async function getFile(fileName) {
    return await fs.readFile(`data/pdfs/${fileName}`);
}

export async function saveFile(name, buffer) {
    await fs.writeFile(`data/pdfs/${name}`, Buffer.from(buffer));
    return true;
}