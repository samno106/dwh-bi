"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, KeyRound, User } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
    username:z.string().min(1),
    password:z.string().min(6),
});


export const LoginForm = () =>{

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            username:"",
            password:""
        },
    });

    const onLogin = async(values:z.infer<typeof formSchema>)=>{
        try {
         setLoading(true);

         router.refresh();
         router.push('/');
         toast.success("You're login success.");
    
        } catch (error) {
            
        }finally{
         setLoading(false);
        }
     }

     return(
        <>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onLogin)}>
                        <FormField control={form.control}
                                name="username"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium leading-6 text-gray-600">Username</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="w-4 h-4 absolute top-3 left-2 text-gray-500"/>
                                                <Input disabled={loading} placeholder="Username" {...field} className="rounded py-5 pl-9 border-gray-300 text-xs" />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        <FormField control={form.control}
                                name="password"
                                render={({field})=>(
                                    <FormItem className="mt-5">
                                        <FormLabel className="text-xs font-medium leading-6 text-gray-600">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <KeyRound className="w-4 h-4 absolute top-3 left-2 text-gray-500"/>
                                                <Input type="password" disabled={loading} placeholder="Password" {...field} className="rounded py-5 pl-9 border-gray-300 text-xs" />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                        <div className="mt-8 flex">
                            <Button type="submit" disabled={loading} size="icon" className="ml-auto rounded-full bg-blue-600 hover:bg-blue-700">
                                <ArrowRight className="w-5 h-5"/>
                            </Button>
                        </div>
                    </form>

                </Form>
        </>
     );
    

}