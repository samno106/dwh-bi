import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  try {
    const body = await req.json();
    const {
      full_name,
      staff_id,
      username,
      department_id,
      position_id,
      role_id,
    } = body;

    if (!full_name) {
      return new Response("Fullname is required", { status: 400 });
    }

    if (!staff_id) {
      return new Response("Staff Id is required", { status: 400 });
    }
    if (!username) {
      return new Response("Username Id is required", { status: 400 });
    }

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
        id: params.userId,
      },
      data: {
        full_name,
        staff_id,
        username,
        department_id,
        position_id,
        role_id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(users);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  try {
    if (!params.userId) {
      return new Response("User id is required", { status: 400 });
    }

    const users = await prismadb.users.deleteMany({
      where: {
        id: params.userId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(users);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  try {
    if (!params.userId) {
      return new Response("User id is required", { status: 400 });
    }

    const user = await prismadb.users.findUnique({
      include: {
        department: true,
        position: true,
        role: {
          include: {
            reportRole: true,
          },
        },
      },
      where: {
        id: params.userId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(user);
  } catch (error) {
    console.log("[USER_GET_BY_ID]", error);
    return new Response("Internal error", { status: 500 });
  }
}
