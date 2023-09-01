import prismadb from "@/lib/prismadb";

export async function POST(req:Request) {
    try {

        const body = await req.json();
        const {name,short_name,code} = body;

        if(!name){
            return new Response("Name is required", {status:400})
        }

        if(!short_name){
            return new Response("Short name is required", {status:400})
        }

        if(!code){
            return new Response("Code is required", {status:400})
        }

        const departments = await prismadb.departments.create({
            data:{
                name,
                short_name,
                code,
            }
        });
        return Response.json(departments);
        
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new Response("Internal error", {status:500})
    }
}