import * as repo from "./repository.js";

export async function GET(request, {params}) {
    try {
        const reviewer = await repo.readReviewers();
        return Response.json(reviewer, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();

        if(typeof body.username === "string"  && typeof body.password === "string"){
            body.username = body.username.trim();
            body.password = body.password.trim();
        }
        else{
            return Response.json({error: "Invalid Parameters Posted (Username or Password is undefined or NOT a String Type)"}, {status: 400}); 
        }

        if(("id" in body && "name" in body && "username" in body && "password" in body) && (body.username && body.password) && (body.username != "null" && body.password != "null")) {
            const reviewer = await repo.createReviewer({
                id: body.id,
                name: body.name,
                username: body.username,
                password: body.password
            });

            return Response.json(reviewer, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}