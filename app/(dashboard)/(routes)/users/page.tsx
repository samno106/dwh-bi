import prismadb from "@/lib/prismadb";
import { UserColumn } from "./components/column";
import { UsersClient } from "./components/client";
import { revalidatePath } from "next/cache";

const UsersPage = async () => {
  revalidatePath("/users");

  return (
    <div className="px-10 py-10 min-h-screen">
      <UsersClient />
    </div>
  );
};

export default UsersPage;
