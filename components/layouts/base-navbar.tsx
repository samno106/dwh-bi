"use client";

import {
  Cable,
  Fingerprint,
  LayoutGrid,
  LogOut,
  PieChart,
  Radar,
  Repeat,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenu } from "./dropdown-menu";
import { API_END_POINT, TOKEN_COOKIES } from "@/constant/api-end-point";
import React, { useEffect, useState } from "react";
import { getToken, removeToken } from "@/lib/init-token";
import axios from "axios";
import toast from "react-hot-toast";

export const BaseNavbar = () => {
  const pathname = usePathname();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    department: {
      id: "",
      name: "",
      code: "",
    },
    position: {
      id: "",
      name: "",
      code: "",
    },
    role: {
      id: "",
      name: "",
      code: "",
    },
  });

  const logOut = async () => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);

      const token = await getToken(TOKEN_COOKIES.TOKEN_NAME);

      if (token) {
        removeToken(TOKEN_COOKIES.TOKEN_NAME, TOKEN_COOKIES.AUTH_ID);
        router.refresh();

        router.push("/login");
        setLoading(false);
        toast.success("You're logout.", {
          id: toastId,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const token = getToken(TOKEN_COOKIES.TOKEN_NAME);
      await axios
        .post(
          `${process.env.API_URL + "" + API_END_POINT.PROFILE}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          setUser(data.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, [loading]);

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: <LayoutGrid className="w-4 h-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/operation",
      label: "Operation",
      icon: <Repeat className="w-4 h-4" />,
      active: pathname === "/operation",
    },
    {
      href: "/business",
      label: "Business",
      icon: <PieChart className="w-4 h-4" />,
      active: pathname === "/business",
    },
    {
      href: "/finance",
      label: "Finance",
      icon: <Wallet className="w-4 h-4" />,
      active: pathname === "/finance",
    },
    {
      href: "/complaince",
      label: "Complaince",
      icon: <Cable className="w-4 h-4" />,
      active: pathname === "/complaince",
    },
    {
      href: "/risk",
      label: "Risk",
      icon: <ShieldCheck className="w-4 h-4" />,
      active: pathname === "/risk",
    },
    {
      href: "/audit",
      label: "Audit",
      icon: <Radar className="w-4 h-4" />,
      active: pathname === "/audit",
    },
  ];

  return (
    <div>
      <nav className="w-full bg-white border-b fixed top-0 left-0 right-0 z-10 px-10 py-2 flex items-center">
        {/* logo */}
        <div className="w-full md:w-56">
          <Logo />
        </div>
        {/* logo */}
        {/* menu */}
        <div>
          <ul className="flex justify-between items-center">
            {routes.map((route) => (
              <li className="mx-3" key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "font-medium flex flex-row items-center hover:text-blue-600",
                    route.active ? "text-blue-600" : "text-gray-600"
                  )}
                >
                  {route.icon}
                  <span className="text-xs ml-2">{route.label}</span>
                </Link>
              </li>
            ))}
            <li className="mx-5">
              <DropdownMenu />
            </li>
          </ul>
        </div>
        {/* menu */}
        {/* profile */}
        <div className="ml-auto flex items-center">
          <div className="p-1.5 bg-blue-100 flex items-center rounded-xl">
            <div className="p-1 rounded-lg bg-blue-300 text-blue-900">
              <Fingerprint className="w-4 h-4" />
            </div>
            <span className="ml-2 text-blue-900 uppercase text-xs font-semibold">
              {user.full_name !== null ? user.full_name : "loading..."}
            </span>
          </div>
          <Button
            size="icon"
            disabled={loading}
            onClick={() => logOut()}
            className=" flex rounded-xl  ml-3  h-9 w-9 bg-blue-300 text-blue-900 hover:text-white shadow-none"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        {/* profile */}
      </nav>
    </div>
  );
};

export default BaseNavbar;
