import prismadb from "@/lib/prismadb";
import { UserColumn } from "./components/column";
import { UsersClient } from "./components/client";
import { revalidatePath } from "next/cache";

const UsersPage = async () => {
  const users = await prismadb.users.findMany({
    include: {
      department: true,
      position: true,
      role: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    full_name: item.full_name,
    staff_id: item.staff_id,
    username: item.username,
    department: item.department.name,
    position: item.position.name,
    role: item.role.name,
    status: item.status,
  }));

  revalidatePath("/users");

  return (
    <div className="px-10 py-10 min-h-screen">
      <UsersClient data={formattedUsers} />
    </div>
  );
};

export default UsersPage;
