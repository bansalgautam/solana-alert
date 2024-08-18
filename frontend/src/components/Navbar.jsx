import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="border-b">
        <div className="flex items-center py-2 max-w-screen-xl mx-auto px-4">
          <h1 className="text-center font-semibold text-xl cursor-pointer">
            <Button variant="link" asChild className="px-0 text-lg">
              <Link to="/">Solana Alerts</Link>
            </Button>
          </h1>
          <Button className="ml-auto" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-4 w-full flex-1">
        <Outlet />
      </div>
      <div className="border-t text-center py-1 text-secondary bg-primary">
        &copy; {new Date().getFullYear()} Solana Alerts
      </div>
    </div>
  );
};

export default Navbar;
