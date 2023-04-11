import * as repo from "./repository.js";

export async function GET(request, {params}) {
    try {
        const type = new URL(request.url).searchParams.get("type")?.toLowerCase();

        const authors = await repo.readAuthors(type);
        return Response.json(authors, {status: 200});

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

        if("id" in body && "name" in body && "email" in body && "isPresentor" in body && "username" in body && "password" in body) {
            const author = await repo.createAuthor({
                id: body.id,
                name: body.name,
                email: body.email,
                isPresentor: body.isPresentor,
                username: body.username,
                password: body.password
            });

            return Response.json(author, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}