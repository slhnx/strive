import Topbar from "@/components/dashboard/topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-[70%] mx-auto py-12">
      <Topbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
