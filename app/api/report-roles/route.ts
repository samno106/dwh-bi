import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { report_id, role_id } = body;

    if (!report_id) {
      return new Response("Report is required", { status: 400 });
    }

    if (!role_id) {
      return new Response("Role is required", { status: 400 });
    }

    const report = await prismadb.reportRoles.create({
      data: {
        report_id,
        role_id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_ROLE_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}
