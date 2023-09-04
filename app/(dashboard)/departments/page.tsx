import prismadb from "@/lib/prismadb";
import { DepartmentClient } from "./components/client";
import { DepartmentColumn } from "./components/columns";

const DepartmentPage = async ()=>{

    const departments = await prismadb.departments.findMany({
      orderBy:{
        created_at:'desc'
      }
    });

    const formattedDepartments : DepartmentColumn[] = departments.map((item)=>({
        id:item.id,
        name:item.name,
        short_name:item.short_name,
        code:item.code,
        status:item.status
    }));
   
    return(
       <div className="px-10 py-10 min-h-screen">
        <DepartmentClient data={formattedDepartments}/>
       </div>
    )
}

export default DepartmentPage;