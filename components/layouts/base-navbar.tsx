"use client";

import {
  Cable,
  Fingerprint,
  LayoutGrid,
  LineChart,
  LogOut,
  PieChart,
  Power,
  PowerOff,
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
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { string } from "zod";

export const BaseNavbar = () => {
  const pathname = usePathname();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkAuth, setCheckAuth] = useState(false);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    status: false,
    department: {
      code: "",
      type: "",
    },
    role: {
      reports: [],
      code: "",
    },
  });

  const getProfile = async () => {
    try {
      const userId = getToken(TOKEN_COOKIES.AUTH_ID);
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
          setCheckAuth(true);
        })
        .catch((reason: AxiosError<{ additionalInfo: string }>) => {
          setCheckAuth(false);
          if (reason.response!.status === 401) {
            removeToken(TOKEN_COOKIES.TOKEN_NAME, TOKEN_COOKIES.AUTH_ID);
            router.push("/login");
          }
        });

      await axios.get(`/api/users/${userId}`).then((data) => {
        // if (checkAuth) {
        //   setUser(data.data);
        // }
        setUser(data.data);
      });
    } catch (error) {
      console.log(error);
      toast.error("Internal server erorr !");
    }
  };

  const logOut = async () => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);

      const token = await getToken(TOKEN_COOKIES.TOKEN_NAME);

      if (token) {
        removeToken(TOKEN_COOKIES.TOKEN_NAME, TOKEN_COOKIES.AUTH_ID);
        router.push("/login");
        router.refresh();
        window.location.reload();
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

  useEffect(() => {
    getProfile();
  }, [loading]);

  const routes = [
    {
      href: "/",
      label: "Overview",
      icon: <LayoutGrid className="w-4 h-4" />,
      active: pathname === "/",
    },
    {
      href: "/operation",
      label: "Operation",
      icon: <Repeat className="w-4 h-4" />,
      active: pathname === "/operation",
    },
    {
      href: "/credit",
      label: "Credit",
      icon: <PieChart className="w-4 h-4" />,
      active: pathname === "/credit",
    },
    {
      href: "/business",
      label: "Business",
      icon: <LineChart className="w-4 h-4" />,
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
        {user.status ? (
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
              {/* <li className="mx-5">
                <DropdownMenu
                  reportLists={user.role.reports}
                  role={user.role.code}
                  label=""
                />
              </li> */}
            </ul>
          </div>
        ) : (
          ""
        )}
        {/* menu */}
        {/* profile */}
        <div className="ml-auto flex items-center">
          {user.status ? (
            user.department.type === "HO" && user.role.code === "it_admin" ? (
              <DropdownMenu
                reportLists={user.role.reports}
                role={user.role.code}
                label={user.department.type !== "HO" ? "General Reports" : ""}
              />
            ) : (
              <></>
            )
          ) : (
            ""
          )}
          <div className="p-1.5 bg-blue-100 flex items-center rounded-xl ml-3">
            <div className="p-1 rounded-lg bg-blue-300 text-blue-900">
              <Fingerprint className="w-4 h-4" />
            </div>
            <span className="ml-2 text-blue-900 uppercase text-xs font-semibold">
              {user.full_name !== null ? user.full_name : "loading..."}
            </span>
            <Button
              size="icon"
              variant="outline"
              disabled={loading}
              onClick={() => logOut()}
              className=" w-6 h-6 shadow-none text-blue-800 ml-2 hover:bg-red-500 hover:text-white"
            >
              <Power className="w-4 h-4 " />
            </Button>
          </div>
          {/* <Button
            size="icon"
            disabled={loading}
            onClick={() => logOut()}
            className=" flex rounded-xl  ml-3  h-9 w-9 bg-blue-300 text-blue-900 hover:text-white shadow-none"
          >
            <LogOut className="w-4 h-4" />
          </Button> */}
        </div>
        {/* profile */}
      </nav>
    </div>
  );
};

export default BaseNavbar;
