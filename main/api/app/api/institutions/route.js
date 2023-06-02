import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const institutions = await repo.readInstitutions();
        return Response.json(institutions, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();
        
        if(typeof body.name === "string"){
            body.name = body.name.trim();
        }

        if("name" in body) {
            const institutions = await repo.createInstitute({
                name: body.name
            });

            return Response.json(institutions, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}