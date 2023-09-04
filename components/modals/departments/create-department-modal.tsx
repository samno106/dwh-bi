"use client";
import * as z from "zod";
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Modal } from "../../ui/modal";
import { useDepartmentModal } from "@/hooks/use-department-modal";


import { useForm } from 'react-hook-form';
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name:z.string().min(1),
    short_name:z.string().min(1),
    code:z.string().min(1),
});

export const  CreateDepartmentModal = ()=>{
    const router = useRouter();

    const departmentModal = useDepartmentModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            short_name:"",
            code:""
        },
    });
  
  
    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
      try {
       setLoading(true);
       
       const response = await axios.post("/api/departments", values);

       if(response){
        router.refresh();
        departmentModal.onClose();
        toast.success("Department created.");
        form.reset();
       }
  
      } catch (error) {
        toast.error("Internal server erorr.");
  
      }finally{
       setLoading(false);
      }
   }

    return(
        <Modal
        title="Create Department / Branch"
        description=""
        isOpen={departmentModal.isOpen}
        onClose={departmentModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control}
                                        name="name"
                                        render={({field})=>(
                                            <FormItem className="mb-5">
                                                <FormLabel className="text-xs">Name</FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="name" {...field} className="shadow-none py-5 rounded" />
                                                </FormControl>
                                                <FormMessage/>
                                                
                                            </FormItem>
                                        )}
                                        />
                        <FormField control={form.control}
                        name="short_name"
                        render={({field})=>(
                            <FormItem className="mb-5">
                                <FormLabel className="text-xs">Short name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="short name " {...field} className="shadow-none py-5 rounded" />
                                </FormControl>
                                <FormMessage/>
                                
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control}
                            name="code"
                            render={({field})=>(
                                <FormItem className="mb-5">
                                    <FormLabel className="text-xs">Code</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="code" {...field} className="shadow-none py-5 rounded" />
                                    </FormControl>
                                    <FormMessage/>
                                    
                                </FormItem>
                            )}
                            
                            />     
                        <div className="space-x-2 pt-6 flex items-center justify-end">
                            <Button disabled={loading} variant={"outline"} onClick={()=>departmentModal.onClose()}>Cancel</Button>
                            <Button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600">Continue</Button>
                        </div>
                    </form>
                </Form>
                </div>
            </div>
        </Modal>
    );
}