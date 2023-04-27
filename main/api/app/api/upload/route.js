// import * as repo from "../repository.js";
import formidable from "formidable";

export async function GET(request, {params}) {
    try {
        return Response.json("Hello", {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(req, {params}) {
    try {

        const rand = await req;
        console.log(rand);
        // const form = formidable();
        // form.parse(await req.body, async (err, fields, files) => {
        //     if (err) {
        //       console.log(err);
        //       return res.status(500).send(err);
        //     }
        
        //     const file = files.file;
        //     const tempPath = file.path;
        
        //     // Do something with the file here
        
        //     res.status(200).json({ success: true });
        //   });

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};
