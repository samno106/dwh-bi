import BaseNavbar from "@/components/layouts/base-navbar";
import Footer from "@/components/layouts/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BaseNavbar />
      <main className="mt-16 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
