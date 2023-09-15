"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_END_POINT, TOKEN_COOKIES } from "@/constant/api-end-point";
import { getToken } from "@/lib/init-token";
import { reportColumns, reports } from "@prisma/client";
import axios from "axios";
import {
  ArrowLeftRight,
  ArrowUpDown,
  BarChart3,
  ChevronRight,
  Home,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { any } from "zod";

interface ReportClientProps {
  report: reports | null;
  reportColumns: reportColumns[];
}

export const ReportClient: React.FC<ReportClientProps> = ({
  report,
  reportColumns,
}) => {
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(10);
  const [showOpt, setShowOpt] = useState(false);
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState([""]);
  const [ccy, setCcy] = useState([]);
  const [reportDate, setReportDate] = React.useState<Date>();

  const getReports = async (query: string) => {
    try {
      await axios
        .post(
          `${process.env.API_URL + API_END_POINT.REPORTS}`,
          {},
          {
            params: {
              query: query,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken(TOKEN_COOKIES.TOKEN_NAME)}`,
            },
          }
        )
        .then(({ data }) => {
          setReports(data.data);
        });
    } catch (error) {}
  };

  const handleChangeBranch = (e: any) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(`'${options[i].value}'`);
      }
    }
    setBranch(value);
  };

  const handleChangeCCY = (e: any) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(`'${options[i].value}'`);
      }
    }
    setCcy(value);
  };
  useEffect(() => {
    var str = report?.code;
    var query = str
      ?.replaceAll(
        "param_report_date",
        `'${moment(reportDate).format("DD-MMM-YYYY")}'`
      )
      .replace("param_branch", `${branch}`)
      .replace("param_ccy", `${ccy}`);

    setQuery(`${query}`);
    getReports(`${query}`);

    console.log(query);
    console.log(branch);
    console.log(ccy);
    console.log(reportDate);
  }, [show, branch, ccy, reportDate]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">{report?.name}</h1>
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            <Home className="w-4 h-4" />
          </Link>

          <span className="mx-3 text-gray-500 hover:text-blue-500 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>
          <div className="flex items-center text-blue-600 -px-2 ">
            <BarChart3 className="w-4 h-4 mx-2" />
            <span className="mx-2 text-xs">{report?.name}</span>
          </div>
          <span className="mx-3 text-blue-500 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="bg-white px-4 pb-4 rounded-lg mt-5">
        <div>
          <div className="flex justify-between py-5">
            <div className="flex items-center">
              <div className="border-2 rounded-md px-2 relative">
                <label className="text-[10px] font-medium absolute -top-3 bg-white p-1 px-2 uppercase">
                  Show
                </label>
                <select
                  className={cn(
                    "text-[11px] px-3 bg-transparent pl-2 focus:outline-none mt-3 mb-2",
                    showOpt ? "hidden" : ""
                  )}
                  value={show}
                  onChange={(e) => setShow(parseInt(e.target.value))}
                >
                  {[
                    { name: "10", val: 10 },
                    { name: "20", val: 20 },
                    { name: "50", val: 50 },
                    { name: "100", val: 100 },
                    { name: "All", val: reports.length },
                  ].map((pageSize, index) => (
                    <option key={index} value={pageSize.val}>
                      {pageSize.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={show}
                  onChange={(e) => setShow(parseInt(e.target.value))}
                  className={cn(
                    "w-[50px] text-xs focus:border-none focus:outline-none pl-2 mt-3 mb-2",
                    !showOpt ? "hidden" : ""
                  )}
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 ml-1 text-gray-500 bg-gray-200"
                onClick={() => setShowOpt(!showOpt)}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="px-5 flex">
              <select
                multiple={true}
                className="w-36"
                onChange={(e) => handleChangeBranch(e)}
              >
                <option value="OMC">OMC</option>
                <option value="DPN">DPN</option>
                <option value="ASL">ASL</option>
              </select>
              <select
                multiple={true}
                className="w-32"
                onChange={(e) => handleChangeCCY(e)}
              >
                <option value="KHR">KHR</option>
                <option value="USD">USD</option>
              </select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !reportDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {reportDate ? (
                      format(reportDate, "dd-MMM-yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={reportDate}
                    onSelect={setReportDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button onClick={() => getReports(query)}>Apply</Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100 uppercase">
              <TableRow className="text-[10px] font-semibold text-gray-600 py-1">
                <TableHead className="py-0 h-8">#</TableHead>
                {reportColumns.map((col) => {
                  return (
                    <TableHead key={col.id} className="py-0 h-8">
                      {col.display}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.slice(0, show).map((report, key) => {
                return (
                  <TableRow key={key} className="even:bg-blue-50 odd:bg-white ">
                    <TableCell className="text-[10px] text-gray-600 py-1 ">
                      {key + 1}
                    </TableCell>
                    {reportColumns.map((col, index) => (
                      <TableCell
                        className="text-[10px] text-gray-600 py-1 "
                        key={index}
                      >
                        {col.type == "date"
                          ? moment(report[col.name]).format("DD MMM YYYY")
                          : report[col.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReportClient;
