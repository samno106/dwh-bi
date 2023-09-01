import Logo from "@/components/layouts/logo"

export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}){
    return(
        <div className="bg-white">
        <div className="min-h-screen h-auto">
          <div className="flex items-center justify-center align-middle pt-10">
              <Logo/>
          </div>
          <div>
            {children}
          </div>
          <div className="flex justify-center mt-14">
            <span className="text-xs text-gray-500">
              &copy; Power by CPB.IT Department
            </span>
          </div>
        </div>
      </div>
    );
}