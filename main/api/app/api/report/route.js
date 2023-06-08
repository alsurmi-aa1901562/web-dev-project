import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const report = await repo.readReport();
        return Response.json(report, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}
