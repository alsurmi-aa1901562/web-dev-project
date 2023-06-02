import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const{ scheduleid, sessionid, id } = params;
        const event = await repo.readEvent(scheduleid, sessionid, id);
        if (event) {
            return Response.json(event, {status: 200});
        }
        
        return Response.json({error: "Event Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ scheduleid, sessionid, id } = params;
        const body = await request.json();

         if("presenter" in body && "startTime" in body && "endTime" in body && "title") {
            const event = await repo.updateEvent(scheduleid, sessionid, id, body);

            if (event) {
                return Response.json(event, {status: 200});
            }

            return Response.json({error: "Event Not Found!"}, {status: 404}); 
        }
         
        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function DELETE(request, {params}) {
    try {
        const{ scheduleid, sessionid, id } = params;
        const event = await repo.deleteEvent(scheduleid, sessionid, id);

        if(event) {
            return  Response.json({message: "Deleted Event!"}, {status: 200});
        }

        return Response.json({error: "Event Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}