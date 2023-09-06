// "use client";
import prismadb from "@/lib/prismadb";
import { ChevronRight, Home, Users } from "lucide-react";
import Link from "next/link";
import { UserForm } from "./components/user-form";

export const UserPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const user = await prismadb.users.findUnique({
    where: {
      id: params.userId,
    },
  });

  const departments = await prismadb.departments.findMany();
  const positions = await prismadb.positions.findMany();
  const roles = await prismadb.roles.findMany();

  return (
    <div className="px-10 py-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">
          {user ? "Update User" : "Create New User"}
        </h1>
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 dark:text-gray-200">
            <Home className="w-4 h-4" />
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="/users"
            className="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline"
          >
            <Users className="w-4 h-4 mx-2" />

            <span className="mx-2 text-xs">User Management</span>
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="#"
            className="flex items-center text-blue-600 -px-2 dark:text-blue-400 hover:underline"
          >
            <span className="mx-2 text-xs">
              {user ? "Update User" : "Create User"}
            </span>
          </Link>
        </div>
      </div>

      <UserForm
        initailData={user}
        departments={departments}
        positions={positions}
        roles={roles}
      />
    </div>
  );
};

export default UserPage;
