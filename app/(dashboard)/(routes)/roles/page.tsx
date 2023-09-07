import prismadb from "@/lib/prismadb";
import { RoleClient } from "./components/client";
import { RoleColumn } from "./components/columns";

const RolePage = async()=>{

    const roles = await prismadb.roles.findMany({
        orderBy:{
          created_at:'desc'
        }
      });
  
      const formattedRoles : RoleColumn[] = roles.map((item)=>({
          id:item.id,
          name:item.name,
          code:item.code,
          status:item.status
      }));

    return(
        <div className="px-10 py-10 min-h-screen">
            <RoleClient data={formattedRoles}/>
        </div>
    );
}

export default RolePage;