import * as repo from "@/utilities/repository.js";

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

        if("sessions" in body && "fromDate" in body && "toDate" in body) {
            if(body.sessions == null) {
                body.sessions = undefined;
            }
            
            const schedule = await repo.createSchedule({
                sessions: body.sessions,
                fromDate: body.fromDate,
                toDate: body.toDate,
            });

            return Response.json(schedule, {status: 201});
            }
            
        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}