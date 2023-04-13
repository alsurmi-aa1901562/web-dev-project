import * as repo from "./repository.js";

export async function GET(request, {params}) {
    try {
        const schedules = await repo.readSchedules();
        return Response.json(schedules, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();

        if("id" in body && "date" in body && "sessions" in body) {
            if(Array.isArray(body.sessions)){
                const schedule = await repo.createSchedule({
                    id: body.id,
                    date: body.date,
                    sessions: body.sessions
                });

                return Response.json(schedule, {status: 201});
            }
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}