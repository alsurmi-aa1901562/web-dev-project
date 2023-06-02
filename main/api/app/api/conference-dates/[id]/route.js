import * as repo from "@/utilities/repository.js";

export async function DELETE(request, {params}) {
    try {
        const{ id } = params;
        const date = await repo.deleteConferenceDate(id);

        if(date) {
            return  Response.json({message: "Deleted Date!"}, {status: 200});
        }

        return Response.json({error: "Date Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}