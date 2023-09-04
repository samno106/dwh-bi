import prismadb from "@/lib/prismadb";
import { PositionClient } from "./components/client";
import { PositionColumn } from "./components/columns";

const PositionPage =  async()=>{

    const positions = await prismadb.positions.findMany({
        orderBy:{
          created_at:'desc'
        }
      });
  
      const formattedPositions : PositionColumn[] = positions.map((item)=>({
          id:item.id,
          name:item.name,
          code:item.code,
          status:item.status
      }));

    return(
    <div className="px-10 py-10 min-h-screen">
        <PositionClient data={formattedPositions}/>
    </div>
    );
}

export default PositionPage;