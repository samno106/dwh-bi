import prismadb from "@/lib/prismadb";
import { DashboardClient } from "./(routes)/components/client";

const DashboardPage = async () => {
  const metaBranchs = await prismadb.metaDatas.findMany({
    where: {
      type: "param_branch",
    },
  });

  return (
    <>
      <DashboardClient metaBranchs={metaBranchs} />
    </>
  );
};

export default DashboardPage;
