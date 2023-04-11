import * as repo from "../repository.js";

export async function GET(request, {params}) {
    try {
        const{ id } = params;

        const reviewer = await repo.readReviewer(id);
        if (reviewer) {
            return Response.json(reviewer, {status: 200});
        }
        
        return Response.json({error: "Reviewer Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ id } = params;
        const body = await request.json();

        if(typeof body.username === "string"  && typeof body.password === "string"){
            body.username = body.username.trim();
            body.password = body.password.trim();
        }
        else{
            return Response.json({error: "Invalid Parameters Posted (Username or Password is undefined or NOT a String Type)"}, {status: 400}); 
        }

        if(("name" in body && "username" in body && "password" in body) && (body.username && body.password) && (body.username != "null" && body.password != "null")) {
            const reviewer = await repo.updateReviewer(id, body);

            if (reviewer) {
                return Response.json(reviewer, {status: 200});
            }

            return Response.json({error: "Reviewer Not Found!"}, {status: 404}); 
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
        const reviewer = await repo.deleteReviewer(id);

        if(reviewer) {
            return  Response.json({message: "Deleted Reviewer!"}, {status: 200});
        }

        return Response.json({error: "Reviewer Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}