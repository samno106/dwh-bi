import {create} from "zustand";

interface useDepartmentModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
};

export const useDepartmentModal =create<useDepartmentModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));