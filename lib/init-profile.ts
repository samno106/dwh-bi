import prismadb from "./prismadb";

export async function initialProfile(authId: string) {
  const profile = await prismadb.users.findUnique({
    where: {
      id: authId,
    },
    include: {
      department: true,
      position: true,
      role: true,
    },
  });

  return profile;
}
