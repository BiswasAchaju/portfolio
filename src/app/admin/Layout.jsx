import SideBar from "./_components/SideBar";
import MobileNav from "./_components/MobileNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-full ">
      <div className="lg:w-1/6 w-[15%] border-r min-h-screen  relative p-2 ">
        <div className="hidden lg:block ">
          <SideBar />
        </div>
        <div className="lg:hidden block fixed">
          <MobileNav />
        </div>
      </div>
      <div className="lg:w-full w-[85%] lg:p-2 p-1">{children}</div>
    </div>
  );
}
