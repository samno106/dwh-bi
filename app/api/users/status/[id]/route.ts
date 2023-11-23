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

    const { status } = body;

    const users = await prismadb.users.updateMany({
      where: {
        id: params.id,
      },
      data: {
        status: status,
      },
    });
    await prismadb.$disconnect();
    return Response.json(users);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
