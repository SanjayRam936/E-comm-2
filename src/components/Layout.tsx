import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useLocation } from "react-router-dom";

export function Layout() {



  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}