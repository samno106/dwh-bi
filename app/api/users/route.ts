import prismadb from "@/lib/prismadb";

export async function POST(req:Request) {
    try {

        const body = await req.json();
        const {
            full_name,
            staff_id,
            username,
            password,
            department_id,
            position_id,
            role_id,
        } = body;

        if(!full_name){
            return new Response("Fullname is required", {status:400})
        }

        if(!staff_id){
            return new Response("Staff Id is required", {status:400})
        }
        if(!username){
            return new Response("Username Id is required", {status:400})
        }

        if(!department_id){
            return new Response("Department is required", {status:400})
        }

        if(!position_id){
            return new Response("Position is required", {status:400})
        }

        if(!role_id){
            return new Response("Role is required", {status:400})
        }

        const positions = await prismadb.users.create({
            data:{
                full_name,
                staff_id,
                username,
                password,
                department_id,
                position_id,
                role_id,
            }
        });
        return Response.json(positions);
        
    } catch (error) {
        console.log('[USER_POST]', error);
        return new Response("Internal error", {status:500})
    }
}