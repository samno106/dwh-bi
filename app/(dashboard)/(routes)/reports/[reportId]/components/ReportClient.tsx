// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { BarChart3, ChevronRight, Home } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { ReportClientProps, datas } from "./client";

// export const ReportClient: React.FC<ReportClientProps> = ({
//   report,
//   reportColumns,
// }) => {
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h1 className="text-sm font-semibold text-gray-700">{report?.name}</h1>
//         <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
//           <Link href="/" className="text-gray-600 hover:text-blue-500">
//             <Home className="w-4 h-4" />
//           </Link>

//           <span className="mx-3 text-gray-500 hover:text-blue-500 rtl:-scale-x-100">
//             <ChevronRight className="w-4 h-4" />
//           </span>
//           <div className="flex items-center text-blue-600 -px-2 ">
//             <BarChart3 className="w-4 h-4 mx-2" />
//             <span className="mx-2 text-xs">{report?.name}</span>
//           </div>
//           <span className="mx-3 text-blue-500 rtl:-scale-x-100">
//             <ChevronRight className="w-4 h-4" />
//           </span>
//         </div>
//       </div>

//       <div className="bg-white px-4 rounded-lg mt-5">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="text-[10px]">
//                 {reportColumns.map((col) => {
//                   return <TableHead key={col.id}>{col.display}</TableHead>;
//                 })}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {datas.map((data, key) => {
//                 return (
//                   <TableRow key={key}>
//                     {reportColumns.map((col, index) => (
//                       <TableCell className="font-medium">
//                         {data[col.name]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };
