import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const{ scheduleid } = params;
        const schedule = await repo.readSchedule(scheduleid);
        if (schedule) {
            return Response.json(schedule, {status: 200});
        }
        
        return Response.json({error: "Schedule Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ scheduleid } = params;
        const body = await request.json();

        if("toDate" in body &&"fromDate" in body && "sessions" in body) {
            if(body.sessions == null) {
                body.sessions = undefined;
            }
            
            const schedule = await repo.updateSchedule(scheduleid, body);

            if (schedule) {
            return Response.json(schedule, {status: 200});
            }
        
            return Response.json({error: "Schedule Not Found!"}, {status: 404}); 
        }
         
        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function DELETE(request, {params}) {
    try {
        const{ scheduleid } = params;
        const schedule = await repo.deleteSchedule(scheduleid);

        if(schedule) {
            return  Response.json({message: "Deleted Schedule!"}, {status: 200});
        }

        return Response.json({error: "Schedule Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}