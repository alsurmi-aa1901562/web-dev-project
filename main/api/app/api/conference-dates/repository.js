import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/conference-dates.json";

export async function createConferenceDate(conferenceDate) {
    const data = await fs.readFile(path);
    const conferenceDates = JSON.parse(data);

    conferenceDate = {
        id: nanoid(),
        ...conferenceDate,
        created: new Date()
    }

    conferenceDates.push(conferenceDate);
    await fs.writeFile(path, JSON.stringify(conferenceDates));
    
    return conferenceDate;
}

export async function readConferenceDates() {
    const data = await fs.readFile(path);
    const conferenceDates = JSON.parse(data);
    return conferenceDates;
}