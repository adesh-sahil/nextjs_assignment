"use client";

import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? "bg-gray-200 rounded-full font-bold" : "";

  return (
    <aside
      className="w-1/5 bg-gray-100 p-5 fixed flex flex-col items-center rounded-xl"
      style={{ minHeight: "90vh" }}
    >
      <h1 className="text-3xl font-bold mb-10 text-gray-800 mt-10">PopDop</h1>
      <nav className="space-y-4">
        <Link
          href="/"
          className={`text-lg flex items-center text-gray-700 p-2 px-12 ${isActive(
            "/"
          )}`}
        >
          <HomeIcon className="mr-2" /> Home
        </Link>
        <Link
          href="/population"
          className={`text-lg flex items-center text-gray-700 p-2 px-12 ${isActive(
            "/population"
          )}`}
        >
          <BarChartIcon className="mr-2" /> Population
        </Link>
        <Link
          href="/about"
          className={`text-lg flex items-center text-gray-700 p-2 px-12 ${isActive(
            "/about"
          )}`}
        >
          <InfoIcon className="mr-2" /> About
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
