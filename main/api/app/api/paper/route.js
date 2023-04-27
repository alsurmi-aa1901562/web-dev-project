import * as repo from "./repository.js";

export async function GET(request, {params}) {
    try {
        const papers = await repo.readPapers();
        return Response.json(papers, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();

        if("id" in body && "title" in body && "abstract" in body && "authors" in body && "pdfPath" in body && "reviewers" in body) {
            if(Array.isArray(body.authors)){
                const paper = await repo.createPaper({
                    id: body.id,
                    title: body.title,
                    abstract: body.abstract,
                    authors: body.authors,
                    pdfPath: body.pdfPath,
                    reviewers: body.reviewers
                });

                return Response.json(paper, {status: 201});
            }
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        console.log(error);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}