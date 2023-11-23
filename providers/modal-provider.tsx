"use client";

import { CreateDepartmentModal } from "@/components/modals/departments/create-department-modal";
import { CreatePositionModal } from "@/components/modals/positions/create-position-modal";
import { useEffect, useState } from "react";
import { CreateRoleModal } from "@/components/modals/roles/create-role-modal";
import { CreateReportModal } from "@/components/modals/reports/create-report-modal";
import { CreateColumnModal } from "@/components/modals/report-columns/create-column-modal";
import { CreateParamModal } from "@/components/modals/report-params/create-param-modal";
import { CreateMetadataModal } from "@/components/modals/metadata/create-metadata-modal";
import { CreatReportRoleModal } from "@/components/modals/report-roles/report-role-modal";
import { CreateWidgetModal } from "@/components/modals/widgets/create-widget-modal";
import { CreateWidgetParamModal } from "@/components/modals/widget-params/create-widgets-params";
import { CreateWidgetLabelModal } from "@/components/modals/widget-labels/create-widget-label";
import { CreatWidgetRoleModal } from "@/components/modals/widget-role/create-widget-role";

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
      <CreateMetadataModal />
      <CreatReportRoleModal />
      <CreateWidgetModal />
      <CreateWidgetParamModal />
      <CreateWidgetLabelModal />
      <CreatWidgetRoleModal />
    </>
  );
};
