import * as repo from "./repository.js";

export async function GET(request, {params}) {
    try {
        const sessions = await repo.readSessions();
        return Response.json(sessions, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();

        if("id" in body && "date" in body && "location" in body && "title") {
            const session = await repo.createSession({
                id: body.id,
                date: body.date,
                location: body.location,
                title: body.title
            });

            return Response.json(session, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}
