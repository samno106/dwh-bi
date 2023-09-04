import {create} from "zustand";

interface usePositionModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
};

export const usePositionModal =create<usePositionModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));