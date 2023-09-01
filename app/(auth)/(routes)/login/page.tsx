import { LoginForm } from "./components/login-form";

export default function LoginPage(){

    return(
        <div>
            <div className="px-10 py-10 bg-white flex justify-center items-center">
            <div className="w-96 mt-5">
            <h3 className="text-md text-gray-500">Welcome back,</h3>
            <h3 className="mb-5 text-xs font-bold uppercase text-gray-700">
                Login
            </h3>

            <div className="mt-8">
                <LoginForm/>
            </div>
            
        </div>
        
      </div>
        </div>
    );
}