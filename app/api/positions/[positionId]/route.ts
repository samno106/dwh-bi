import prismadb from "@/lib/prismadb";

export async function PATCH(req:Request,{params}:{
    params:{positionId:string} 
 }) {
    try {

        const body = await req.json();
        const {name,code} = body;

        if(!name){
            return new Response("Name is required", {status:400})
        }

        if(!code){
            return new Response("Code is required", {status:400})
        }

        const positions = await prismadb.positions.updateMany({
            where:{
                id:params.positionId
            },
            data:{
                name,
                code,
            }
        });
        return Response.json(positions);
        
    } catch (error) {
        console.log('[POSITION_POST]', error);
        return new Response("Internal error", {status:500})
    }
}

export async function DELETE( req:Request,{params}:{
    params:{positionId:string} 
 }) {

    try {
       
        const positions = await prismadb.positions.deleteMany({
            where:{
                id:params.positionId
            },
        });
        return Response.json(positions);
        
    } catch (error) {
        console.log('[POSITION_PATH]', error);
        return new Response("Internal error", {status:500})
    }
}