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