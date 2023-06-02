import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const conferenceDates = await repo.readConferenceDates();
        return Response.json(conferenceDates, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();

        if("date" in body) {
            const conferenceDates = await repo.createConferenceDate({
                date: body.date
            });

            return Response.json(conferenceDates, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}