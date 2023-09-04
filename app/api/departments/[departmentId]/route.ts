import { departments } from '@prisma/client';
import prismadb from "@/lib/prismadb";

export async function PATCH(req:Request, {params}:{
    params:{departmentId:string} 
 }) {

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
        
        const departments = await prismadb.departments.updateMany({
            where:{
                id:params.departmentId
            },
            data:{
                name,
                short_name,
                code,
            }
        });
        return Response.json(departments);
        
    } catch (error) {
        console.log('[DEPART_PATH]', error);
        return new Response("Internal error", {status:500})
    }
}


export async function DELETE( req:Request,{params}:{
    params:{departmentId:string} 
 }) {

    try {
       
        const departments = await prismadb.departments.deleteMany({
            where:{
                id:params.departmentId
            },
        });
        return Response.json(departments);
        
    } catch (error) {
        console.log('[DEPART_PATH]', error);
        return new Response("Internal error", {status:500})
    }
}