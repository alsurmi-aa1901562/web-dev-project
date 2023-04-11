export async function GET(request){
    return Response.json({message: "Undefined route"}, {status: 404});
}