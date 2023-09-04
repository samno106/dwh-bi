"use client";

import { CreateDepartmentModal } from "@/components/modals/departments/create-department-modal";
import { CreatePositionModal } from "@/components/modals/positions/create-position-modal";
import {useEffect,useState} from "react";
import { UpdateDepartmentModal } from "@/components/modals/departments/update-department-modal";
import { CreateRoleModal } from "@/components/modals/roles/create-role-modal";

export const ModalProvider =()=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return(
        <>
            <CreatePositionModal/>
            <CreateDepartmentModal/>
            <CreateRoleModal/>
            
        </>
    ) 
}