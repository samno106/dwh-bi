import prismadb from "@/lib/prismadb";

export async function PATCH(req:Request,{params}:{
    params:{roleId:string} 
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

        const roles = await prismadb.roles.updateMany({
            where:{
                id:params.roleId
            },
            data:{
                name,
                code,
            }
        });
        return Response.json(roles);
        
    } catch (error) {
        console.log('[ROLE_POST]', error);
        return new Response("Internal error", {status:500})
    }
}

export async function DELETE( req:Request,{params}:{
    params:{roleId:string} 
 }) {

    try {
       
        const roles = await prismadb.roles.deleteMany({
            where:{
                id:params.roleId
            },
        });
        return Response.json(roles);
        
    } catch (error) {
        console.log('[ROLE_PATH]', error);
        return new Response("Internal error", {status:500})
    }
}