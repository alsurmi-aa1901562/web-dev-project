import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const type = new URL(request.url).searchParams.get("type")?.toLowerCase();

        const users = await repo.readUsers(type);
        return Response.json(users, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const body = await request.json();
        if(typeof body.fname === "string" && typeof body.lname === "string" && typeof body.email === "string" && typeof body.password === "string" && typeof body.role === "string"){
            body.fname = body.fname.trim();
            body.lname = body.lname.trim();
            body.email = body.email.trim();
            body.password = body.password.trim();
            body.role = body.role.trim();
        }

        if("id" in body && "fname" in body && "lname" in body && "email" in body && "password" in body && "role" in body) {
            const user = await repo.createUser({
                id: body.id,
                fname: body.fname,
                lname: body.lname,
                email: body.email,
                password: body.password,
                role: body.role.toLowerCase()
            });

            return Response.json(user, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}