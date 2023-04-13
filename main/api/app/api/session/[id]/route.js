import * as repo from "../repository.js"

export async function GET(request, {params}) {
    try {
        const{ id } = params;
        const session = await repo.readSession(id);
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
        const{ id } = params;
        const body = await request.json();

         if("date" in body && "location" in body && "title") {
            const session = await repo.updateSession(id, body);

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
        const{ id } = params;
        const session = await repo.deleteSession(id);

        if(session) {
            return  Response.json({message: "Deleted Session!"}, {status: 200});
        }

        return Response.json({error: "Session Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}