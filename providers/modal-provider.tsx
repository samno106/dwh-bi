"use client";

import { CreateDepartmentModal } from "@/components/modals/departments/create-department-modal";
import { CreatePositionModal } from "@/components/modals/positions/create-position-modal";
import { useEffect, useState } from "react";
import { CreateRoleModal } from "@/components/modals/roles/create-role-modal";
import { CreateReportModal } from "@/components/modals/reports/create-report-modal";
import { CreateColumnModal } from "@/components/modals/report-columns/create-column-modal";
import { CreateParamModal } from "@/components/modals/report-params/create-param-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreatePositionModal />
      <CreateDepartmentModal />
      <CreateRoleModal />
      <CreateReportModal />
      <CreateReportModal />
      <CreateColumnModal />
      <CreateParamModal />
    </>
  );
};
