import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const institutionsPath = path.join(process.cwd(), '/data/institutions.json')
const locatinspAth = path.join(process.cwd(), '/data/locations.json')
const usersPath = path.join(process.cwd(), '/data/users.json')


async function main() {
    try {
        const institutions = await fs.readJSON(institutionsPath)
        const locations = await fs.readJSON(locatinspAth)
        const users = await fs.readJSON(usersPath)

        for (const institution of institutions) await prisma.Institution.create({ data: institution })
        for (const location of locations) await prisma.Location.create({ data: location })
        for (const user of users) await prisma.User.create({ data: user })

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