import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const{ scheduleid, sessionid } = params;
        const session = await repo.readSession(scheduleid, sessionid);
        if (session) {
            return Response.json(session, {status: 200});
        }
        
        return Response.json({error: "Session Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ scheduleid, sessionid } = params;
        const body = await request.json();

         if("events" in body && "location" in body && "title" in body && "date" in body) {
            if(body.events == null) {
                body.events = undefined;
            }
            const session = await repo.updateSession(scheduleid, sessionid, body);

            if (session) {
                return Response.json(session, {status: 200});
            }

            return Response.json({error: "Session Not Found!"}, {status: 404}); 
        }
         
        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function DELETE(request, {params}) {
    try {
        const{ scheduleid, sessionid } = params;
        const session = await repo.deleteSession(scheduleid, sessionid);

        if(session) {
            return  Response.json({message: "Deleted Session!"}, {status: 200});
        }

        return Response.json({error: "Session Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}