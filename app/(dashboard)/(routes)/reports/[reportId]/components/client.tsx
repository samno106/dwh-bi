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
import {
  metaDatas,
  reportColumns,
  reportParams,
  reportRoles,
  reports,
} from "@prisma/client";
import axios from "axios";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  ChevronRight,
  Download,
  Home,
  Loader2,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
import { SelectOption, SelectedOption, SnSelect } from "@/components/sn-select";
import toast from "react-hot-toast";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";

import Excel from "exceljs";
import saveAs from "file-saver";

interface ReportClientProps {
  report: reports | null;
  reportRoles: reportRoles[];
  reportColumns: reportColumns[];
  reportParams: reportParams[];
  metaBranchs: metaDatas[];
  metaCurrencies: metaDatas[];
}

export const ReportClient: React.FC<ReportClientProps> = ({
  report,
  reportRoles,
  reportColumns,
  reportParams,
  metaBranchs,
  metaCurrencies,
}) => {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(10);
  const [showOpt, setShowOpt] = useState(false);
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState([""]);
  const [ccy, setCcy] = useState([""]);
  const [reportDate, setReportDate] = React.useState<Date>();
  const [branchs, setBranchs] = useState<SelectOption[]>([]);
  const [currency, setCurrency] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [colSeaarch, setColSearch] = useState("");
  const [paramSize, setParamSize] = useState(0);
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [stickyClass, setStickyClass] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);

  const workbook = new Excel.Workbook();

  const [user, setUser] = useState({
    id: "",
    full_name: "",
    department: {
      code: "",
      type: "",
    },
    role: {
      id: "",
      reports: [],
      code: "",
    },
  });

  const columns = reportColumns
    .filter(
      (reportCol) =>
        reportCol.report_role_id ===
        `${reportRoles
          .filter((roleReport) => roleReport.role_id === user.role.id)
          .map((rpt) => {
            return rpt.id;
          })}`
    )
    .map((col) => {
      return { header: col.display, key: col.name };
    });

  const getProfile = async () => {
    try {
      const userId = getToken(TOKEN_COOKIES.AUTH_ID);
      await axios.get(`/api/users/${userId}`).then((data) => {
        setUser(data.data);
      });
    } catch (error) {
      toast.error("Internal server erorr !");
    }
  };

  const getReports = async (query: string) => {
    setLoading(true);
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
    } catch (error) {
      toast.error("Internal server erorr!");
    } finally {
      setLoading(false);
    }
  };

  const onChangeBranch = (opt: any) => {
    setBranchs(opt);
    var value = [];
    for (var i = 0, l = opt.length; i < l; i++) {
      value.push(`'${opt[i].value}'`);
    }
    setBranch(value);
  };

  const onChangeCcy = (opt: any) => {
    setCurrency(opt);
    var value = [];
    for (var i = 0, l = opt.length; i < l; i++) {
      value.push(`'${opt[i].value}'`);
    }
    setCcy(value);
  };

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename:
      "report-" +
      report?.name.toLowerCase() +
      "-" +
      moment(reportDate).format("DD-MMM-YYYY"),
    sheet: `${moment(reportDate).format("DD-MMM-YYYY")}`,
  });

  const stickNavbar = () => {
    if (window !== undefined) {
      if (window.scrollY > 100) {
        setStickyClass(
          "transition ease-in-out delay-150 fixed w-full top-14 left-0 px-5 shadow border-b  duration-300"
        );
      } else {
        setStickyClass("");
      }
    }
  };

  const saveExcel = async () => {
    setLoadingDownload(true);
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
        .then(async ({ data }) => {
          const worksheet = workbook.addWorksheet(
            report?.name.toLowerCase() +
              "-" +
              moment(reportDate).format("DD-MMM-YYYY")
          );
          // columns.push({ header: "#", key: "No" });
          worksheet.columns = columns;

          // updated the font for first row.
          worksheet.getRow(1).font = { bold: true };

          // loop through all of the columns and set the alignment with width.
          worksheet.columns.forEach((column) => {
            column.alignment = { horizontal: "left" };
          });

          data.data.forEach((singleData: any) => {
            worksheet.addRow(singleData);
          });

          // write the content using writeBuffer
          const buf = await workbook.xlsx.writeBuffer();

          // download the processed file
          saveAs(
            new Blob([buf]),
            `${
              report?.name.toLowerCase() +
              "-" +
              moment(reportDate).format("DD-MMM-YYYY")
            }.xlsx`
          );
          setLoadingDownload(false);
        });
    } catch (error) {
      toast.error("Internal server erorr!");
    } finally {
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    getProfile();
    let paramCol = reportParams.filter((pmcl) => pmcl.type === "date");
    setParamSize(paramCol.length);
    var str = report?.code;
    var query;
    if (paramSize === 2) {
      query = str
        ?.replaceAll(
          "param_from_date",
          `'${moment(fromDate).format("DD-MMM-YYYY")}'`
        )
        .replaceAll(
          "param_to_date",
          `'${moment(toDate).format("DD-MMM-YYYY")}'`
        )
        .replace("param_branch", `${branch}`)
        .replace("param_ccy", `${ccy}`);
    } else {
      query = str
        ?.replaceAll(
          "param_report_date",
          `'${moment(reportDate).format("DD-MMM-YYYY")}'`
        )
        .replace("param_branch", `${branch}`)
        .replace("param_ccy", `${ccy}`);
    }

    setQuery(`${query}`);

    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, [show, branch, ccy, reportDate, fromDate, toDate]);

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

      <div className="bg-white px-4 pb-4 rounded-lg mt-4">
        <div className={cn("bg-white", stickyClass)}>
          <div className="flex justify-between py-5 overflow-auto mb-3">
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
                {showOpt ? (
                  <X className="w-4 h-4" />
                ) : (
                  <ArrowLeftRight className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="px-3 flex">
              {`${reportColumns.filter(
                (reportCol) =>
                  reportCol.report_role_id ===
                    `${reportRoles
                      .filter(
                        (roleReport) => roleReport.role_id === user.role.id
                      )
                      .map((rpt) => {
                        return rpt.id;
                      })}` && reportCol.name === "LOAN_CO"
              )}` ? (
                <div className="px-2 border rounded-md flex items-center mr-2">
                  <span className="pr-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="focus:outline-none text-xs py-2 mt-1 w-[150px]"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search co id..."
                  />
                </div>
              ) : (
                ""
              )}
              {reportParams.map((param) =>
                param.type === "date" ? (
                  paramSize === 2 ? (
                    <Popover key={param.id}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[180px] h-10 justify-start text-left font-normal shadow-none hover:bg-white mx-1",
                            !(param.name === "param_from_date"
                              ? fromDate
                              : toDate) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {(
                            param.name === "param_from_date" ? fromDate : toDate
                          ) ? (
                            moment(
                              param.name === "param_from_date"
                                ? fromDate
                                : toDate
                            ).format("DD-MMM-YYYY")
                          ) : (
                            <span className="text-xs text-gray-400">
                              {param.display}
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            param.name === "param_from_date" ? fromDate : toDate
                          }
                          onSelect={
                            param.name === "param_from_date"
                              ? setFromDate
                              : setToDate
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Popover key={param.id}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[180px] h-10 justify-start text-left font-normal shadow-none hover:bg-white mx-1",
                            !reportDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {reportDate ? (
                            format(reportDate, "dd-MMM-yyyy")
                          ) : (
                            <span className="text-xs text-gray-400">
                              {param.display}
                            </span>
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
                  )
                ) : param.type === "select" ? (
                  <SnSelect
                    key={param.id}
                    options={
                      param.name === "param_branch"
                        ? user.department.type === "Branch"
                          ? metaBranchs.filter(
                              (f) => f.value === user.department.code
                            )
                          : metaBranchs
                        : param.name === "param_ccy"
                        ? metaCurrencies
                        : []
                    }
                    value={param.name === "param_branch" ? branchs : currency}
                    onChange={(opt) =>
                      param.name === "param_branch"
                        ? onChangeBranch(opt)
                        : onChangeCcy(opt)
                    }
                    placholder={`Select ${param.display} ...`}
                  />
                ) : (
                  ""
                )
              )}

              <Button
                className="ml-3 py-5 text-xs"
                onClick={() => getReports(query)}
              >
                {!loading ? (
                  <div className="flex items-center">
                    <span>View</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                ) : (
                  <Loader2 className="animate-spin " />
                )}
              </Button>
              <div className="px-2"></div>
              <Button
                size="icon"
                variant="outline"
                className=" w-10 h-10 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                onClick={saveExcel}
              >
                {loadingDownload ? (
                  <Loader2 className="animate-spin " />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </Button>
              {/* <Button
                size="icon"
                variant="outline"
                disabled={reports.length > 0 ? false : true}
                className={cn(
                  " w-10 h-10 ",
                  show === reports.length
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "border-blue-500 text-blue-500 hover:text-blue-600"
                )}
                onClick={() => {
                  setShow(reports.length);
                  show === reports.length ? onDownload() : null;
                }}
              >
                {show === reports.length ? (
                  <Download className="w-4 h-4" />
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                )}
              </Button> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <Table
            ref={tableRef}
            className="mx-auto w-full whitespace-nowrap overflow-hidden mb-5"
          >
            <TableHeader className="bg-gray-100 uppercase">
              <TableRow className="text-[10px] font-semibold text-gray-600 py-1">
                <TableHead className="py-0 h-8 px-4">#</TableHead>
                {reportColumns
                  .filter(
                    (reportCol) =>
                      reportCol.report_role_id ===
                      `${reportRoles
                        .filter(
                          (roleReport) => roleReport.role_id === user.role.id
                        )
                        .map((rpt) => {
                          return rpt.id;
                        })}`
                  )
                  .map((col) => {
                    return (
                      <TableHead key={col.id} className="py-0 h-8 px-4">
                        {col.display}
                      </TableHead>
                    );
                  })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item["LOAN_CO"].includes(search);
                })
                .slice(0, show)
                .map((report, key) => {
                  return (
                    <TableRow
                      key={key}
                      className="even:bg-blue-50 odd:bg-white "
                    >
                      <TableCell className="text-[10px] text-gray-600 py-1 px-4">
                        {key + 1}
                      </TableCell>
                      {reportColumns
                        .filter(
                          (reportCol) =>
                            reportCol.report_role_id ===
                            `${reportRoles
                              .filter(
                                (roleReport) =>
                                  roleReport.role_id === user.role.id
                              )
                              .map((rpt) => {
                                return rpt.id;
                              })}`
                        )
                        .map((col, index) => (
                          <TableCell
                            className="text-[10px] text-gray-600 py-1 px-4"
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
