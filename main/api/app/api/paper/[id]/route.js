import * as repo from "../repository.js"

export async function GET(request, {params}) {
    try {
        const{ id } = params;
        const paper = await repo.readPaper(id);
        if (paper) {
            return Response.json(paper, {status: 200});
        }
        
        return Response.json({error: "Paper Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ id } = params;
        const body = await request.json();
        console.log(body);
        if("title" in body && "abstract" in body && "authors" in body && "pdfPath" in body && "reviewers" in body) {
            if(Array.isArray(body.authors)){
                const paper = await repo.updatePaper(id, body);

                if (paper) {
                return Response.json(paper, {status: 200});
                }
            
                return Response.json({error: "Paper Not Found!"}, {status: 404}); 
            }
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
        const paper = await repo.deletePaper(id);

        if(paper) {
            return  Response.json({message: "Deleted Paper!"}, {status: 200});
        }

        return Response.json({error: "Paper Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}