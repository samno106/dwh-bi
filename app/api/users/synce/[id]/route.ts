import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const body = await req.json();
    const { department_id, position_id, role_id } = body;

    if (!department_id) {
      return new Response("Department is required", { status: 400 });
    }

    if (!position_id) {
      return new Response("Position is required", { status: 400 });
    }

    if (!role_id) {
      return new Response("Role is required", { status: 400 });
    }

    const users = await prismadb.users.updateMany({
      where: {
        id: params.id,
      },
      data: {
        department_id,
        position_id,
        role_id,
        status: false,
      },
    });
    await prismadb.$disconnect();
    return Response.json(users);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
