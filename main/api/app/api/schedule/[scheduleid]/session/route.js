import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const { scheduleid } = params;
        const sessions = await repo.readSessions(scheduleid);
        return Response.json(sessions, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const {scheduleid} = params;
        const body = await request.json();

        if("id" in body && "title" in body && "location" in body && "events" in body && "date" in body) {
            const session = await repo.createSession({
                id: body.id,
                title: body.title,
                location: body.location,
                events: body.events,
                date: body.date
            }, scheduleid);
            return Response.json(session, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}
