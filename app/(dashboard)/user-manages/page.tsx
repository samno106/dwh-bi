import prismadb from "@/lib/prismadb";
import { UserColumn } from "./components/columns";
import { UserClient } from "./components/client";

const UserManagesPage = async ()=>{

    const users = await prismadb.users.findMany({
        orderBy:{
          created_at:'desc'
        }
      });
  
      const formattedUsers : UserColumn[] = users.map((item)=>({
          id:item.id,
          name:item.full_name,
          code:item.staff_id,
          status:item.status
      }));

    return(
        <div className="px-10 py-10 min-h-screen">
            <UserClient data={formattedUsers}/>
        </div>
    );
}


export default UserManagesPage;