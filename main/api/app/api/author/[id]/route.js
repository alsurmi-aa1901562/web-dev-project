import * as repo from "../repository.js"

export async function GET(request, {params}) {
    try {
        const{ id } = params;
        const author = await repo.readAuthor(id);
        if (author) {
            return Response.json(author, {status: 200});
        }
        
        return Response.json({error: "Author Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ id } = params;
        const body = await request.json();

        console.log(body)

        if("name" in body && "email" in body && "isPresentor" in body && "username" in body && "password" in body) {
            const author = await repo.updateAuthor(id, body)

            if (author) {
                return Response.json(author, {status: 200});
            }

            return Response.json({error: "Author Not Found!"}, {status: 404}); 
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
        const author = await repo.deleteAuthor(id);

        if(author) {
            return  Response.json({message: "Deleted Author!"}, {status: 200});
        }

        return Response.json({error: "Author Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}