import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export async function GET(req) {
    try {
        const fileName = new URL(req.url).searchParams.get("fileName");

        const pathNAN = "./data/pdfs";

        const data = await fs.readFile(`${pathNAN}/${fileName}`);
        return new Response(data, {
            headers: {
                "Content-Type": "application/pdf",
            }
        });
    } catch (error) {
        console.error("error -", error.message);
        console.log(error)
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(req, {params}) {
    try {
        const formdata = await req.formData();
        const data = Object.fromEntries(formdata.entries());
        const buffer = await data.file.arrayBuffer();

        let name = data.file.name.substring(0,data.file.name.lastIndexOf(".") || data.file.name);
        name = name + `-${nanoid()}.pdf`;

        await fs.writeFile(`data/pdfs/${name}`, Buffer.from(buffer));
  
        return Response.json({message: "File Uploaded!", fileName: `${name}`}, { status: 200 });
 
    } catch (error) {
        console.error("error -", error.message);
        console.log(error)
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

