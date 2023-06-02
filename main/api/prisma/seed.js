import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const conferenceDatesPath = path.join(process.cwd(), 'data/conference-dates.json')
const institutionsPath = path.join(process.cwd(), 'data/institutions.json')
const locatinspAth = path.join(process.cwd(), 'data/locations.json')
const papersPath = path.join(process.cwd(), 'data/papers.json')
const schedulesPath = path.join(process.cwd(), 'data/schedules.json')
const usersPath = path.join(process.cwd(), 'data/users.json')


async function main() {
    try {
        const conferenceDates = await fs.readJSON(conferenceDatesPath)
        const institutions = await fs.readJSON(institutionsPath)
        const locations = await fs.readJSON(locatinspAth)
        const papers = await fs.readJSON(papersPath)
        const schedules = await fs.readJSON(schedulesPath)
        const users = await fs.readJSON(usersPath)

        for (const institution of institutions) await prisma.Institution.create({ data: institution })
        for (const location of locations) await prisma.Location.create({ data: location })
        for (const user of users) await prisma.User.create({ data: user })
        for (const conferenceDate of conferenceDates) await prisma.ConferenceDate.create({ data: conferenceDate })
        for (const paper of papers) await prisma.Paper.create({ data: paper })
        for (const schedule of schedules) await prisma.Schedule.create({ data: schedule })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1)
    })